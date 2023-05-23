const express = require("express");
// app adalah instance dari express yang akan kita gunakan untuk membuat server
const app = express();
// import path untuk mengakses file di folder server
const path = require("path");
// import custom middleware logger
const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
// import 3rd party middleware
const cookieParser = require("cookie-parser");
const cors = require("cors");
// import cors options
const corsOptions = require("./config/corsOptions");

// port yang akan kita gunakan untuk mengakses server
const port = process.env.PORT || 5000;

// gunakan logger middleware
app.use(logger);

// cors middleware untuk mengizinkan client mengakses server kita dari alamat yang berbeda
app.use(cors(corsOptions));

// json middleware untuk mengakses request body yang dikirimkan oleh client dalam bentuk json
app.use(express.json());

// cookie parser middleware untuk mengakses cookie yang dikirimkan oleh client dalam bentuk json
app.use(cookieParser());

// static middleware untuk mengakses file di folder public dari client
app.use("/", express.static(path.join(__dirname, "public")));

// import router dari file root.js di folder routes untuk menangani request ke root
app.use("/", require("./routes/root"));

// all method untuk menangani semua request yang masuk ke server kita yang tidak terdefinisi diatas
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// gunakan error handler middleware, ada dibawah karena error handler adalah middleware terakhir yang akan kita gunakan
app.use(errorHandler);

// listen method untuk menjalankan server pada port yang telah ditentukan
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
