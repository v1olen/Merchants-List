export default (state = {}, action) => {
    switch (action.type) {
        case `ADD_MERCHANT`:
            return {
                ...state,
                merchants: state.merchants ? [...state.merchants, action.merchant] : [action.merchant],
            }
        case `EDIT_MERCHANT`:
            const merchants = state.merchants.map(merchant => merchant.id === action.id ? action.data : merchant);
            return {
                ...state,
                merchants,
            }
        default:
            return state;
    }
};
