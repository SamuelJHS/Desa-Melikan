// Model KontakDesa - info kontak resmi desa (single document)
const mongoose = require('mongoose');

const kontakSchema = new mongoose.Schema(
  {
    alamat: { type: String, default: '' },
    telepon: { type: String, default: '' },
    email: { type: String, default: '' },
    website: { type: String, default: '' },
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    youtube: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    googleMapsEmbed: { type: String, default: '' }, // src iframe google maps
    jamPelayanan: { type: String, default: 'Senin - Jumat: 08.00 - 16.00 WIB' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('KontakDesa', kontakSchema);
