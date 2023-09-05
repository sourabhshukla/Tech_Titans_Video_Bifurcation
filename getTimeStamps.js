const getTotalLineCount = require("./getTotalLineCount");
const getLineByNumber = require("./getLineByNumber");
const searchForSentenceInFile = require("./searchForText");
const readTextFile = require("./readTextFile.js");

async function getTimeStamps(headingPath, totalFrameCount) {
  //   const headingPath = "headings.txt";
  const lineCount = await getTotalLineCount(headingPath);

  let timeStamps = [];
  const includedHeadings = new Set();
  for (let lineNumber = 1; lineNumber <= lineCount; lineNumber++) {
    let currHeading = await getLineByNumber(headingPath, lineNumber);

    for (
      let currFrameNumber = 1;
      currFrameNumber <= totalFrameCount;
      currFrameNumber++
    ) {
      let inputTextPath = `./frames/frame-${currFrameNumber}.txt`;
      // let currFrameText = await imageToText(inputImagePath);
      let currFrameText = await readTextFile(inputTextPath);
      //console.log(currFrameText);
      let textFound = await searchForSentenceInFile(currFrameText, currHeading);
      console.log(`Curr Slide=${lineNumber} Curr Frame=${currFrameNumber}`);

      if (textFound) {
        // console.log("Found");
        let currStamp = `${currFrameNumber}-${currHeading}`;
        // console.log(currHeading);
        if (!includedHeadings.has(currHeading)) {
          includedHeadings.add(currHeading);
          timeStamps.push(currStamp);
        }
      }
    }
  }

  let output = "";
  for (let line of timeStamps) {
    output = output + "\n" + line;
  }
  // await writeToNodeFile("timestamps.txt", output);
  //console.log(timeStamps);
  return output;
}

module.exports = getTimeStamps;
