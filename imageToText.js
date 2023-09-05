const fs = require("fs");
const Tesseract = require("tesseract.js");

const imageToText = async (inputImagePath) => {
  //const inputImagePath = "./frames/frame-796.png";

  const imageBuffer = await fs.readFileSync(inputImagePath);

  let data;
  await Tesseract.recognize(imageBuffer, "eng")
    .then(async ({ data: { text } }) => {
      data = text;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  //console.log(data);
  return data;
};

module.exports = imageToText;
