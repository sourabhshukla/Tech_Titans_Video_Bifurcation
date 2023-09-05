const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const fs = require("fs");
dotenv.config();

const s3 = new AWS.S3();

const bucketName = "hackathonbucketsourabh";
const fileName = "plants.mp4";
const fileData = fs.readFileSync(fileName);

s3.upload(
  {
    Bucket: bucketName,
    Key: fileName,
    Body: fileData,
  },
  (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`File uploaded successfully. ${data.Location}`);
    }
  }
);
