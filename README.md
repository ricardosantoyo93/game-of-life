# The Game of Life: Cellular Automata
React JS approach of Conway's Game of Life.

The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.

Go to its [Wikipedia Page](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) for more info about it.

## Rules

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## Playing the game

1. After installing all the packages, run the project with `npm run dev` and open it in the browser (localhost:3000)
2. Select the dimensions for the grid; you can set custom ones, select a default one, or click on Random.
3. Select the initial set of living cells; You can (un)select each cell individually or click on Randomize to fill the grid with random cells (Recommended)
4. Press START and watch the cells evolve.

Pro-tip: you can stop the execution at any moment clicking on STOP, then change the current set of cells if you want, and restart the execution clicking on START again.

## Running the project

### `npm install`

To install all the packages

### `npm run dev`

To run the client and server

### `npm start`

To only run the client

### `npm run server`

To only run the server

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
