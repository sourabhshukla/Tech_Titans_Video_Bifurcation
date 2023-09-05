const generateFrames = require("./generateFrames");
const getNumberOfFrames = require("./getNumberOfFrames");
const generateTextFilesForFrames = require("./generateTextFilesForFrames");
const getTimeStamps = require("./getTimeStamps.js");
const writeToNodeFile = require("./writeToNodeFile");
const uploadToS3 = require("./uploadToS3");
const transcribe = require("./transcribe");
const getSubtitles = require("./getSubtitles");
const subtitleOverlayer = require("./subtitleOverlayer");

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
    await uploadToS3("plants.mp4");
    let rand = Math.ceil(Math.random() * 100);
    const outputBucketFileName = "output.srt";
    await transcribe(`poll${rand}`, outputBucketFileName);
    await getSubtitles(outputBucketFileName);

    const videoFile = "input.mp4";
    const subtitleFile = "subtitles.srt";
    const outputVideoFile = "output_video.mp4";

    await subtitleOverlayer(videoFile, subtitleFile, outputVideoFile);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

run();
