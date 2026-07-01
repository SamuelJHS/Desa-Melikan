// Middleware Multer untuk upload gambar & video
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Storage konfigurasi
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1e6) + ext;
    cb(null, safeName);
  },
});

// Filter file: gambar & video
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|mp4|webm|ogg|mov/;
  const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = /^image\/|^video\//.test(file.mimetype);
  if (extOk && mimeOk) cb(null, true);
  else cb(new Error('Format file tidak diizinkan. Gunakan gambar/video.'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
});

module.exports = upload;
