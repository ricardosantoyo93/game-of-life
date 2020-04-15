import { GridReducer } from './grid';

const reducer = (state = {}, action) => {
    return {
        grid: GridReducer(state.grid, action)
    };
};

export default reducer;
