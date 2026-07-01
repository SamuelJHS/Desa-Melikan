// Model PesanMasyarakat - pesan/aspirasi yang dikirim dari form kontak
const mongoose = require('mongoose');

const pesanSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    telepon: { type: String, default: '' },
    subjek: { type: String, default: 'Aspirasi Masyarakat' },
    pesan: { type: String, required: true },
    sudahDibaca: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PesanMasyarakat', pesanSchema);
