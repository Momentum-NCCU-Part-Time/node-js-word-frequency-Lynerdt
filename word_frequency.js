const fs = require("fs");
const path = require("path");
const filePath = process.argv[2];

const STOP_WORDS = ["a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he", "i", "in", "is", "it", "its", "of", "on", "that", "the", "to", "were", "will", "with"];

function printWordFreq(file, callback) {
  // Read in `file` and print out the frequency of words in that file.
  fs.readFile(file, "utf8", (err, data) => {
    const array = data
      .toString()
      .toLowerCase()
      .split(/[(.?:,| )+\n]/);
    const result = {};

    const newText = array.filter((val) => !STOP_WORDS.includes(val));
    for (let word of newText) {
      if (result[word]) {
        result[word]++;
      } else {
        result[word] = 1;
      }
    }

    if (err) {
      console.error("Error reading the file:", err);
      process.exit(1);
    }
    callback(result);
  });
}

printWordFreq(filePath, (wordCount) => {
  console.log("The results from your word counts:", wordCount);
});
