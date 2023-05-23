const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  // Log the error message
  logEvents(
    `${err.name} : ${err.message} | ${req.method} | ${req.url} | ${req.headers.origin}`,
    "errors.log"
  );

  // Log the error stack untuk mengetahui letak error pada kode
  console.log(err.stack);

  // Get the error status code or set it to 500 if none is available
  const status = res.statusCode ? res.statusCode : 500;

  // Set the response status code
  res.status(status);

  // Send the error message in the response body untuk mengetahui pesan error pada client
  res.json({ message: err.message });
};

module.exports = { errorHandler };
