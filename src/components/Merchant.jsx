import React, { Component } from 'react';
import "./Merchant.css";

export default class Merchant extends Component {

    render() {
        return (
            <div className={`Merchant ${this.props.hasPremium ? `--Premium` : `--Lite`} `}>
                <h2 className="Merchant__Name">
                    { this.props.name }
                </h2>
                <button className="Merchant__Edit" type="button" onClick={ this.props.setEditedMerchant }>Edit</button>
                <img src={ this.props.avatarUrl } alt="" className="Merchant__Avatar"/>
                <span className="Merchant__Email">{ this.props.email }</span>
                <span className="Merchant__Phone">{ this.props.phone }</span>
            </div>
        )
    }
};
