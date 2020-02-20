import React, { Component } from 'react';
import { connect } from 'react-redux';

import MerchantComponent from '@Components/Merchant';
import FormComponent from '@Components/Form';

import './App.css';

class App extends Component { 
    constructor(props) {
        super(props)
    
        this.state = {
            editedMerchant: false,
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App__Header">

                    <h2>Merchants</h2>
                </div>
                <div className="App__Content">
                    <div className="Merchants">
                        {[...this.props.merchants].reverse().map(merchant => (
                            <MerchantComponent key={merchant.id} {...merchant.props()} setEditedMerchant={() => this.setState({ editedMerchant: merchant.id })}/>
                        ))}
                    </div>
                    <FormComponent editedMerchant={this.state.editedMerchant} onAddingMode={() => this.setState({ editedMerchant: false })} />
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
