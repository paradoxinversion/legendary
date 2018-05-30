const listRegex = new RegExp("[a-zA-Z-]+(?= list)", "i");

/**
 * Extracts civLists from a civ into a string
 * @param {string} rawCivilizationsString - A single civilization string
 */
const extractCivilizationLists = rawCivilizationsString => {
  const lines = rawCivilizationsString.split("\n");
  const civLists = [];
  let workingListLines = [];
  let inLists = false;
  lines.forEach((line, index, arr) => {
    if (line.match(listRegex)) inLists = true;
    if (inLists) {
      if (line.match(listRegex) && workingListLines.length > 0) {
        const entry = workingListLines.join("\n");
        civLists.push(entry);
        workingListLines = [];
      }
      workingListLines.push(line);
      if (index === arr.length - 1) {
        const entry = workingListLines.join("\n");
        civLists.push(entry);
      }
    }
  });
  const civListsString = civLists.join("\n");
  return civListsString;
};

module.exports = extractCivilizationLists;
