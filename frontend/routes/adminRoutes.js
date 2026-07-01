// Rute admin (dilindungi middleware autentikasi)
const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');
const { requireAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Semua rute di bawah ini memerlukan login
router.use(requireAuth);

router.get('/', (req, res) => res.redirect('/admin/dashboard'));
router.get('/dashboard', admin.dashboard);

// ===== BERITA =====
router.get('/berita', admin.beritaList);
router.get('/berita/tambah', admin.beritaForm);
router.post('/berita/tambah', upload.single('gambar'), admin.beritaSave);
router.get('/berita/edit/:id', admin.beritaForm);
router.post('/berita/edit/:id', upload.single('gambar'), admin.beritaSave);
router.post('/berita/hapus/:id', admin.beritaDelete);

// ===== POTENSI =====
router.get('/potensi', admin.potensiList);
router.get('/potensi/tambah', admin.potensiForm);
router.post('/potensi/tambah', upload.single('gambar'), admin.potensiSave);
router.get('/potensi/edit/:id', admin.potensiForm);
router.post('/potensi/edit/:id', upload.single('gambar'), admin.potensiSave);
router.post('/potensi/hapus/:id', admin.potensiDelete);

// ===== GALERI =====
router.get('/galeri', admin.galeriList);
router.get('/galeri/tambah', admin.galeriForm);
router.post('/galeri/tambah', upload.single('gambar'), admin.galeriSave);
router.get('/galeri/edit/:id', admin.galeriForm);
router.post('/galeri/edit/:id', upload.single('gambar'), admin.galeriSave);
router.post('/galeri/hapus/:id', admin.galeriDelete);

// ===== VIDEO =====
router.get('/video', admin.videoList);
router.get('/video/tambah', admin.videoForm);
router.post('/video/tambah', upload.single('file'), admin.videoSave);
router.get('/video/edit/:id', admin.videoForm);
router.post('/video/edit/:id', upload.single('file'), admin.videoSave);
router.post('/video/hapus/:id', admin.videoDelete);

// ===== PROFIL DESA =====
router.get('/profil', admin.profilForm);
router.post('/profil', upload.single('heroImage'), admin.profilSave);

// ===== KONTAK =====
router.get('/kontak', admin.kontakForm);
router.post('/kontak', admin.kontakSave);

// ===== PESAN MASYARAKAT =====
router.get('/pesan', admin.pesanList);
router.get('/pesan/:id', admin.pesanDetail);
router.post('/pesan/hapus/:id', admin.pesanDelete);

module.exports = router;
