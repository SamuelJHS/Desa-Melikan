// Controller Admin - menangani dashboard & CRUD seluruh entitas
const fs = require('fs');
const path = require('path');

const Berita = require('../models/Berita');
const PotensiDesa = require('../models/PotensiDesa');
const Galeri = require('../models/Galeri');
const VideoProfil = require('../models/VideoProfil');
const ProfilDesa = require('../models/ProfilDesa');
const KontakDesa = require('../models/KontakDesa');
const PesanMasyarakat = require('../models/PesanMasyarakat');

// Helper untuk hapus file fisik upload
const removeFile = (relPath) => {
  if (!relPath) return;
  const filename = relPath.replace(/^\/uploads\//, '');
  const fullPath = path.join(__dirname, '..', 'uploads', filename);
  fs.unlink(fullPath, () => {}); // abaikan error
};

// ============ DASHBOARD ============
exports.dashboard = async (req, res, next) => {
  try {
    const [
      totalBerita,
      totalPotensi,
      totalGaleri,
      totalVideo,
      totalPesan,
      pesanBaru,
      beritaTerbaru,
    ] = await Promise.all([
      Berita.countDocuments(),
      PotensiDesa.countDocuments(),
      Galeri.countDocuments(),
      VideoProfil.countDocuments(),
      PesanMasyarakat.countDocuments(),
      PesanMasyarakat.countDocuments({ sudahDibaca: false }),
      Berita.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);
    res.render('admin/dashboard', {
      title: 'Dashboard',
      layout: 'layouts/admin',
      stats: { totalBerita, totalPotensi, totalGaleri, totalVideo, totalPesan, pesanBaru },
      beritaTerbaru,
    });
  } catch (err) {
    next(err);
  }
};

// ============ BERITA CRUD ============
exports.beritaList = async (req, res, next) => {
  try {
    const berita = await Berita.find().sort({ createdAt: -1 }).lean();
    res.render('admin/berita/list', { title: 'Kelola Berita', layout: 'layouts/admin', berita });
  } catch (err) {
    next(err);
  }
};

exports.beritaForm = async (req, res, next) => {
  try {
    const item = req.params.id ? await Berita.findById(req.params.id).lean() : null;
    res.render('admin/berita/form', {
      title: item ? 'Edit Berita' : 'Tambah Berita',
      layout: 'layouts/admin',
      item,
    });
  } catch (err) {
    next(err);
  }
};

exports.beritaSave = async (req, res, next) => {
  try {
    const { judul, kategori, konten, ringkasan, penulis, published } = req.body;
    const data = {
      judul,
      kategori,
      konten,
      ringkasan,
      penulis,
      published: published === 'on' || published === 'true',
    };
    if (req.file) data.gambar = '/uploads/' + req.file.filename;

    if (req.params.id) {
      const lama = await Berita.findById(req.params.id);
      if (!lama) return res.redirect('/admin/berita');
      if (req.file && lama.gambar) removeFile(lama.gambar);
      Object.assign(lama, data);
      await lama.save();
      req.flash('success_msg', 'Berita berhasil diperbarui');
    } else {
      await Berita.create(data);
      req.flash('success_msg', 'Berita berhasil ditambahkan');
    }
    res.redirect('/admin/berita');
  } catch (err) {
    next(err);
  }
};

exports.beritaDelete = async (req, res, next) => {
  try {
    const item = await Berita.findById(req.params.id);
    if (item) {
      if (item.gambar) removeFile(item.gambar);
      await item.deleteOne();
    }
    req.flash('success_msg', 'Berita dihapus');
    res.redirect('/admin/berita');
  } catch (err) {
    next(err);
  }
};

// ============ POTENSI CRUD ============
exports.potensiList = async (req, res, next) => {
  try {
    const potensi = await PotensiDesa.find().sort({ createdAt: -1 }).lean();
    res.render('admin/potensi/list', { title: 'Kelola Potensi', layout: 'layouts/admin', potensi });
  } catch (err) {
    next(err);
  }
};

exports.potensiForm = async (req, res, next) => {
  try {
    const item = req.params.id ? await PotensiDesa.findById(req.params.id).lean() : null;
    res.render('admin/potensi/form', {
      title: item ? 'Edit Potensi' : 'Tambah Potensi',
      layout: 'layouts/admin',
      item,
    });
  } catch (err) {
    next(err);
  }
};

exports.potensiSave = async (req, res, next) => {
  try {
    const { nama, kategori, deskripsi, lokasi, kontak, harga, featured } = req.body;
    const data = {
      nama,
      kategori,
      deskripsi,
      lokasi,
      kontak,
      harga,
      featured: featured === 'on' || featured === 'true',
    };
    if (req.file) data.gambar = '/uploads/' + req.file.filename;

    if (req.params.id) {
      const lama = await PotensiDesa.findById(req.params.id);
      if (!lama) return res.redirect('/admin/potensi');
      if (req.file && lama.gambar) removeFile(lama.gambar);
      Object.assign(lama, data);
      await lama.save();
      req.flash('success_msg', 'Potensi diperbarui');
    } else {
      await PotensiDesa.create(data);
      req.flash('success_msg', 'Potensi ditambahkan');
    }
    res.redirect('/admin/potensi');
  } catch (err) {
    next(err);
  }
};

exports.potensiDelete = async (req, res, next) => {
  try {
    const item = await PotensiDesa.findById(req.params.id);
    if (item) {
      if (item.gambar) removeFile(item.gambar);
      await item.deleteOne();
    }
    req.flash('success_msg', 'Potensi dihapus');
    res.redirect('/admin/potensi');
  } catch (err) {
    next(err);
  }
};

// ============ GALERI CRUD ============
exports.galeriList = async (req, res, next) => {
  try {
    const galeri = await Galeri.find().sort({ createdAt: -1 }).lean();
    res.render('admin/galeri/list', { title: 'Kelola Galeri', layout: 'layouts/admin', galeri });
  } catch (err) {
    next(err);
  }
};

exports.galeriForm = async (req, res, next) => {
  try {
    const item = req.params.id ? await Galeri.findById(req.params.id).lean() : null;
    res.render('admin/galeri/form', {
      title: item ? 'Edit Foto' : 'Tambah Foto',
      layout: 'layouts/admin',
      item,
    });
  } catch (err) {
    next(err);
  }
};

exports.galeriSave = async (req, res, next) => {
  try {
    const { judul, deskripsi, kategori } = req.body;
    const data = { judul, deskripsi, kategori };
    if (req.file) data.gambar = '/uploads/' + req.file.filename;

    if (req.params.id) {
      const lama = await Galeri.findById(req.params.id);
      if (!lama) return res.redirect('/admin/galeri');
      if (req.file && lama.gambar) removeFile(lama.gambar);
      Object.assign(lama, data);
      await lama.save();
      req.flash('success_msg', 'Foto galeri diperbarui');
    } else {
      if (!data.gambar) {
        req.flash('error_msg', 'Gambar wajib diupload');
        return res.redirect('/admin/galeri/tambah');
      }
      await Galeri.create(data);
      req.flash('success_msg', 'Foto galeri ditambahkan');
    }
    res.redirect('/admin/galeri');
  } catch (err) {
    next(err);
  }
};

exports.galeriDelete = async (req, res, next) => {
  try {
    const item = await Galeri.findById(req.params.id);
    if (item) {
      if (item.gambar) removeFile(item.gambar);
      await item.deleteOne();
    }
    req.flash('success_msg', 'Foto dihapus');
    res.redirect('/admin/galeri');
  } catch (err) {
    next(err);
  }
};

// ============ VIDEO CRUD ============
exports.videoList = async (req, res, next) => {
  try {
    const video = await VideoProfil.find().sort({ createdAt: -1 }).lean();
    res.render('admin/video/list', { title: 'Kelola Video', layout: 'layouts/admin', video });
  } catch (err) {
    next(err);
  }
};

exports.videoForm = async (req, res, next) => {
  try {
    const item = req.params.id ? await VideoProfil.findById(req.params.id).lean() : null;
    res.render('admin/video/form', {
      title: item ? 'Edit Video' : 'Tambah Video',
      layout: 'layouts/admin',
      item,
    });
  } catch (err) {
    next(err);
  }
};

// Helper: ekstrak ID YouTube dari URL/embed
const extractYoutubeId = (input) => {
  if (!input) return '';
  const m = input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : input.length === 11 ? input : '';
};

exports.videoSave = async (req, res, next) => {
  try {
    const { judul, deskripsi, tipe, youtubeInput, featured } = req.body;
    const data = {
      judul,
      deskripsi,
      tipe,
      featured: featured === 'on' || featured === 'true',
    };
    if (tipe === 'youtube') {
      data.youtubeId = extractYoutubeId(youtubeInput);
      data.filePath = '';
    } else if (req.file) {
      data.filePath = '/uploads/' + req.file.filename;
      data.youtubeId = '';
    }
    if (req.params.id) {
      const lama = await VideoProfil.findById(req.params.id);
      if (!lama) return res.redirect('/admin/video');
      if (req.file && lama.filePath) removeFile(lama.filePath);
      Object.assign(lama, data);
      await lama.save();
      req.flash('success_msg', 'Video diperbarui');
    } else {
      await VideoProfil.create(data);
      req.flash('success_msg', 'Video ditambahkan');
    }
    res.redirect('/admin/video');
  } catch (err) {
    next(err);
  }
};

exports.videoDelete = async (req, res, next) => {
  try {
    const item = await VideoProfil.findById(req.params.id);
    if (item) {
      if (item.filePath) removeFile(item.filePath);
      await item.deleteOne();
    }
    req.flash('success_msg', 'Video dihapus');
    res.redirect('/admin/video');
  } catch (err) {
    next(err);
  }
};

// ============ PROFIL DESA (single doc) ============
exports.profilForm = async (req, res, next) => {
  try {
    let profil = await ProfilDesa.findOne();
    if (!profil) profil = await ProfilDesa.create({});
    res.render('admin/profil/form', {
      title: 'Edit Profil Desa',
      layout: 'layouts/admin',
      profil: profil.toObject(),
    });
  } catch (err) {
    next(err);
  }
};

exports.profilSave = async (req, res, next) => {
  try {
    const {
      namaDesa,
      kecamatan,
      kabupaten,
      provinsi,
      kodePos,
      tagline,
      sejarah,
      visi,
      misi,
      luasWilayah,
      jumlahPenduduk,
      jumlahKK,
      struktur_jabatan,
      struktur_nama,
      statistik_label,
      statistik_nilai,
      statistik_icon,
    } = req.body;

    let profil = await ProfilDesa.findOne();
    if (!profil) profil = new ProfilDesa();

    profil.namaDesa = namaDesa;
    profil.kecamatan = kecamatan;
    profil.kabupaten = kabupaten;
    profil.provinsi = provinsi;
    profil.kodePos = kodePos;
    profil.tagline = tagline;
    profil.sejarah = sejarah;
    profil.visi = visi;
    profil.misi = (misi || '').split('\n').map((s) => s.trim()).filter(Boolean);
    profil.luasWilayah = luasWilayah;
    profil.jumlahPenduduk = jumlahPenduduk;
    profil.jumlahKK = jumlahKK;

    // Struktur organisasi (array)
    const jabatanArr = Array.isArray(struktur_jabatan) ? struktur_jabatan : [struktur_jabatan].filter(Boolean);
    const namaArr = Array.isArray(struktur_nama) ? struktur_nama : [struktur_nama].filter(Boolean);
    profil.struktur = jabatanArr
      .map((j, i) => ({ jabatan: j, nama: namaArr[i] || '' }))
      .filter((s) => s.jabatan && s.nama);

    // Statistik (array)
    const labelArr = Array.isArray(statistik_label) ? statistik_label : [statistik_label].filter(Boolean);
    const nilaiArr = Array.isArray(statistik_nilai) ? statistik_nilai : [statistik_nilai].filter(Boolean);
    const iconArr = Array.isArray(statistik_icon) ? statistik_icon : [statistik_icon].filter(Boolean);
    profil.statistik = labelArr
      .map((l, i) => ({ label: l, nilai: nilaiArr[i] || '', icon: iconArr[i] || 'users' }))
      .filter((s) => s.label && s.nilai);

    if (req.file) profil.heroImage = '/uploads/' + req.file.filename;

    await profil.save();
    req.flash('success_msg', 'Profil desa diperbarui');
    res.redirect('/admin/profil');
  } catch (err) {
    next(err);
  }
};

// ============ KONTAK (single doc) ============
exports.kontakForm = async (req, res, next) => {
  try {
    let kontak = await KontakDesa.findOne();
    if (!kontak) kontak = await KontakDesa.create({});
    res.render('admin/kontak/form', {
      title: 'Edit Kontak Desa',
      layout: 'layouts/admin',
      kontak: kontak.toObject(),
    });
  } catch (err) {
    next(err);
  }
};

exports.kontakSave = async (req, res, next) => {
  try {
    let kontak = await KontakDesa.findOne();
    if (!kontak) kontak = new KontakDesa();
    const fields = [
      'alamat', 'telepon', 'email', 'website', 'instagram',
      'facebook', 'youtube', 'whatsapp', 'googleMapsEmbed', 'jamPelayanan',
    ];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) kontak[f] = req.body[f];
    });
    await kontak.save();
    req.flash('success_msg', 'Kontak desa diperbarui');
    res.redirect('/admin/kontak');
  } catch (err) {
    next(err);
  }
};

// ============ PESAN MASYARAKAT ============
exports.pesanList = async (req, res, next) => {
  try {
    const pesan = await PesanMasyarakat.find().sort({ createdAt: -1 }).lean();
    res.render('admin/pesan/list', { title: 'Pesan Masyarakat', layout: 'layouts/admin', pesan });
  } catch (err) {
    next(err);
  }
};

exports.pesanDetail = async (req, res, next) => {
  try {
    const item = await PesanMasyarakat.findByIdAndUpdate(
      req.params.id,
      { sudahDibaca: true },
      { new: true }
    ).lean();
    if (!item) return res.redirect('/admin/pesan');
    res.render('admin/pesan/detail', {
      title: 'Detail Pesan',
      layout: 'layouts/admin',
      item,
    });
  } catch (err) {
    next(err);
  }
};

exports.pesanDelete = async (req, res, next) => {
  try {
    await PesanMasyarakat.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Pesan dihapus');
    res.redirect('/admin/pesan');
  } catch (err) {
    next(err);
  }
};
