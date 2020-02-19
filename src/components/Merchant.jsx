import React, { Component } from 'react'

class Merchant extends Component {

    render() {
        return (
            <div className="Merchant">
                <h2 className="Merchant__Name">
                    { this.props.name }
                </h2>
                <img src={ this.props.avatarUrl } alt="" className="Merchant__Avatar"/>
                <span className="Merchant_Email">{ this.props.email }</span>
                <span className="Merchant_Phone">{ this.props.phone }</span>
            </div>
        )
    }
}

export default Merchant;