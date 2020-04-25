import types from './action-types';

const toggleRun = () => {
    return {
        type: types.CORE_TOGGLE_RUN
    }
};

export default { toggleRun };
