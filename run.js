const generateFrames = require("./generateFrames");
const getNumberOfFrames = require("./getNumberOfFrames");
const generateTextFilesForFrames = require("./generateTextFilesForFrames");

const run = async () => {
  const inputVideoPath = "input.mp4";
  const outputFramesDir = "frames/";
  const outputFPS = 1;
  const startFrame = 1;
  await generateFrames(inputVideoPath, outputFramesDir, outputFPS);
  const totalFrameNumbers = getNumberOfFrames();
  await generateTextFilesForFrames(startFrame, totalFrameNumbers);
};

run();
