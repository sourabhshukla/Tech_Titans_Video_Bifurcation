const fs = require("fs");
const aws = require("aws-sdk");
const s3 = new aws.S3();
const dotenv = require("dotenv");
dotenv.config();
let getParams = {
  Bucket: "hackathonbucketsourabh",
  Key: "output.srt",
};
s3.getObject(getParams, function (err, data) {
  if (err) {
    return err;
  }
  fs.writeFileSync("downloadedFile.srt", data.Body);
});
