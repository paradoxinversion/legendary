const civilizationRegex = new RegExp(
  "^[a-zA-Z ]+, (Dwarves|Humans|Elves|Goblins|Kobolds)"
);
/**
 * extracts only the civ section of the history
 * @param {*} historyDataLines - All lines of world_history, split into an array
 */
const extractCivilizationEntries = historyDataLines => {
  const civs = [];
  let inCivs = false;
  historyDataLines.forEach(line => {
    // console.log(line.match(civilizationRegex));
    if (line.match(civilizationRegex) !== null) inCivs = true;
    if (inCivs) civs.push(line);
  });
  civsString = civs.join("\n");
  return civsString;
};

module.exports = extractCivilizationEntries;
