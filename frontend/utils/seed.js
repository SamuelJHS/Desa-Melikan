// Utility seed - mengisi data awal saat aplikasi pertama kali dijalankan
const Admin = require('../models/Admin');
const Berita = require('../models/Berita');
const PotensiDesa = require('../models/PotensiDesa');
const Galeri = require('../models/Galeri');
const VideoProfil = require('../models/VideoProfil');
const ProfilDesa = require('../models/ProfilDesa');
const KontakDesa = require('../models/KontakDesa');

// ============ SEED ADMIN ============
const seedAdmin = async () => {
  const email = (process.env.ADMIN_EMAIL || 'admin@desa.id').toLowerCase();
  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`✓ Admin sudah ada: ${email}`);
    return;
  }
  await Admin.create({
    name: process.env.ADMIN_NAME || 'Administrator Desa',
    email,
    password: process.env.ADMIN_PASSWORD || 'admin123',
    role: 'superadmin',
  });
  console.log(`✓ Admin seed dibuat: ${email}`);
};

// ============ SEED PROFIL DESA ============
const seedProfil = async () => {
  const existing = await ProfilDesa.findOne();
  if (existing) return;
  await ProfilDesa.create({
    namaDesa: 'Desa Melikan',
    kecamatan: 'Wedi',
    kabupaten: 'Klaten',
    provinsi: 'Jawa Tengah',
    kodePos: '57461',
    tagline: 'Melikan: Negeri Gerabah, Maju Bersama Sejahtera',
    logo: '/static/images/LOGO PADUKUHAN MELIKAN FIX.png',
    sejarah:
      'Desa Melikan dikenal sebagai sentra kerajinan gerabah tertua di Jawa Tengah, dengan tradisi membuat gerabah yang telah berlangsung lebih dari 700 tahun, sejak masa Sunan Pandanaran. Teknik putar miring yang khas menjadikan Melikan unik di antara desa-desa gerabah di Indonesia. Hingga kini, sebagian besar warga masih melestarikan warisan leluhur ini sebagai sumber penghidupan dan identitas budaya.',
    visi: 'Mewujudkan Desa Melikan yang mandiri, sejahtera, berbudaya, dan berdaya saing berbasis kearifan lokal gerabah.',
    misi: [
      'Mengembangkan industri kerajinan gerabah sebagai produk unggulan desa',
      'Meningkatkan kualitas SDM melalui pendidikan dan pelatihan',
      'Memperkuat infrastruktur dan layanan publik yang merata',
      'Mempromosikan wisata budaya berbasis komunitas',
      'Menjaga kelestarian lingkungan dan kearifan lokal',
    ],
    struktur: [
      { jabatan: 'Kepala Desa', nama: 'H. Sugeng Riyadi' },
      { jabatan: 'Sekretaris Desa', nama: 'Bambang Setiawan, S.Sos' },
      { jabatan: 'Kaur Keuangan', nama: 'Siti Aminah, S.E' },
      { jabatan: 'Kaur Umum', nama: 'Joko Prasetyo' },
      { jabatan: 'Kasi Pemerintahan', nama: 'Rini Astuti, S.IP' },
      { jabatan: 'Kasi Pelayanan', nama: 'Ahmad Fauzi' },
    ],
    statistik: [
      { label: 'Jumlah Penduduk', nilai: '3.245', icon: 'users' },
      { label: 'Kepala Keluarga', nilai: '987', icon: 'house-user' },
      { label: 'Pengrajin Gerabah', nilai: '412', icon: 'hands-praying' },
      { label: 'Luas Wilayah (Ha)', nilai: '187,5', icon: 'map' },
    ],
    luasWilayah: '187,5 Ha',
    jumlahPenduduk: '3.245 jiwa',
    jumlahKK: '987 KK',
  });
  console.log('✓ Profil desa seed dibuat');
};

// ============ SEED KONTAK ============
const seedKontak = async () => {
  const existing = await KontakDesa.findOne();
  if (existing) return;
  await KontakDesa.create({
    alamat: 'Jl. Raya Melikan No. 1, Kec. Wedi, Kab. Klaten, Jawa Tengah 57461',
    telepon: '(0272) 1234567',
    email: 'kantor@desamelikan.id',
    website: 'www.desamelikan.id',
    instagram: '@desa.melikan',
    facebook: 'Desa Melikan',
    youtube: 'Desa Melikan Official',
    whatsapp: '081234567890',
    googleMapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.4!2d110.6!3d-7.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDUnMDAuMCJTIDExMMKwMzYnMDAuMCJF!5e0!3m2!1sid!2sid!4v1700000000000',
    jamPelayanan: 'Senin - Jumat: 08.00 - 16.00 WIB',
  });
  console.log('✓ Kontak desa seed dibuat');
};

