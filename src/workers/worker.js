// Interval instance
let interval = null;

export const calculateNewGrid = async (grid) => {
    interval = setInterval(() => {
        // TODO: Calculate what cell dies and what cell is alive, then return the object
        const newGrid = [...grid];

        // ! This is just for testing
        newGrid[0][0] = !newGrid[0][0];

        postMessage({ method: 'update-grid', grid: newGrid });
    }, 1000);
}

export const stopWorker = () => {
    clearInterval(interval);
    postMessage({ method: 'worker-stopped' });
}
