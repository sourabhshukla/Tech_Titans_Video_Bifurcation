const imageToText = require("./imageToText.js");
const writeToNodeFile = require("./writeToNodeFile.js");

const generateTextFilesForFrames = async (startFrame, endFrame) => {
  for (let currFrame = startFrame; currFrame <= endFrame; currFrame++) {
    console.log(`Curr Frame = ${currFrame}`);
    const currFramePath = `./frames/frame-${currFrame}.png`;
    const textFilePath = `./frames/frame-${currFrame}.txt`;
    const data = await imageToText(currFramePath);
    await writeToNodeFile(textFilePath, data);
  }
};

module.exports = generateTextFilesForFrames;
