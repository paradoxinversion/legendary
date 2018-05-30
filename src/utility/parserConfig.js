const config = {
  regexConfig: {
    beastPeopleRegex: new RegExp("([a-zA-Z]+)( ?)men"),
    civilizationRegex: new RegExp(
      "^[a-zA-Z ]+, (Dwarves|Humans|Elves|Goblins|Kobolds)"
    ),
    listRegex: new RegExp("[a-zA-Z-]+(?= list)", "i"),
    worshipEntryRegex: new RegExp("([a-zA-Z -]+), ([a-zA-Z]+):"),
    worshipSpheresRegex: new RegExp("([a-zA-Z]+ [a-zA-Z]+)|([a-zA-Z]+)", "g"),
    leaderNameRegex: new RegExp("([a-zA-Z]+ *[a-zA-Z]+)"),
    leaderLifeReignRegex: new RegExp("\\(([^)]+)\\)"),
    leaderChildrenRegex: new RegExp("([\\d]+) Children|No Children")
  }
};

module.exports = config;
