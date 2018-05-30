const breakdownCivilizationLists = require("./breakdownCivilizationLists");
const extractCivilizationLists = require("./extractCivlizationLists");
const { civilizationRegex } = require("../utility/parserConfig").regexConfig;

/**
 *
 * @param {string} rawCivStringArray - String of all civ entries
 */
const parseCivilization = rawCivStringArray => {
  try {
    const civData = [];
    rawCivStringArray.forEach(civEntry => {
      const headerMatch = civEntry.match(civilizationRegex);

      const civ = {
        name: headerMatch[0],
        race: headerMatch[1]
      };

      civ.lists = breakdownCivilizationLists(
        extractCivilizationLists(civEntry)
      );
      civData.push(civ);
    });
    return civData;
  } catch (e) {
    console.log(e);
  }
};
module.exports = parseCivilization;
