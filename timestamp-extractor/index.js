// server.js (Node.js)
const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(cors());

app.get("/timestamps", (req, res) => {
  fs.readFile("timestamps.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const lines = data.split("\n");
    const formattedData = lines
      .map((line) => {
        const parts = line.split("-");
        if (parts.length === 2) {
          const [time, label] = parts;
          return { time: parseInt(time), label: label.trim() };
        }
        return null; // Skip lines that don't match the expected format
      })
      .filter((item) => item !== null); // Filter out null items

    res.json(formattedData);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
