import Bid from "@Classes/Bid";

import { parsePhoneNumberFromString } from 'libphonenumber-js';

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

    get phone() {
        const formattedPhone = parsePhoneNumberFromString(this._data.phone);
        return formattedPhone ? formattedPhone.formatInternational() : this._data.phone;
    }

    get bids() {
        return this._data.bids.map(data => new Bid(data));
    }

    props() {
        const { 
            id, 
            name,
            phone,
            _data: { email, phone: phoneRaw, hasPremium, bids, avatarUrl },
        } = this;
        return {
            id, name, email, phone, phoneRaw, hasPremium, bids, avatarUrl
        };
    }

    flat() {
        return this._data;
    }
};