// ============ SEED BERITA ============
const seedBerita = async () => {
  if ((await Berita.countDocuments()) > 0) return;
  const data = [
    {
      judul: 'Festival Gerabah Melikan 2026 Sukses Menarik Ribuan Wisatawan',
      kategori: 'Kegiatan',
      konten:
        '<p>Festival Gerabah Melikan 2026 yang digelar selama tiga hari berturut-turut sukses menarik perhatian ribuan wisatawan baik domestik maupun mancanegara. Acara ini menjadi ajang promosi kerajinan gerabah khas Melikan yang sudah dikenal sejak ratusan tahun lalu.</p><p>Berbagai lomba diadakan, mulai dari lomba putar gerabah cepat, lomba lukis gerabah, hingga pameran karya pengrajin senior. Kepala Desa Melikan menyampaikan terima kasih atas dukungan masyarakat dan pemerintah daerah dalam menyukseskan festival tahunan ini.</p>',
      penulis: 'Sekretariat Desa',
      gambar: '',
    },
    {
      judul: 'Pelatihan Pemasaran Digital untuk Pengrajin UMKM Desa',
      kategori: 'Pelatihan',
      konten:
        '<p>Pemerintah Desa Melikan bekerja sama dengan Dinas Koperasi dan UMKM Kabupaten Klaten menyelenggarakan pelatihan pemasaran digital bagi 50 pengrajin gerabah dan pelaku UMKM lokal. Pelatihan berlangsung selama 5 hari dengan materi mulai dari pembuatan foto produk, copywriting, hingga strategi penjualan di marketplace.</p><p>Kegiatan ini diharapkan dapat meningkatkan omzet pengrajin lokal melalui ekspansi pasar online ke berbagai platform e-commerce.</p>',
      penulis: 'Tim Humas Desa',
    },
    {
      judul: 'Pembangunan Jalan Lingkungan RW 03 Selesai Lebih Cepat',
      kategori: 'Pembangunan',
      konten:
        '<p>Proyek pembangunan jalan lingkungan di RW 03 Desa Melikan rampung dua minggu lebih cepat dari jadwal. Jalan sepanjang 1,2 km ini didanai dari Dana Desa tahun anggaran 2026 dan dikerjakan secara gotong royong bersama warga.</p><p>Kepala Desa menyampaikan apresiasi kepada kontraktor dan warga yang ikut bergotong royong. Diharapkan dengan jalan baru ini, akses ekonomi warga semakin lancar.</p>',
      penulis: 'Sekretariat Desa',
    },
    {
      judul: 'Posyandu Balita Bulan Januari Capai 100% Kehadiran',
      kategori: 'Kesehatan',
      konten:
        '<p>Kegiatan Posyandu Balita Desa Melikan pada bulan Januari 2026 mencapai tingkat kehadiran 100%. Total 187 balita hadir untuk imunisasi, penimbangan, dan pemberian makanan tambahan bergizi.</p><p>Bidan Desa Melikan menjelaskan, capaian ini berkat sosialisasi intensif kader posyandu dari pintu ke pintu sejak akhir Desember.</p>',
      penulis: 'Bidan Desa',
    },
    {
      judul: 'Gerakan Bersih Sungai Pusur, Ribuan Warga Turun Tangan',
      kategori: 'Lingkungan',
      konten:
        '<p>Lebih dari 1.500 warga Desa Melikan turun ke Sungai Pusur untuk membersihkan sampah dan endapan lumpur dalam kegiatan "Bersih Sungai Bersama" yang digelar setiap awal tahun. Kegiatan ini merupakan bagian dari program pelestarian lingkungan desa.</p>',
      penulis: 'Karang Taruna',
    },
  ];
  for (const d of data) await Berita.create(d);
  console.log(`✓ ${data.length} berita seed dibuat`);
};

