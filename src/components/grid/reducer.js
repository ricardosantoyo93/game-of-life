import types from './action-types';

const GridReducer = (state, { type, payload }) => {
    switch(type) {
        case types.GRID_TOGGLE_DEAD_CELL:
            const { row, col } = payload;
            const nextState = [...state.dead];
            
            nextState[row][col] = !nextState[row][col];
            return {
                ...state,
                dead: nextState,
            }

        case types.GRID_SET_DEAD_ARRAY:
            return {
                ...state,
                dead: payload
            }
        default:
            return state;
    }
}

export default GridReducer;
