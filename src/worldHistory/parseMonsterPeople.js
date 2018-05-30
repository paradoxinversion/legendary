const { beastPeopleRegex } = require("../utility/parserConfig").regexConfig;

/**
 * Gets all monster men from a string containing them-- removes duplicates.
 * @param {string} rawMonsterManString
 */
const parseMonsterMen = rawMonsterManString => {
  try {
    const monsterManEntries = rawMonsterManString.split("\n");
    const rawMonsterMen = monsterManEntries.map((line, index) => {
      if (line.match(beastPeopleRegex)) return line;
    });
    const uniqueMonsterMen = [];
    rawMonsterMen.forEach(monsterMan => {
      if (!uniqueMonsterMen.includes(monsterMan) && monsterMan !== undefined)
        uniqueMonsterMen.push(monsterMan);
    });
    return uniqueMonsterMen;
  } catch (e) {
    console.log(e);
  }
};

module.exports = parseMonsterMen;
