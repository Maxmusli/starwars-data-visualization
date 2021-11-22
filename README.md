## Star Wars Planet Data Dashboard
Data visualization dashboard for SWAPI

### Table of contents
[Project structure](#project-structure)

[Installation](#installation)

[Technologies used](#technologies-used)

### Project structure

````
public/
|- idex.html
src/
|- index.js _______________________________ # Application entry 
|- App.js _________________________________ # Application init
|  |- Action/ _____________________________ # 
|  |- Components/
|    |- bar_chart.jsx
|    |- loader.jsx
|    |- nav_bar.jsx
|    |- pagination.jsx
|    |- table.jsx
|  |- Styles/ _____________________________ # sass 
|  |- Utilities/ __________________________ # helper functions

### Installation

1- Clone the repository

`git clone https://github.com/Maxmusli/starwars-data-visualization.git`

2- `yarn` or `npm install` to install npm packages

3- start dev server using `yarn start` or `npm start`.

3- build and bundling your resources for production `npm build`.

4- Unit testing will watch all your changes in the test files as well as create coverage folder for you. 
`yarn test` `npm test`

### Run

- navigate to starwars-data-visualization/ `npm start`. listening on port 3000.
