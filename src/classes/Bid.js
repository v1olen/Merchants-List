export default class Bid {
    constructor(data) {
        this._data = {
            id: +(Math.random() * 1e+5).toFixed(0),
            carTitle: ``,
            created: new Date().toGMTString(),
            ...data,
        };
    }
};
