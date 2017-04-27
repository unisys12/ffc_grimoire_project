FFC Grimoire Project
====================

## Purpose
Gather the Grimoire for the game Destiny, in a verstial format and place it in a centralized location. By the end of the project _(does it ever really end?)_ we hope to create a small application that can be run from the cmd line, download either the Grimoire or Items and store that in a CSV format in a Google Drive folder.

## Proposed Methods
At this early stage, there is no build process in place and really don't know if we need one for such a small project. Maybe bringing Babeljs onboard would not be a bad idea, but... I want to keep things as simple as possible.

## Current Status
Project is just getting started, so... hop on board!

## To-Do-List
<dl>
  <dt>Move Core Methods</dt>
  <dd>Currently, the only core method somewhat working is `fetchGrimoire()`. It resides in `index.js` since this is the first one that I started work on. Once the current issues with it are resolved, I can move it out into it's on sub-folder.</dd>
  <dt>Create Core Logic</dt>
  <dd>The core logic will reside within `index.js`. It will interprate cmds given at the cmd line and based in that, create a Grimoire csv file or a Items csv file.</dd>
<dl>