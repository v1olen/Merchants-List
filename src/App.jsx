import React, { Component } from 'react';
import { connect } from 'react-redux';

import MerchantComponent from '@Components/Merchant';
import FormComponent from '@Components/Form';
import BidComponent from '@Components/Bid';

import './App.css';

class App extends Component { 
    constructor(props) {
        super(props)
    
        this.state = {
            editedMerchant: false,
            chosenMerchant: false,
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App__Header">

                    <h2>Merchants</h2>
                </div>
                <div className="App__Content">
                    <div className={`Bids ${this.state.chosenMerchant ? '--Visible' : `--Invisible`}`}>
                        <h2 className="Bids__Heading">Bids</h2>
                        <button type="button" className="Bids__Close" onClick={() => this.setState({ chosenMerchant: false })}>✕</button>
                        {this.state.chosenMerchant && this.props.merchants
                            .filter(({ id }) => id === this.state.chosenMerchant)[0].bids
                            .sort((bidA, bidB) => bidB.created - bidA.created)
                            .map(bid => (
                                <BidComponent
                                    key={
                                        bid.id
                                    }
                                    {...bid.props()}
                                />
                            ))
                        }
                    </div>
                    <div className="Merchants">
                        {[...this.props.merchants].reverse().map(merchant => (
                            <MerchantComponent
                                key={merchant.id}
                                {...merchant.props()}
                                onClick={() => this.setState({ chosenMerchant: merchant.id })}
                                setEditedMerchant={event => {
                                    this.setState({ editedMerchant: merchant.id })
                                }}
                            />
                        ))}
                    </div>
                    <FormComponent
                        editedMerchant={this.state.editedMerchant}
                        onAddingMode={() => this.setState({ editedMerchant: false })}
                        onRemove={() => this.setState({ chosenMerchant: false })}
                    />
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
