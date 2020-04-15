import types from './action-types';

const GridReducer = (state, { type }) => {
    switch(type) {
        case types.GRID_UPDATE_SELECTED_CELL:
            return {
                ...state,
                // Do Something
            }
        default:
            return state;
    }
}

export default GridReducer;
