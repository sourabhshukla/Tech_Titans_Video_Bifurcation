const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(require("@ffmpeg-installer/ffmpeg").path);
const fs = require("fs");

const generateFrames = async (inputVideoPath, outputFramesDir, outputFPS) => {
  if (!fs.existsSync(outputFramesDir)) {
    await fs.mkdirSync(outputFramesDir);
  }

  const command = ffmpeg(inputVideoPath)
    .outputFPS(outputFPS)
    .output(outputFramesDir + "frame-%d.png")
    .on("end", () => {
      console.log("Conversion finished");
    })
    .on("error", (err) => {
      console.error("Error:", err);
    });

  await command.run();
};

module.exports = generateFrames;
