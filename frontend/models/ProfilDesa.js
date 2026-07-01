// Model ProfilDesa - informasi sejarah, visi misi, struktur organisasi (single document)
const mongoose = require('mongoose');

const strukturSchema = new mongoose.Schema({
  jabatan: { type: String, required: true },
  nama: { type: String, required: true },
  foto: { type: String, default: '' },
});

const statistikSchema = new mongoose.Schema({
  label: { type: String, required: true },
  nilai: { type: String, required: true },
  icon: { type: String, default: 'users' }, // fontawesome icon name
});

const profilSchema = new mongoose.Schema(
  {
    namaDesa: { type: String, default: 'Desa Melikan' },
    kecamatan: { type: String, default: '' },
    kabupaten: { type: String, default: '' },
    provinsi: { type: String, default: '' },
    kodePos: { type: String, default: '' },
    logo: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    tagline: { type: String, default: 'Maju Bersama, Sejahtera Bersama' },
    sejarah: { type: String, default: '' },
    visi: { type: String, default: '' },
    misi: [{ type: String }], // array poin misi
    struktur: [strukturSchema],
    statistik: [statistikSchema],
    luasWilayah: { type: String, default: '' },
    jumlahPenduduk: { type: String, default: '' },
    jumlahKK: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProfilDesa', profilSchema);
