// Model VideoProfil - video profil desa (YouTube embed atau upload lokal)
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    judul: { type: String, required: true, trim: true },
    deskripsi: { type: String, default: '' },
    tipe: { type: String, enum: ['youtube', 'lokal'], default: 'youtube' },
    youtubeId: { type: String, default: '' }, // ID youtube saja, contoh: dQw4w9WgXcQ
    filePath: { type: String, default: '' }, // jika upload lokal
    thumbnail: { type: String, default: '' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('VideoProfil', videoSchema);
