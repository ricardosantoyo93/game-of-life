import types from './action-types';

export const updateSelectedCell = () => {
    return {
        type: types.GRID_UPDATE_SELECTED_CELL
    }
};

export default { updateSelectedCell };
