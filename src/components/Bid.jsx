import React, { Component } from 'react';
import { connect } from 'react-redux';

import "./Bid.css";

class Bid extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isVisible: !!this.props.merchant,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isVisible: !!nextProps.merchant,
        });
    }

    render() {
        return (
            <div className="Bid">
                <h3 className="Bid__Title">
                    { this.props.title }
                </h3>
                <div className="Bid__CreatedDate">
                    {this.props.formatedDate}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    merchants: state.merchants,
});

export default connect(
    mapStateToProps,
)(Bid);
