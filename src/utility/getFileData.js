const fs = require("fs");
/**
 * Wraps fs.readfile in a promise, returning legends raw data (the full file) as a string
 * @param {string} path - The path of the file containing legends data
 */
const getFileData = path => {
  const dataPromise = new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, fileData) => {
      if (err) reject(err);
      resolve(fileData);
    });
  });
  return dataPromise;
};

module.exports = getFileData;
