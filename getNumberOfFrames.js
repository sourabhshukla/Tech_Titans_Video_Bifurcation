const fs = require("fs");

const getNumberOfFrames = () => {
  let count = 1;
  while (fs.existsSync(`./frames/frame-${count}.png`)) {
    count++;
  }
  return count - 1;
};

module.exports = getNumberOfFrames;
