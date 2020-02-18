import React, { Component } from 'react';
import { connect } from 'react-redux';


import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App__Header">

                    <h2>Merchants</h2>
                </div>
                <div className="App__Content">
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
)(App);
