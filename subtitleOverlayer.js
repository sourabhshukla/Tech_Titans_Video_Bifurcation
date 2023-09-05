const { exec } = require("child_process");

const videoFile = "input.mp4";
const subtitleFile = "subtitles.srt";
const outputVideoFile = "output_video.mp4";
const ffmpegPath =
  '"C:\\Users\\Sourabh\\Downloads\\Compressed\\ffmpeg-master-latest-win64-gpl\\ffmpeg-master-latest-win64-gpl\\bin\\ffmpeg.exe"';

const command = `${ffmpegPath} -i ${videoFile} -vf subtitles=${subtitleFile} ${outputVideoFile}`;

const ffmpegProcess = exec(command);

ffmpegProcess.stderr.on("data", (data) => {
  const stderrOutput = data.toString();
  const match = stderrOutput.match(/time=(\d+:\d+:\d+\.\d+)/);

  if (match) {
    const currentTime = match[1];
    updateProgressBar(currentTime);
  }
});

ffmpegProcess.on("close", (code) => {
  if (code === 0) {
    console.log("Subtitles added successfully.");
  } else {
    console.error("Error:", code);
  }
});

function updateProgressBar(currentTime) {
  console.log(`Progress: ${currentTime}`);
}
