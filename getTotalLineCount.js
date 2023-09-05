const readline = require("readline");
const fs = require("fs");

async function getTotalLineCount(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // To handle both UNIX and Windows line endings
  });

  let lineCount = 0;

  for await (const line of rl) {
    lineCount++;
  }

  console.log(`Total number of lines in the file: ${lineCount}`);
  return lineCount;
}

module.exports = getTotalLineCount;
