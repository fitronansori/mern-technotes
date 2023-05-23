const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Mengizinkan request dari origin yang ada di dalam array allowedOrigins
      callback(null, true);
    } else {
      // Menolak request dari origin yang tidak ada di dalam array allowedOrigins
      callback(new Error("Not allowed by CORS"));
    }
  },
  // crenetials adalah opsi yang digunakan untuk mengizinkan server untuk mengirimkan cookie ke client
  crendetials: true,

  // optionStatusSuccess adalah opsi yang digunakan untuk mengubah status code dari preflight request menjadi 200 agar browser tidak menganggap preflight request gagal
  optionStatusSuccess: 200,
};

module.exports = corsOptions;
