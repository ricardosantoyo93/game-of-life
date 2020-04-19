import types from './action-types';


/**
 * Toggles the state of an specific cell
 * @param {Integer} row 
 * @param {Integer} col 
 */
const toggleDeadCell = (row, col) => {
    return {
        type: types.GRID_TOGGLE_DEAD_CELL,
        payload: {
            row,
            col
        }
    }
};

/**
 * Sets a matrix of boolean values representing the state of each cell
 * @param {Array<Array<Boolean>>} dead 
 */
const setDeadArray = (dead) => {
    return {
        type: types.GRID_SET_DEAD_ARRAY,
        payload: dead
    }
};

export default { toggleDeadCell, setDeadArray };