// ============ SEED POTENSI ============
const seedPotensi = async () => {
  if ((await PotensiDesa.countDocuments()) > 0) return;
  const data = [
    {
      nama: 'Sentra Gerabah Melikan',
      kategori: 'Wisata',
      deskripsi:
        'Pusat kerajinan gerabah tradisional dengan teknik putar miring khas Melikan, satu-satunya di dunia. Pengunjung dapat menyaksikan langsung proses pembuatan dan mencoba membuat gerabah sendiri.',
      lokasi: 'Dusun Pagerjurang, Desa Melikan',
      kontak: '081234567890',
      featured: true,
    },
    {
      nama: 'Museum Mini Gerabah',
      kategori: 'Wisata',
      deskripsi:
        'Koleksi gerabah kuno hingga modern yang menggambarkan perjalanan sejarah gerabah Melikan dari masa Sunan Pandanaran hingga kini.',
      lokasi: 'Balai Desa Melikan',
      featured: true,
    },
    {
      nama: 'Gerabah Hias Premium "Pandanaran"',
      kategori: 'Produk Unggulan',
      deskripsi:
        'Gerabah hias premium dengan motif tradisional kontemporer, sudah diekspor ke Jepang, Belanda, dan Amerika Serikat.',
      kontak: '0822-3344-5566',
      harga: 'Mulai Rp 150.000',
      featured: true,
    },
    {
      nama: 'UMKM Keramik Souvenir Bu Tinem',
      kategori: 'UMKM',
      deskripsi:
        'Memproduksi souvenir gerabah ukuran kecil untuk oleh-oleh wisata, telah memasok ke berbagai toko oleh-oleh di Yogyakarta dan Solo.',
      kontak: '0856-7788-9900',
      harga: 'Mulai Rp 15.000',
    },
    {
      nama: 'Beras Organik Melikan',
      kategori: 'Pertanian',
      deskripsi:
        'Beras organik bersertifikat hasil pertanian gotong royong kelompok tani desa, bebas pestisida dan pupuk kimia.',
      kontak: '0813-2233-4455',
      harga: 'Rp 18.000/kg',
    },
    {
      nama: 'Kafe Tani Sawah Lestari',
      kategori: 'Wisata',
      deskripsi:
        'Kafe dengan pemandangan persawahan dan latar Gunung Merapi, menyajikan kopi lokal dan menu khas desa.',
      lokasi: 'Dusun Sumber, Desa Melikan',
      featured: true,
    },
  ];
  for (const d of data) await PotensiDesa.create(d);
  console.log(`✓ ${data.length} potensi seed dibuat`);
};

// ============ SEED GALERI ============
const seedGaleri = async () => {
  if ((await Galeri.countDocuments()) > 0) return;
  // Gambar contoh menggunakan placeholder gratis (Unsplash)
  const data = [
    {
      judul: 'Proses Pembuatan Gerabah',
      deskripsi: 'Pengrajin sedang membuat gerabah dengan teknik putar miring',
      gambar: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
      kategori: 'Kerajinan',
    },
    {
      judul: 'Festival Tahunan Desa',
      deskripsi: 'Suasana meriah Festival Gerabah Melikan',
      gambar: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=800',
      kategori: 'Kegiatan',
    },
    {
      judul: 'Persawahan Desa',
      deskripsi: 'Hamparan sawah hijau dengan latar Gunung Merapi',
      gambar: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      kategori: 'Pemandangan',
    },
    {
      judul: 'Kantor Balai Desa',
      deskripsi: 'Gedung Balai Desa Melikan yang baru direnovasi',
      gambar: 'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=800',
      kategori: 'Infrastruktur',
    },
    {
      judul: 'Gotong Royong Bersih Desa',
      deskripsi: 'Warga melaksanakan kerja bakti membersihkan lingkungan',
      gambar: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
      kategori: 'Kegiatan',
    },
    {
      judul: 'Produk Gerabah Hias',
      deskripsi: 'Beragam produk gerabah hias siap ekspor',
      gambar: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
      kategori: 'Produk',
    },
    {
      judul: 'Senam Pagi Lansia',
      deskripsi: 'Kegiatan senam pagi rutin para lansia desa',
      gambar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      kategori: 'Kesehatan',
    },
    {
      judul: 'Posyandu Balita',
      deskripsi: 'Kegiatan rutin Posyandu setiap bulan',
      gambar: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800',
      kategori: 'Kesehatan',
    },
  ];
  for (const d of data) await Galeri.create(d);
  console.log(`✓ ${data.length} galeri seed dibuat`);
};

// ============ SEED VIDEO ============
const seedVideo = async () => {
  if ((await VideoProfil.countDocuments()) > 0) return;
  await VideoProfil.create({
    judul: 'Profil Desa Melikan - Negeri Gerabah',
    deskripsi: 'Video profil resmi Desa Melikan yang menampilkan keindahan, budaya, dan kerajinan khas',
    tipe: 'youtube',
    youtubeId: 'M7lc1UVf-VE', // contoh ID YouTube
    featured: true,
  });
  console.log('✓ Video profil seed dibuat');
};

// ============ SEED ALL ============
const seedAll = async () => {
  try {
    await seedAdmin();
    await seedProfil();
    await seedKontak();
    await seedBerita();
    await seedPotensi();
    await seedGaleri();
    await seedVideo();
    console.log('✓ Semua seed data selesai');
  } catch (err) {
    console.error('✗ Seed gagal:', err.message);
  }
};

module.exports = { seedAll, seedAdmin, seedProfil, seedKontak };

// Jika dipanggil langsung dari CLI (node utils/seed.js)
if (require.main === module) {
  require('dotenv').config();
  const connectDB = require('../config/db');
  (async () => {
    await connectDB();
    await seedAll();
    process.exit(0);
  })();
}
