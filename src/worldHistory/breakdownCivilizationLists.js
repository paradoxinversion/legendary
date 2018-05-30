const {
  listRegex,
  worshipEntryRegex,
  worshipSpheresRegex,
  leaderNameRegex,
  leaderLifeReignRegex,
  leaderChildrenRegex
} = require("../utility/parserConfig").regexConfig;

// ! This should only be breaking down the list, but currently parses it as well.
const breakdownCivilizationLists = civListsString => {
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
      // console.log(currentListParent.listType);
      if (currentListParent.listType === "Worship") {
        currentListEntry.name = line.match(worshipEntryRegex)[1];
        currentListEntry.type = line.match(worshipEntryRegex)[2];

        currentListEntry.spheres = line
          .replace(worshipEntryRegex, "")
          .match(worshipSpheresRegex);
        currentListParent.list.push(currentListEntry);
        currentListEntry = {};
      } else {
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
          currentListParent.list.push(currentListEntry);
          currentListEntry = {};
          // console.log(currentListEntry.rulerWorshipped);
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

module.exports = breakdownCivilizationLists;
