const mongoose = require("mongoose");

// connectDB adalah fungsi yang akan kita gunakan untuk menghubungkan server kita ke MongoDB menggunakan mongoose
const connectDB = async () => {
  try {
    // gunakan method connect dari mongoose untuk menghubungkan ke MongoDB
    mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "techNotesDB",
    });
  } catch (err) {
    console.error(err);
    process.exit(1); // exit dengan status 1 (error)
  }
};

module.exports = connectDB;
