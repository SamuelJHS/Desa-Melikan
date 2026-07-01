// Koneksi MongoDB menggunakan Mongoose
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = `${process.env.MONGO_URL}/${process.env.DB_NAME}`;
    await mongoose.connect(uri);
    console.log(`✓ MongoDB terhubung: ${process.env.DB_NAME}`);
  } catch (err) {
    console.error('✗ Gagal koneksi MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
