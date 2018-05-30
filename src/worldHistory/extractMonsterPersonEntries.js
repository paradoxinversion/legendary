const beastPeopleRegex = new RegExp("([a-zA-Z]+)( ?)men");

/**
 * Extracts only the monster men section of the history
 * @param {array} historyDataLines - All lines of world_history, split into an array
 */
const extractMonsterManEntries = historyDataLines => {
  const monsterMen = [];
  historyDataLines.forEach(line => {
    if (line.match(beastPeopleRegex)) monsterMen.push(line);
  });
  monsterMenString = monsterMen.join("\n");
  return monsterMenString;
};

module.exports = extractMonsterManEntries;
