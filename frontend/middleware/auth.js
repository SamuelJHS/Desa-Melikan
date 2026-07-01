// Middleware autentikasi - melindungi rute admin
// Jika belum login, redirect ke halaman login

const requireAuth = (req, res, next) => {
  if (req.session && req.session.admin) {
    return next();
  }
  req.flash('error_msg', 'Anda harus login terlebih dahulu');
  return res.redirect('/auth/login');
};

// Middleware untuk halaman login - jika sudah login, redirect ke dashboard
const redirectIfAuthed = (req, res, next) => {
  if (req.session && req.session.admin) {
    return res.redirect('/admin/dashboard');
  }
  next();
};

module.exports = { requireAuth, redirectIfAuthed };
