const {
  GetTranscriptionJobCommand,
  StartTranscriptionJobCommand,
  TranscribeClient,
} = require("@aws-sdk/client-transcribe");
const dotenv = require("dotenv");
const promiseRetry = require("promise-retry");
dotenv.config();

async function transcribe(jobName, bucketKey) {
  const transcribeClient = new TranscribeClient({ region: awsRegion });
  const mediaUri = process.env.BUCKET_URI;
  const awsRegion = process.env.REGION;
  const bucketName = process.env.BUCKET_NAME;
  await transcribeClient.send(
    new StartTranscriptionJobCommand({
      TranscriptionJobName: jobName,
      LanguageCode: "en-US",
      MediaFormat: "mp4",
      Media: { MediaFileUri: mediaUri },
      OutputBucketName: bucketName,
      OutputKey: bucketKey,
      Subtitles: {
        Formats: ["srt"],
      },
    })
  );

  const command = new GetTranscriptionJobCommand({
    TranscriptionJobName: jobName,
  });

  return promiseRetry(
    async (retry) => {
      const response = await transcribeClient.send(command);

      if (response.TranscriptionJob?.TranscriptionJobStatus !== "COMPLETED") {
        return retry(null);
      }

      return response.TranscriptionJob;
    },
    { minTimeout: 2000, forever: true }
  );
}
// transcribe(
//   "pollFile1",
//   process.env.BUCKET_URI,
//   process.env.REGION,
//   process.env.BUCKET_NAME,
//   "output"
// );
module.exports = transcribe;
