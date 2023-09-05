const generateFrames = require("./generateFrames");

const run = async () => {
  const inputVideoPath = "input.mp4";
  const outputFramesDir = "frames/";
  const outputFPS = 1;
  await generateFrames(inputVideoPath, outputFramesDir, outputFPS);
};

run();
