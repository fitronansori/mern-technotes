const express = require("express");

// app adalah instance dari express yang akan kita gunakan untuk membuat server
const app = express();
// import path untuk mengakses file di folder server
const path = require("path");
// port yang akan kita gunakan untuk mengakses server
const port = process.env.PORT || 5000;

// mengakses file di folder public dengan menggunakan express.static
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

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

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
