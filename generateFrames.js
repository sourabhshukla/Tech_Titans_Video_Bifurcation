const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(require("@ffmpeg-installer/ffmpeg").path);
const fs = require("fs");

const inputVideoPath = "input.mp4";

const outputFramesDir = "frames/";

if (!fs.existsSync(outputFramesDir)) {
  fs.mkdirSync(outputFramesDir);
}

const command = ffmpeg(inputVideoPath)
  .outputFPS(1)
  .output(outputFramesDir + "frame-%d.png")
  .on("end", () => {
    console.log("Conversion finished");
  })
  .on("error", (err) => {
    console.error("Error:", err);
  });

command.run();
