const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFileName) => {
  // Get the current date and time
  const dateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  // Generate a UUID
  const uuidValue = uuid();

  // Format the log entry
  const logItem = `${dateTime} | ${uuidValue} | ${message}\n`;

  // Check if the logs directory exists
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      // If not, create it
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    } else {
      // If so, append the log entry to the file
      await fsPromises.appendFile(
        path.join(__dirname, "..", "logs", logFileName),
        logItem
      );
    }
    console.log(logItem);
  } catch (error) {
    // Log any errors
    console.log(error);
  }
};

const logger = (req, res, next) => {
  // Log the request method and URL
  logEvents(`${req.method} ${req.url}`, "requests.log");
  next();
};

module.exports = { logger, logEvents };
