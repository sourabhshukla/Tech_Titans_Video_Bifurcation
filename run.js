const generateFrames = require("./generateFrames");
const getNumberOfFrames = require("./getNumberOfFrames");
const generateTextFilesForFrames = require("./generateTextFilesForFrames");
const readTextFile = require("./readTextFile");

const run = async () => {
  const inputVideoPath = "input.mp4";
  const outputFramesDir = "frames/";
  const outputFPS = 1;
  const startFrame = 1;
  const headingsPath = "headings.txt";
  await generateFrames(inputVideoPath, outputFramesDir, outputFPS);
  const totalFrameNumbers = getNumberOfFrames();
  await generateTextFilesForFrames(startFrame, totalFrameNumbers);
};

run();
