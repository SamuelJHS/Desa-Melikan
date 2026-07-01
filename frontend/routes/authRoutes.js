// Rute autentikasi admin
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const { redirectIfAuthed } = require('../middleware/auth');

router.get('/login', redirectIfAuthed, authCtrl.showLogin);
router.post('/login', redirectIfAuthed, authCtrl.login);
router.get('/logout', authCtrl.logout);
router.post('/logout', authCtrl.logout);

module.exports = router;
