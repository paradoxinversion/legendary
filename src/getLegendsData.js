const fs = require("fs");
const path = require("path");
const readline = require("readline");

const history = {};
// Matches all leading spaces on a line-- used for getting indentation
const leadingSpacesReg = new RegExp("^ +");
// Matches all 'men'-- (ie Antmen, Cave Fish Men)
const beastPeopleRegex = new RegExp("([a-zA-Z]+)( ?)men");
const civilizationRegex = new RegExp(
  "^[a-zA-Z ]+, (Dwarves|Humans|Elves|Goblins|Kobolds)"
);
const listRegex = new RegExp("[a-zA-Z-]+(?= list)", "i");
const worshipEntryRegex = new RegExp("([a-zA-Z -]+), ([a-zA-Z]+):");
const worshipSpheresRegex = new RegExp(
  "([a-zA-Z]+ [a-zA-Z]+)|([a-zA-Z]+)",
  "g"
);
const leaderNameRegex = new RegExp("([a-zA-Z]+ *[a-zA-Z]+)");
const leaderLifeReignRegex = new RegExp("\\(([^)]+)\\)");
const leaderChildrenRegex = new RegExp("([\\d]+) Children|No Children");
//
/**
 * Returns the amount of spaces before a given entry, helps determine its nesting
 * @param {*} regexMatch
 */
const getIndentation = regexMatch => {
  if (regexMatch !== null) {
    const spaces = regexMatch[0].length;
    return spaces;
  }
  return null;
};

/**
 * Wraps fs.readfile in a promise, returning legends raw data (the full file) as a string
 * @param {string} path - The path of the file containing legends data
 */
const getFileData = path => {
  const dataPromise = new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, fileData) => {
      if (err) reject(err);
      resolve(fileData);
    });
  });
  return dataPromise;
};

/**
 * Reads a DF world_history file into memory returning a string contaning the data
 */
const readHistoryFile = async () => {
  const historyData = await getFileData(
    path.join(__dirname, "../data/old_region_history.txt")
  );
  return historyData;
};

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

/**
 * extracts only the civ section of the history
 * @param {*} historyDataLines - All lines of world_history, split into an array
 */
const extractRawCivilationEntries = historyDataLines => {
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

/**
 * Extracts civLists from a civ into a string
 * @param {string} rawCivilizationsString - A single civilization string
 */
const extractCivLists = rawCivilizationsString => {
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

const extractWorshipSpheres = worshipListEntry => {
  console.log(worshipListEntry.match(worshipSpheresRegex));
};

const breakdownCivLists = civListsString => {
  const rawCivListLines = civListsString.split("\n");
  const lists = [];
  let currentListParent = {};
  let currentListEntry = {};
  let currentListType = "";
  rawCivListLines.forEach((line, index, arr) => {
    if (line.match(listRegex) && Object.keys(currentListParent).length > 0) {
      lists.push(currentListParent);
      currentListParent = {};
    }
    if (line.match(listRegex)) {
      currentListParent.listType = line.match(listRegex)[0];
      currentListType = currentListParent.listType;
      currentListParent.list = [];
    } else {
      switch (currentListParent.listType) {
        case "Worship":
          if (line.match(worshipEntryRegex)) {
          }
          // console.log(line.match(worshipEntryRegex));
          currentListEntry.name = line.match(worshipEntryRegex)[1];
          currentListEntry.type = line.match(worshipEntryRegex)[2];

          currentListEntry.spheres = line
            .replace(worshipEntryRegex, "")
            .match(worshipSpheresRegex);
          currentListParent.list.push(currentListEntry);
          currentListEntry = {};
          break;
        case "king":
          if (line.match("[*]")) {
            currentListEntry.name = line.match(leaderNameRegex)[0];
            currentListEntry.lifeAndReign = line.match(leaderLifeReignRegex)[1];
          } else if (line.match(leaderChildrenRegex)) {
            currentListEntry.rulerChildren = line.match(leaderChildrenRegex)[0];
            // console.log(line.match(new RegExp("(\\d)+", "g")));
            if (line.match(new RegExp("(\\d)+", "g")) !== null) {
              currentListEntry.rulerChildrenAges = line.match(
                new RegExp("(\\d)+", "g")
              );
            } else {
              currentListEntry.rulerChildrenAges = [];
            }
          } else if (line.match("\\(([\\d]+%)\\)")) {
            currentListEntry.rulerWorshipped = line.replace(
              new RegExp("\\(([\\d]+%)\\)"),
              ""
            );
            console.log(currentListEntry.rulerWorshipped);
          }
      }
    }
    if (index === arr.length - 1) {
      lists.push(currentListParent);
    }
  });
  // console.log(lists);
  return lists;
};

//
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

/**
 * Takes an individual civ string and returns all lists relatwd to it
 * @param {string} individualCivString
 */
const getCivLists = individualCivString => {
  extractCivLists(individualCivString);
  const civStringLines = individualCivString.split("\n");
  const civLists = [];
  const listIndex = 0;
  let currentListObject = {};

  // console.log(civStringLines);
  civStringLines.forEach(line => {
    if (line.match(listRegex) !== null) {
      if (Object.keys(currentListObject).length > 0) {
        civLists.push(currentListObject);
        currentListObject = {};
      }

      currentListObject.type = line.match(listRegex)[0];
    }
    if (currentListObject.type === "Worship") {
      currentListObject.list = [];
    }
  });
};

/**
 *
 * @param {string} rawCivStringArray - String of all civ entries
 */
const getCivilizationData = rawCivStringArray => {
  try {
    const lists = extractCivLists(rawCivStringArray[0]);
    const test = breakdownCivLists(lists);
    // console.log(test);
  } catch (e) {
    console.log(e);
  }
};
const parseHistoryData = async () => {
  const rawHistoryData = await readHistoryFile();
  const historyDataLines = rawHistoryData.split("\n");
  const rawMonsterMen = extractMonsterManEntries(historyDataLines);
  const rawCivilizations = extractRawCivilationEntries(historyDataLines);

  history.regionName = historyDataLines[0];
  history.regionNickname = historyDataLines[1];
  history.monsterMen = parseMonsterMen(rawMonsterMen);
  getCivilizationData(breakdownCivilizations(rawCivilizations));

  // console.log(history);
};

parseHistoryData();
