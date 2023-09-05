const generateFrames = require("./generateFrames");
const getNumberOfFrames = require("./getNumberOfFrames");
const generateTextFilesForFrames = require("./generateTextFilesForFrames");
const getTimeStamps = require("./getTimeStamps.js");
const writeToNodeFile = require("./writeToNodeFile");

const run = async () => {
  try {
    const inputVideoPath = "input.mp4";
    const outputFramesDir = "frames/";
    const outputFPS = 1;
    const startFrame = 1;
    const headingsPath = "headings.txt";
    await generateFrames(inputVideoPath, outputFramesDir, outputFPS);
    const totalFrameNumbers = getNumberOfFrames();
    await generateTextFilesForFrames(startFrame, totalFrameNumbers);
    const data = await getTimeStamps(headingsPath, totalFrameNumbers);
    await writeToNodeFile("timestamps.txt", data);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

run();
