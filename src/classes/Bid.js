export default class Bid {
    constructor(data) {
        this._data = {
            id: (Math.random() * 1e+5).toFixed(0),
            carTitle: ``,
            created: new Date().toGMTString(),
            ...data,
        };
    }

    get id() {
        return this._data.id;
    }

    get formatedDate() {
        return new Date(this._data.created).toLocaleString();
    }

    get created() {
        return new Date(this._data.created);
    }

    props() {
        const {
            id,
            formatedDate,
            _data: { carTitle: title },
        } = this;
        return {
            id,
            title,
            formatedDate,
        };
    }

    flat() {
        return this._data;
    }
};
