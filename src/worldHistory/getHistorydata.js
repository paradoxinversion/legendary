const fs = require("fs");
const path = require("path");
const getFileData = require("../utilityFunctions/getFileData");
const extractMonsterManEntries = require("./extractMonsterPersonEntries");
const parseMonsterMen = require("./parseMonsterPeople");
const extractCivilizationEntries = require("./extractCivilizationEntries");
const breakdownCivilizations = require("./breakdownCivilizations");
const parseCivilization = require("./parseCivilization");
const extractCivilizationLists = require("./extractCivlizationLists");
const breakdownCivilizationLists = require("./breakdownCivilizationLists");
const history = {};

const parseHistoryData = async () => {
  const rawHistoryData = await getFileData(
    path.join(__dirname, "../../data/old_region_history.txt")
  );
  const historyDataLines = rawHistoryData.split("\n");
  const rawMonsterMen = extractMonsterManEntries(historyDataLines);
  const rawCivilizations = extractCivilizationEntries(historyDataLines);

  history.regionName = historyDataLines[0];
  history.regionNickname = historyDataLines[1];
  history.monsterMen = parseMonsterMen(rawMonsterMen);
  history.civilizations = parseCivilization(
    breakdownCivilizations(rawCivilizations)
  );

  console.log(history);
  return history;
};

parseHistoryData();
