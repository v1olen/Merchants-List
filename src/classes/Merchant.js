export default class Merchant {
    constructor(data) {
        this._data = {
            id: (Math.random() * 1e+5).toFixed(0),
            firstName: ``,
            lastName: ``,
            avatarUrl: ``,
            email: ``,
            phone: ``,
            hasPremium: false,
            bids: [],
            ...data,
        };
    }

    get id() {
        return this._data.id;
    }

    get name() {
        return `${this._data.firstName} ${this._data.lastName}`;
    }

    props() {
        const { 
            id, 
            name, 
            _data: { email, phone, hasPremium, bids, avatarUrl },
        } = this;
        return {
            id, name, email, phone, hasPremium, bids, avatarUrl
        };
    }
};
