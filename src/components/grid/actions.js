import types from './action-types';


/**
 * Toggles the state of an specific cell
 * @param {Integer} row 
 * @param {Integer} col 
 */
const toggleCell = (row, col) => {
    return {
        type: types.GRID_TOGGLE_ALIVE_CELL,
        payload: {
            row,
            col
        }
    }
};

/**
 * Sets a matrix of boolean values representing the state of each cell
 * @param {Array<Array<Boolean>>} grid 
 */
const setNewGrid = (grid) => {
    return {
        type: types.GRID_SET_ALIVE_ARRAY,
        payload: grid
    }
};

export default { toggleCell, setNewGrid };
