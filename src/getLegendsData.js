const fs = require("fs");
const path = require("path");
const readline = require("readline");

const leadingSpacesReg = new RegExp("^ +");
const hasPadding = str => {
  const match = str.match(leadingSpacesReg);
  console.log(match);
  return match;
};

const getIndentation = regexMatch => {
  if (regexMatch !== null) {
    const spaces = regexMatch[0].length;
    return spaces;
  }
  return null;
};
const rl = readline.createInterface({
  input: fs.createReadStream(
    path.join(__dirname, "../data/region1-00002-01-01-world_history.txt")
  ),
  crlfDelay: Infinity
});

rl.on("line", line => {
  console.log(hasPadding(line));
});
