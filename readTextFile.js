const { read } = require("fs");

const fs = require("fs").promises;

async function readTextFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    throw err;
  }
}

//console.log(readTextFile("./frames/frame-2.txt"));

module.exports = readTextFile;
