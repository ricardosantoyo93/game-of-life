import axios from 'axios';

// Interval instance
let interval = null;

/**
 * Takes an original grid, calculates each iteration of each cell, and then sends a message to the main thread to update the grid
 * @param {Array<Array<Boolean>>} grid Original grid
 */
export const calculateNewGrid = (grid) => {
    let baseGrid = [...grid];

    interval = setInterval(async () => {
        const res = await axios.post('/api/grid', { grid: baseGrid });

        baseGrid = res.data.grid;

        postMessage({ method: 'update-grid', grid: baseGrid });
    }, 350);
}

/**
 * Clears the interval and stops the worker
 */
export const stopWorker = () => {
    clearInterval(interval);
    postMessage({ method: 'worker-stopped' });
}
