# Legendary

Legendary is a parser for Dwarf Fortress legends data.

## Current Support

Legendary currently parses World History data (exported from new maps). Next up is World Sites / Pops

## Method/Notes

Each of the raw Legends files have a specific (un unmarked) structure. In order to successfully parse each raw file, the structure of each must be considered. The general flow is, "Read, Breakdown, and Parse."

First, read in each individual section of a file. Then, if it has subcomponents, break it down into those components. After that, parse the processed components in the smallest chunks possible.

We want to divide each section into the smallest pieces possible both to reduce the mental overhead of the code and to make it easy to modify the parser if and when some small change happens to Legend output.
