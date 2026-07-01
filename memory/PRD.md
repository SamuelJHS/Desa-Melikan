# PRD - Website Profil Desa Melikan

## Problem Statement (Original)
User meminta dibuat **Website Profil Desa** full-stack & production-ready dengan stack wajib:
- Runtime: Node.js
- Framework: Express.js
- View Engine: EJS
- Styling: Tailwind CSS (CDN)
- Database: MongoDB + Mongoose
- Auth: express-session
- Upload: Multer
- Env: dotenv

Struktur folder MVC: `/config /controllers /middleware /models /routes /views /public /uploads /utils app.js package.json .env.example README.md`.

## User Choices
- Nama Desa: **Desa Melikan** (Kec. Wedi, Kab. Klaten, Jawa Tengah)
- Auth: **express-session** (+ connect-mongo store)
- Admin default: `admin@desa.id` / `admin123`
- Tailwind: **CDN**
- Seed data: **YA** (berita, potensi, galeri, video, profil, kontak)

## Arsitektur
- Project root: `/app/frontend/` (di-mount sebagai service `frontend` di supervisor, port 3000)
- Entry: `app.js` — Express + express-ejs-layouts + express-session + connect-mongo
- DB: MongoDB lokal (`mongodb://localhost:27017/desa_melikan`)
- Session store: collection `sessions` di MongoDB (persistent)
- Static: `/static/*` → `public/`, `/uploads/*` → `uploads/`
- File upload: Multer disk storage, max 50 MB, filter image/video

## Models Mongoose
1. **Admin** — name, email (unique), password (bcrypt), role
2. **Berita** — judul, slug, kategori, konten, ringkasan, gambar, penulis, published, views
3. **PotensiDesa** — nama, kategori (Wisata/UMKM/Produk Unggulan/Pertanian/Lainnya), deskripsi, lokasi, kontak, harga, featured, gambar
4. **Galeri** — judul, deskripsi, gambar, kategori
5. **VideoProfil** — judul, tipe (youtube/lokal), youtubeId, filePath, featured
6. **ProfilDesa** (single doc) — namaDesa, sejarah, visi, misi[], struktur[], statistik[], info wilayah
7. **KontakDesa** (single doc) — alamat, telepon, sosmed, googleMapsEmbed, jamPelayanan
8. **PesanMasyarakat** — nama, email, telepon, subjek, pesan, sudahDibaca

## Routes
- `GET  /` `/profil` `/potensi` `/potensi/:id` `/berita` `/berita/:slug` `/galeri` `/kontak`
- `POST /kontak` (form aspirasi publik)
- `GET/POST /auth/login`, `GET/POST /auth/logout`
- `/admin/*` (semua dilindungi `requireAuth`):
  - `/dashboard`
  - `/berita`, `/berita/tambah`, `/berita/edit/:id`, `/berita/hapus/:id`
  - `/potensi/...`, `/galeri/...`, `/video/...` (CRUD)
  - `/profil`, `/kontak` (single doc edit)
  - `/pesan`, `/pesan/:id`, `/pesan/hapus/:id`

## Implementasi Selesai (2026-01)
- [x] Struktur MVC lengkap
- [x] 8 model Mongoose dengan validasi
- [x] Auth express-session + bcrypt + middleware
- [x] CRUD penuh: Berita, Potensi, Galeri, Video, Profil, Kontak
- [x] Form aspirasi + pesan masyarakat dengan inbox admin
- [x] Search & paginasi berita
- [x] Filter kategori potensi
- [x] Galeri lightbox & video YouTube/lokal embed
- [x] Tailwind CDN + tema khas gerabah (hijau alam, coklat tanah, emas)
- [x] EJS layouts (public, admin, auth) + partials (navbar, footer, sidebar)
- [x] Multer upload (image + video, 50MB)
- [x] Seed otomatis: 1 admin + profil + kontak + 5 berita + 6 potensi + 8 galeri + 1 video
- [x] README + .env.example
- [x] Responsive mobile + data-testid lengkap
- [x] Testing subagent PASS (semua flow publik, auth, CRUD)

## User Personas
1. **Pengunjung Publik** — masyarakat & wisatawan yang ingin tahu tentang Desa Melikan, baca berita, lihat potensi, kirim aspirasi
2. **Admin Desa** — perangkat desa yang mengelola konten website via dashboard

## Backlog / Future Enhancements
### P1 (segera setelah review)
- Rich text editor (Quill/TinyMCE) untuk konten berita
- Optimasi gambar otomatis (sharp + thumbnail)
- Pagination admin list untuk skalabilitas

### P2 (nice to have)
- Multi-bahasa (ID/EN)
- Export PDF profil desa
- Statistik kunjungan website (Google Analytics)
- Newsletter email subscription
- Layanan administrasi online (surat menyurat)
- Tailwind production build (PostCSS) untuk hilangkan CDN warning

### P3 (jangka panjang)
- Mobile app companion
- Integrasi data BPS (statistik resmi)
- Modul keuangan desa transparan (APBDes)
