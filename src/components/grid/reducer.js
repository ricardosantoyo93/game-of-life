import types from './action-types';

const GridReducer = (state, { type, payload }) => {
    switch(type) {
        case types.GRID_TOGGLE_ALIVE_CELL:
            const { row, col } = payload;
            const nextState = [...state];
            
            nextState[row][col] = !nextState[row][col];
            return [...nextState]

        case types.GRID_SET_ALIVE_ARRAY:
            return [...payload]
        default:
            return state;
    }
}

export default GridReducer;
