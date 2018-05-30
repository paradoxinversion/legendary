# Legendary

Legendary is a parser for Dwarf Fortress legends data.

Notes/Methodologies

World History Files

Lines 1 and 2 and the name of the region and the region's nickname.

The next block of info regards different types of monster men (?) present in the region. Each of these is a single line and ends with 'men'. Lines may have spaces and multiple words.

## Civilizations

### Structure

Civ

## Method

The general flow is, "Read, Breakdown, and Parse."

Each file is broken up into several clear sections, that can be extracted from the original string, allowing only those sections to be parsed. This breakdown allows us to work with specific pieces of data, rather than attempting to parse multiple different kinds of data with one (or more) massive parser functions.
