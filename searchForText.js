const fs = require("fs").promises;

async function searchForSentenceInFile(data, targetSentence) {
  try {
    const words = data.split(/\s+/).map((word) => word.toLowerCase());

    const found = words.join(" ").includes(targetSentence.toLowerCase());

    if (found) {
      //  console.log("Target sentence found in the file.");
      return true;
    } else {
      //  console.log("Target sentence not found in the file.");
      return false;
    }
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

module.exports = searchForSentenceInFile;
