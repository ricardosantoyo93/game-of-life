import types from './action-types';

const CoreReducer = (state = {}, { type }) => {
    switch(type) {
        case types.CORE_TOGGLE_RUN:
            return {
                ...state,
                run: !state.run
            }
        default:
            return state;
    }
};

export default CoreReducer;
