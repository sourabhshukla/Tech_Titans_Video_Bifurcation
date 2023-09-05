const readline = require("readline");
const fs = require("fs");

async function getLineByNumber(filePath, lineNumber) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // To handle both UNIX and Windows line endings
  });

  let currentLineNumber = 0;

  for await (const line of rl) {
    currentLineNumber++;

    if (currentLineNumber === lineNumber) {
      //console.log(`Line ${lineNumber}: ${line}`);
      rl.close();
      return line;
    }
  }

  if (currentLineNumber < lineNumber) {
    console.log(`Line ${lineNumber} does not exist in the file.`);
  }
}

module.exports = getLineByNumber;
