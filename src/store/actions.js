export const addMerchant = merchant => {
    return {
        type: `ADD_MERCHANT`,
        merchant,
    };
};

export const editMerchant = (id, data) => {
    return {
        type: `EDIT_MERCHANT`,
        id,
        data,
    };
};

export const removeMerchant = id => {
    return {
        type: `REMOVE_MERCHANT`,
        id,
    };
};
