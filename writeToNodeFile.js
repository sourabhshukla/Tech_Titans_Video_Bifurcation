const fsp = require("fs/promises");

async function writeToNodeFile(filePath, content) {
  try {
    await fsp.writeFile(filePath, content);
    console.log("File written successfully.");
  } catch (err) {
    console.error("Error writing to file:", err);
  }
}

module.exports = writeToNodeFile;
