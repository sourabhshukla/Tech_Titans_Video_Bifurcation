const fs = require("fs");
const aws = require("aws-sdk");
const s3 = new aws.S3();
const dotenv = require("dotenv");
dotenv.config();

const getSubtitles = async (filename, subtitles_filename = "subtitles.srt") => {
  let getParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: filename,
  };
  await s3.getObject(getParams, async function (err, data) {
    if (err) {
      return err;
    }
    await fs.writeFileSync(subtitles_filename, data.Body);
  });
};

//getSubtitles("output.srt", "newTitles.srt");

module.exports = getSubtitles;
