# Website Profil Desa Melikan

Website profil desa **full-stack production-ready** dengan stack Node.js + Express + EJS + MongoDB. Mendukung halaman publik dan dashboard admin lengkap untuk mengelola konten.

## ✨ Fitur Utama

### Sisi Publik
- 🏡 **Beranda** — Hero, statistik, potensi unggulan, berita terbaru, galeri, video profil
- 📜 **Profil Desa** — Sejarah, Visi & Misi, Struktur Organisasi
- 🌱 **Potensi Desa** — Wisata, UMKM, Produk Unggulan (dengan filter kategori)
- 📰 **Berita & Kegiatan** — Dengan fitur pencarian dan paginasi
- 🖼️ **Galeri & Video Profil** — YouTube embed + upload file lokal
- 📨 **Form Aspirasi** — Masyarakat dapat mengirim pesan langsung

### Dashboard Admin
- 🔐 Sistem login/logout aman menggunakan **express-session** + bcrypt
- 📊 Dashboard statistik
- 📝 **CRUD penuh** untuk: Berita, Potensi, Galeri, Video, Profil Desa, Kontak
- 💬 Inbox & manajemen Pesan Masyarakat
- 📤 Upload gambar & video via **Multer**

## 🛠 Tech Stack

| Bagian | Teknologi |
|--------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| View Engine | EJS + express-ejs-layouts |
| Styling | Tailwind CSS (CDN) + Font Awesome |
| Database | MongoDB + Mongoose ORM |
| Auth | express-session + connect-mongo + bcryptjs |
| Upload | Multer |
| Konfigurasi | dotenv |

## 📁 Struktur Folder

```
.
├── app.js                      # Entry point Express
├── package.json
├── .env / .env.example
├── README.md
├── config/
│   └── db.js                   # Koneksi MongoDB
├── controllers/
│   ├── publicController.js     # Halaman publik
│   ├── authController.js       # Login/logout
│   └── adminController.js      # CRUD admin
├── middleware/
│   ├── auth.js                 # Middleware sesi admin
│   └── upload.js               # Konfigurasi Multer
├── models/
│   ├── Admin.js
│   ├── Berita.js
│   ├── PotensiDesa.js
│   ├── Galeri.js
│   ├── VideoProfil.js
│   ├── ProfilDesa.js
│   ├── KontakDesa.js
│   └── PesanMasyarakat.js
├── routes/
│   ├── publicRoutes.js
│   ├── authRoutes.js
│   └── adminRoutes.js
├── views/
│   ├── layouts/                # public, admin, auth
│   ├── partials/               # navbar, footer, sidebar
│   ├── public/                 # halaman pengunjung
│   ├── admin/                  # halaman dashboard
│   └── auth/                   # halaman login
├── public/                     # static assets
│   ├── css/
│   ├── js/
│   └── images/
├── uploads/                    # file unggahan user
└── utils/
    └── seed.js                 # data awal otomatis
```

## 🚀 Cara Instalasi

### 1. Prasyarat
- Node.js >= 18
- MongoDB (lokal atau Atlas)

### 2. Clone & Install

```bash
git clone <repo-url> desa-melikan
cd desa-melikan
npm install
```

### 3. Konfigurasi Environment

Salin `.env.example` menjadi `.env` lalu sesuaikan:

```bash
cp .env.example .env
```

Isi `.env`:

```env
PORT=3000
NODE_ENV=production
MONGO_URL=mongodb://localhost:27017
DB_NAME=desa_melikan
SESSION_SECRET=ubah-secret-ini-di-production
ADMIN_EMAIL=admin@desa.id
ADMIN_PASSWORD=admin123
ADMIN_NAME=Administrator Desa
```

### 4. Jalankan Aplikasi

```bash
# Mode production
npm start

# Atau mode development (auto-reload via nodemon)
npm run dev
```

Saat pertama kali dijalankan, aplikasi akan otomatis:
- Membuat koneksi MongoDB
- Membuat akun admin default dari `.env`
- Mengisi seed data contoh (Profil Desa, Berita, Potensi, Galeri, Video, Kontak)

Buka di browser:
- **Publik**: <http://localhost:3000>
- **Admin Login**: <http://localhost:3000/auth/login>

### 5. Login Admin Default

| Field | Nilai |
|---|---|
| Email | `admin@desa.id` |
| Password | `admin123` |

> ⚠️ **Wajib** ganti password & SESSION_SECRET sebelum deploy ke production.

## 🗄 Skema Database

- **Admin** — akun pengelola (name, email, password [bcrypt], role)
- **Berita** — artikel (judul, slug, kategori, konten, ringkasan, gambar, views, published)
- **PotensiDesa** — wisata/UMKM/produk (nama, kategori, deskripsi, lokasi, kontak, harga, featured, gambar)
- **Galeri** — foto desa (judul, deskripsi, gambar, kategori)
- **VideoProfil** — video (judul, tipe `youtube|lokal`, youtubeId, filePath, featured)
- **ProfilDesa** — single document (namaDesa, sejarah, visi, misi[], struktur[], statistik[], data wilayah)
- **KontakDesa** — single document (alamat, telepon, email, sosial media, googleMapsEmbed)
- **PesanMasyarakat** — pesan masuk (nama, email, telepon, subjek, pesan, sudahDibaca)

## 🔒 Keamanan

- Password admin di-**hash dengan bcrypt** (10 rounds) sebelum disimpan
- Session disimpan di MongoDB via **connect-mongo** (tidak hilang saat restart)
- Cookie HTTP-only (tidak bisa diakses JavaScript)
- Middleware `requireAuth` melindungi semua rute `/admin/*`
- Upload dibatasi: max 50 MB, hanya tipe gambar & video

## 🧪 Testing Manual

1. Buka beranda <http://localhost:3000> — pastikan semua section tampil (hero, statistik, potensi, berita, galeri, video, CTA aspirasi)
2. Klik menu Berita → coba pencarian
3. Klik salah satu berita → pastikan detail terbuka
4. Klik Kontak → kirim pesan aspirasi
5. Login Admin → cek dashboard
6. CRUD: tambah berita, edit, hapus
7. Upload foto galeri
8. Kelola pesan masyarakat

## 📦 Deployment

Pastikan environment variable berikut diset di server production:
- `MONGO_URL` (MongoDB Atlas URI)
- `SESSION_SECRET` (string random panjang)
- `NODE_ENV=production`
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` untuk seed pertama kali

Direktori `uploads/` harus writable.

## 📝 Lisensi

MIT — Bebas digunakan & dimodifikasi.

---

Dibuat dengan ❤️ untuk Desa Melikan, Kec. Wedi, Kab. Klaten.
