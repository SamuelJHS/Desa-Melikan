# Test Credentials - Desa Melikan

## Admin Login
| Field | Value |
|-------|-------|
| URL | `/auth/login` |
| Email | `admin@desa.id` |
| Password | `admin123` |
| Role | superadmin |

> Kredensial otomatis ter-seed pada saat aplikasi pertama kali dijalankan (lihat `utils/seed.js`).

## Konfigurasi Environment
File: `/app/frontend/.env`
```
ADMIN_EMAIL=admin@desa.id
ADMIN_PASSWORD=admin123
ADMIN_NAME=Administrator Desa
SESSION_SECRET=desa-melikan-secret-key-change-in-production-2026
MONGO_URL=mongodb://localhost:27017
DB_NAME=desa_melikan
```

## Catatan Keamanan Production
- **WAJIB** ganti `ADMIN_PASSWORD` sebelum deploy
- **WAJIB** ganti `SESSION_SECRET` ke string random panjang
- Tutup hint kredensial default di halaman login (`views/auth/login.ejs`)
- Aktifkan `cookie.secure=true` + `app.set('trust proxy', 1)` jika di belakang HTTPS proxy
