export default (state = {}, action) => {
    switch (action.type) {
        case `ADD_MERCHANT`:
        return {
            ...state,
            merchants: state.merchants ? [...state.merchants, action.merchant] : [action.merchant],
        }
        default:
            return state;
    }
};
