// Rute publik website
const express = require('express');
const router = express.Router();
const pub = require('../controllers/publicController');

router.get('/', pub.beranda);
router.get('/profil', pub.profil);
router.get('/potensi', pub.potensi);
router.get('/potensi/:id', pub.potensiDetail);
router.get('/berita', pub.berita);
router.get('/berita/:slug', pub.beritaDetail);
router.get('/galeri', pub.galeri);
router.get('/kontak', pub.kontak);
router.post('/kontak', pub.kirimPesan);

module.exports = router;
