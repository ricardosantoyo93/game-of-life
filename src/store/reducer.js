import { GridReducer } from '../components/grid';
import { CoreReducer } from '../components';

const reducer = (state = {}, action) => {
    return {
        core: CoreReducer(state.core, action),
        grid: GridReducer(state.grid, action)
    };
};

export default reducer;
