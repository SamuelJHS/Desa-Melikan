// Controller publik - menampilkan halaman publik website
const Berita = require('../models/Berita');
const PotensiDesa = require('../models/PotensiDesa');
const Galeri = require('../models/Galeri');
const VideoProfil = require('../models/VideoProfil');
const ProfilDesa = require('../models/ProfilDesa');
const KontakDesa = require('../models/KontakDesa');
const PesanMasyarakat = require('../models/PesanMasyarakat');

// ============ BERANDA ============
exports.beranda = async (req, res, next) => {
  try {
    const [beritaTerbaru, potensiFeatured, galeri, video] = await Promise.all([
      Berita.find({ published: true }).sort({ createdAt: -1 }).limit(3).lean(),
      PotensiDesa.find().sort({ featured: -1, createdAt: -1 }).limit(6).lean(),
      Galeri.find().sort({ createdAt: -1 }).limit(8).lean(),
      VideoProfil.findOne({ featured: true }).lean() || VideoProfil.findOne().lean(),
    ]);
    res.render('public/beranda', {
      title: 'Beranda',
      beritaTerbaru,
      potensiFeatured,
      galeri,
      video,
    });
  } catch (err) {
    next(err);
  }
};

// ============ PROFIL DESA ============
exports.profil = async (req, res, next) => {
  try {
    const profil = await ProfilDesa.findOne().lean();
    res.render('public/profil', { title: 'Profil Desa', profil });
  } catch (err) {
    next(err);
  }
};

// ============ POTENSI DESA ============
exports.potensi = async (req, res, next) => {
  try {
    const { kategori } = req.query;
    const filter = kategori ? { kategori } : {};
    const potensi = await PotensiDesa.find(filter).sort({ featured: -1, createdAt: -1 }).lean();
    res.render('public/potensi', {
      title: 'Potensi Desa',
      potensi,
      kategoriAktif: kategori || 'Semua',
    });
  } catch (err) {
    next(err);
  }
};

exports.potensiDetail = async (req, res, next) => {
  try {
    const item = await PotensiDesa.findById(req.params.id).lean();
    if (!item) return res.status(404).render('public/404', { title: 'Tidak ditemukan' });
    res.render('public/potensi-detail', { title: item.nama, item });
  } catch (err) {
    next(err);
  }
};

// ============ BERITA ============
exports.berita = async (req, res, next) => {
  try {
    const { q, page = 1 } = req.query;
    const perPage = 9;
    const filter = { published: true };
    if (q) {
      filter.$or = [
        { judul: { $regex: q, $options: 'i' } },
        { konten: { $regex: q, $options: 'i' } },
        { kategori: { $regex: q, $options: 'i' } },
      ];
    }
    const total = await Berita.countDocuments(filter);
    const berita = await Berita.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();
    res.render('public/berita', {
      title: 'Berita & Kegiatan',
      berita,
      q: q || '',
      page: parseInt(page),
      totalPages: Math.ceil(total / perPage),
    });
  } catch (err) {
    next(err);
  }
};

exports.beritaDetail = async (req, res, next) => {
  try {
    const item = await Berita.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();
    if (!item) return res.status(404).render('public/404', { title: 'Tidak ditemukan' });
    const related = await Berita.find({
      _id: { $ne: item._id },
      published: true,
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
    res.render('public/berita-detail', { title: item.judul, item, related });
  } catch (err) {
    next(err);
  }
};

// ============ GALERI & VIDEO ============
exports.galeri = async (req, res, next) => {
  try {
    const [galeri, video] = await Promise.all([
      Galeri.find().sort({ createdAt: -1 }).lean(),
      VideoProfil.find().sort({ featured: -1, createdAt: -1 }).lean(),
    ]);
    res.render('public/galeri', { title: 'Galeri & Video', galeri, video });
  } catch (err) {
    next(err);
  }
};

// ============ KONTAK & FORM ASPIRASI ============
exports.kontak = async (req, res, next) => {
  try {
    const kontak = await KontakDesa.findOne().lean();
    res.render('public/kontak', { title: 'Kontak & Aspirasi', kontak });
  } catch (err) {
    next(err);
  }
};

exports.kirimPesan = async (req, res, next) => {
  try {
    const { nama, email, telepon, subjek, pesan } = req.body;
    if (!nama || !email || !pesan) {
      req.flash('error_msg', 'Nama, email, dan pesan wajib diisi');
      return res.redirect('/kontak');
    }
    await PesanMasyarakat.create({ nama, email, telepon, subjek, pesan });
    req.flash('success_msg', 'Terima kasih! Pesan Anda telah kami terima.');
    res.redirect('/kontak');
  } catch (err) {
    next(err);
  }
};
