const { civilizationRegex } = require("../utility/parserConfig").regexConfig;

/**
 * Breaks a string containing multiple rawCivilizations into an array of strings of seperate rawCivilizations
 * @param {string} rawCivilizationsString - All lines of world_history from beginning to end of civs, split into an array
 */
const breakdownCivilizations = rawCivilizationsString => {
  const rawCivLines = rawCivilizationsString.split("\n");
  const civs = [];
  let current = [];
  rawCivLines.forEach(line => {
    if (line.match(civilizationRegex) !== null) {
      if (current.length > 0) {
        civs.push(current.join("\n"));
        current = [];
      }
    }
    current.push(line);
  });
  return civs;
};

module.exports = breakdownCivilizations;
