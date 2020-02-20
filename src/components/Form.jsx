import React, { Component } from 'react'
import { connect } from 'react-redux';

import "./Form.css";

import Merchant from '@Classes/Merchant';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: this.props.editedMerchant,
            isFileDraggingOn: false,
            isVisible: false,
            fileStatus: `Select or drop a file`,
            data: {
                firstName: ``,
                lastName: ``,
                avatarUrl: ``,
                email: ``,
                phone: ``,
                hasPremium: false,
            },
        };
        [
            `toggleMode`,
            `addMerchant`,
            `editMerchant`,
            `processAvatar`,
        ].forEach(functionName => this[functionName] = this[functionName].bind(this));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editedMerchant && nextProps.editedMerchant !== this.state.editMode) {
            this.initEditMode(nextProps.editedMerchant);
        }
    }

    initEditMode(id) {
        const {
            firstName, lastName, avatarUrl, email, phone, hasPremium,
        } = this.props.merchants.filter(merchant => merchant.id === id)[0].flat();
        this.setState({
            isVisible: true,
            editMode: id,
            data: { firstName, lastName, avatarUrl, email, phone, hasPremium },
        });
    }

    addMerchant() {
        this.props.dispatch({
            type: `ADD_MERCHANT`,
            merchant: new Merchant({ ...this.state.data }),
        });
        this.props.onAddingMode();
        this.setState({
            fileStatus: `Select or drop a file`,
            data: {
                firstName: ``,
                lastName: ``,
                avatarUrl: ``,
                email: ``,
                phone: ``,
                hasPremium: false,
            },
        });
    }

    toggleMode() {
        this.setState({
            editMode: !this.state.editMode,
            data: {
                firstName: ``,
                lastName: ``,
                avatarUrl: ``,
                email: ``,
                phone: ``,
            },
        });
    }

    editMerchant() {
        const id = this.props.editedMerchant;
        this.props.dispatch({
            type: `EDIT_MERCHANT`,
            id,
            data: new Merchant({ ...this.state.data, id }),
        });
        
    }

    processAvatar({ target: { files: [file] } }) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.setState({ fileStatus: file.name, isFileDraggingOn: false } )
        reader.onload = () => {
            this.setState({ data: { ...this.state.data, avatarUrl: reader.result} })
        };
    }

    render() {
        return (
            <div className={`Form ${this.state.isVisible ? '--Visible' : `--Invisible`} ${this.state.editMode ? `--EditMode` : `--AddMode`}`}>
                <h3 className="Form__Heading">
                    {this.state.editMode ? `Edit merchant` : `Add a merchant`}
                </h3>
                <button type="button" className="Form__ModeToggle" onClick={this.toggleMode}>Add a new merchant instead?</button>
                <div className="Form__Trigger" onClick={() => this.setState({ isVisible: !this.state.isVisible })}>
                    <span className="Form__TriggerIcon">‹</span>
                </div>
                <div className="Form__Field --FirstName">
                    <label className="Form__FieldLabel" htmlFor="first-name">First name</label>
                    <input className="Form__FieldInput" value={this.state.data.firstName} id="first-name" onInput={({ target }) => this.setState({ data: { ...this.state.data, firstName: target.value } })} type="text" />
                </div>
                <div className="Form__Field --LastName">
                    <label className="Form__FieldLabel" htmlFor="last-name">Last name</label>
                    <input className="Form__FieldInput" value={this.state.data.lastName} id="last-name" onInput={({ target }) => this.setState({ data: { ...this.state.data, lastName: target.value } })} type="text" />
                </div>
                <div className={`Form__Field --Avatar ${this.state.isFileDraggingOn ? `--IsFileDraggingOn` : ``}`} data-label={ this.state.fileStatus }>
                    <label className="Form__FieldLabel" htmlFor="avatar">Avatar</label>
                    <input className="Form__FieldFileInput" id="avatar" onInput={this.processAvatar} onDragOver={() => this.setState({ isFileDraggingOn: true, fileStatus: `Drop here` })}  onDragEnd={() => this.setState({ isFileDraggingOn: false, fileStatus: `Select or drop a file` })} accept="image/png, image/jpeg" type="file" />
                </div>
                <div className="Form__Field --HasPremium">
                    <label className="Form__FieldLabel">Subscription</label>
                    <button className={`Form__FieldButton ${this.state.data.hasPremium ? `` : `--Active`}`} onClick={() => this.setState({ data: { ...this.state.data, hasPremium: false } })} type="button">Standard</button>
                    <button className={`Form__FieldButton ${this.state.data.hasPremium ? `--Active` : ``}`} onClick={() => this.setState({ data: { ...this.state.data, hasPremium: true } })} type="button">Premium</button>
                </div>
                <div className="Form__Field --Email">
                    <label className="Form__FieldLabel" htmlFor="email">E-mail</label>
                    <input className="Form__FieldInput" value={this.state.data.email} id="email" onInput={({ target }) => this.setState({ data: { ...this.state.data, email: target.value } })} type="email" />
                </div>
                <div className="Form__Field --Phone">
                    <label className="Form__FieldLabel" htmlFor="phone">Phone number</label>
                    <input className="Form__FieldInput" value={this.state.data.phone} id="phone" onInput={({ target }) => this.setState({ data: { ...this.state.data, phone: target.value } })} type="tel" />
                </div>
                {
                    this.state.editMode ? (
                        <button className="Form__Button --Submit" onClick={this.editMerchant}>Edit merchant</button>
                    ) : (
                        <button className="Form__Button --Submit" onClick={this.addMerchant}>Add a merchant</button>
                    )
                }
            </div>
        );
    }
}



const mapStateToProps = state => ({
    merchants: state.merchants,
});

export default connect(
    mapStateToProps,
)(Form);
