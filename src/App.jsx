import React, { Component } from 'react';
import { connect } from 'react-redux';

import MerchantComponent from '@Components/Merchant';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App__Header">

                    <h2>Merchants</h2>
                </div>
                <div className="App__Content">
                    { this.props.merchants.map(merchant => (
                        <MerchantComponent key={ merchant.id } { ...merchant.props() } />
                    )) }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    merchants: state.merchants,
});

export default connect(
    mapStateToProps,
)(App);
