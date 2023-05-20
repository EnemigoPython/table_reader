# table_reader
A quick HTML table reader I cooked up using ChatGPT.

## about
Use this simple tool to import table HTML (just the `<table>...</table>` bit). This tool will index it & provide search functionality.

Only tested so far on the example table (blender cheat sheet).

I directly wrote very little of this, it is mostly the result of prompting ChatGPT & a little bit of refactoring of the output code.

My favourite part is the free CSS!

## features
- Use the search bar to filter rows (won't filter one-line rows as these are assumed to be headers)
- Use the lookup URL input to enter the first part of a search URL, then when you click on any cell in the table it will use that URL to search for the cell text.
- Click on headers on the left side to scroll to them in the table.
