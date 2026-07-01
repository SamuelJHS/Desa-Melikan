// ============================================
// APP.JS - Entry point aplikasi Express
// Website Profil Desa Melikan
// ============================================
require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');

const connectDB = require('./config/db');
const { seedAll } = require('./utils/seed');
const ProfilDesa = require('./models/ProfilDesa');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// KONEKSI DATABASE & SEED DATA AWAL
// ============================================
(async () => {
  await connectDB();
  await seedAll(); // seed admin default + data contoh
})();

// ============================================
// KONFIGURASI VIEW ENGINE (EJS + Layouts)
// ============================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/public'); // default layout

// ============================================
// MIDDLEWARE GLOBAL
// ============================================
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session (disimpan di MongoDB)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'rahasia-desa',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `${process.env.MONGO_URL}/${process.env.DB_NAME}`,
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 hari
      httpOnly: true,
    },
  })
);

app.use(flash());

// Variabel global untuk semua views (admin info, flash message, profil desa)
app.use(async (req, res, next) => {
  res.locals.admin = req.session.admin || null;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.currentPath = req.path;
  try {
    res.locals.profilDesa = await ProfilDesa.findOne().lean();
  } catch (e) {
    res.locals.profilDesa = null;
  }
  next();
});

// ============================================
// ROUTING
// ============================================
app.use('/', require('./routes/publicRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

// ============================================
// 404 HANDLER
// ============================================
app.use((req, res) => {
  res.status(404).render('public/404', {
    title: 'Halaman Tidak Ditemukan',
    layout: 'layouts/public',
  });
});

// ============================================
// ERROR HANDLER
// ============================================
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(500).render('public/error', {
    title: 'Terjadi Kesalahan',
    layout: 'layouts/public',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
  });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✓ Server berjalan di port ${PORT}`);
  console.log(`✓ Mode: ${process.env.NODE_ENV || 'development'}`);
});
