// Interval instance
let interval = null;

export const calculateNewGrid = (grid) => {
    let baseGrid = [...grid];
    interval = setInterval(async () => {
        const newGrid = arrayClone(baseGrid);

        for(let row = 0; row < baseGrid.length; row++) {
            for(let col = 0; col < baseGrid[row].length; col ++) {
                let alive = await checkNeighbourCells(baseGrid, row, col);

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

const checkNeighbourCells = (grid, row, col) => {
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

function arrayClone( arr ) {

    var i, copy;

    if( Array.isArray( arr ) ) {
        copy = arr.slice( 0 );
        for( i = 0; i < copy.length; i++ ) {
            copy[ i ] = arrayClone( copy[ i ] );
        }
        return copy;
    } else if( typeof arr === 'object' ) {
        // eslint-disable-next-line no-throw-literal
        throw 'Cannot clone array containing an object!';
    } else {
        return arr;
    }

}

export const stopWorker = () => {
    clearInterval(interval);
    postMessage({ method: 'worker-stopped' });
}
