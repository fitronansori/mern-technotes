const mongoose = require("mongoose");

// connectDB adalah fungsi yang akan kita gunakan untuk menghubungkan server kita ke MongoDB menggunakan mongoose
const connectDB = async () => {
  try {
    // gunakan method connect dari mongoose untuk menghubungkan ke MongoDB
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.error(err);
    process.exit(1); // exit dengan status 1 (error)
  }
};

module.exports = connectDB;
