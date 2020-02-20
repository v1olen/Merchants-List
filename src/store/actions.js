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
