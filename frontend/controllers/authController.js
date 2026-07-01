// Controller autentikasi admin
const Admin = require('../models/Admin');

exports.showLogin = (req, res) => {
  res.render('auth/login', { title: 'Login Admin', layout: 'layouts/auth' });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash('error_msg', 'Email & password wajib diisi');
      return res.redirect('/auth/login');
    }
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      req.flash('error_msg', 'Email atau password salah');
      return res.redirect('/auth/login');
    }
    const ok = await admin.comparePassword(password);
    if (!ok) {
      req.flash('error_msg', 'Email atau password salah');
      return res.redirect('/auth/login');
    }
    // Simpan info admin di session
    req.session.admin = {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };
    req.flash('success_msg', `Selamat datang, ${admin.name}!`);
    res.redirect('/admin/dashboard');
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/auth/login'));
};
