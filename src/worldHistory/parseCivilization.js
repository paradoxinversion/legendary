const breakdownCivilizationLists = require("./breakdownCivilizationLists");
const extractCivilizationLists = require("./extractCivlizationLists");
const civilizationRegex = new RegExp(
  "^[a-zA-Z ]+, (Dwarves|Humans|Elves|Goblins|Kobolds)"
);
// const parseCivilization = civEntry => {
//   const match = civEntry.match(civilizationRegex);
//   const civInfo = {
//     name: match[0],
//     race: match[1]
//   };
//   return civInfo;
// };
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
