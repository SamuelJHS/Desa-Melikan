// Model Berita - artikel berita & kegiatan desa
const mongoose = require('mongoose');
const slugify = require('slugify');

const beritaSchema = new mongoose.Schema(
  {
    judul: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    kategori: { type: String, default: 'Umum', trim: true },
    konten: { type: String, required: true },
    ringkasan: { type: String, default: '' },
    gambar: { type: String, default: '' }, // path file
    penulis: { type: String, default: 'Admin Desa' },
    published: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Generate slug otomatis dari judul
beritaSchema.pre('save', function (next) {
  if (this.isModified('judul') || !this.slug) {
    this.slug = slugify(this.judul, { lower: true, strict: true }) + '-' + Date.now().toString(36);
  }
  if (!this.ringkasan && this.konten) {
    this.ringkasan = this.konten.replace(/<[^>]*>/g, '').substring(0, 200);
  }
  next();
});

module.exports = mongoose.model('Berita', beritaSchema);
