// Model PotensiDesa - wisata, UMKM, produk unggulan
const mongoose = require('mongoose');

const potensiSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true, trim: true },
    kategori: {
      type: String,
      enum: ['Wisata', 'UMKM', 'Produk Unggulan', 'Pertanian', 'Lainnya'],
      default: 'Wisata',
    },
    deskripsi: { type: String, required: true },
    lokasi: { type: String, default: '' },
    kontak: { type: String, default: '' },
    gambar: { type: String, default: '' },
    harga: { type: String, default: '' }, // untuk UMKM/produk
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PotensiDesa', potensiSchema);
