const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const fs = require("fs");
dotenv.config();

const uploadToS3 = async (fileName) => {
  const s3 = new AWS.S3();
  const bucketName = process.env.BUCKET_NAME;
  const fileData = await fs.readFileSync(fileName);

  await s3.upload(
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
};

module.exports = uploadToS3;
