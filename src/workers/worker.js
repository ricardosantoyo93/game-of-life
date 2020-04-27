// Interval instance
let interval = null;

/**
 * Takes an original grid, calculates each iteration of each cell, and then sends a message to the main thread to update the grid
 * @param {Array<Array<Boolean>>} grid Original grid
 */
export const calculateNewGrid = (grid) => {
    let baseGrid = [...grid];
    interval = setInterval(() => {
        const newGrid = arrayClone(baseGrid);

        for(let row = 0; row < baseGrid.length; row++) {
            for(let col = 0; col < baseGrid[row].length; col ++) {

                let alive = getAliveNeighbourCells(baseGrid, row, col);

                // Alive conditions
                if(baseGrid[row][col] === true) {
                    if(alive === 2 || alive === 3) {
                        newGrid[row][col] = true;
                    } else {
                        newGrid[row][col] = false;
                    }
                } else {
                    // Dead conditions
                    if(alive === 3) {
                        newGrid[row][col] = true;
                    }
                }
            }
        }

        baseGrid = [...newGrid];

        postMessage({ method: 'update-grid', grid: baseGrid });
    }, 500);
}

/**
 * Given a position in a grid, checks the amount of living cells in its neighborhood
 * @param {Array<Array<Boolean>>} grid The original grid
 * @param {Integer} row Current row
 * @param {Integer} col Current column
 * @return {Integer} Amount of living cells
 */
const getAliveNeighbourCells = (grid, row, col) => {
    let alive = 0;

    for(let tmpRow = -1; tmpRow < 2; tmpRow++){
        for(let tmpCol = -1; tmpCol < 2; tmpCol++){
            // We skip the cell we are currently checking
            if(tmpRow !== 0 || tmpCol !== 0) {
                if(typeof grid[row + tmpRow] !== "undefined" 
                && typeof grid[row + tmpRow][col + tmpCol] !== "undefined") {
                    if (grid[row + tmpRow][col + tmpCol]) {
                        alive++;
                    }
                }
            }
        }
    }

    return alive;
}

/**
 * Creates a clone of an array of arrays
 * @param {Array<Array<Any>>} arr 
 * @return {Array<Array<Any>>}
 */
function arrayClone(arr) {
    if(Array.isArray(arr)){
        const copy = arr.slice(0);
        for(let i = 0; i < copy.length; i++ ) {
            copy[ i ] = arrayClone( copy[ i ] );
        }
        return copy;
    } else {
        return arr;
    }
}

/**
 * Clears the interval and stops the worker
 */
export const stopWorker = () => {
    clearInterval(interval);
    postMessage({ method: 'worker-stopped' });
}
