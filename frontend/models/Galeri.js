// Model Galeri - foto kegiatan/dokumentasi desa
const mongoose = require('mongoose');

const galeriSchema = new mongoose.Schema(
  {
    judul: { type: String, required: true, trim: true },
    deskripsi: { type: String, default: '' },
    gambar: { type: String, required: true }, // path file gambar
    kategori: { type: String, default: 'Umum' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Galeri', galeriSchema);
