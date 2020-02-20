import React, { Component } from 'react'
import { connect } from 'react-redux';

import "./Form.css";

import Merchant from '@Classes/Merchant';

import FormField from '@Components/FormField';
import FormFieldFile from '@Components/FormFieldFile';
import FormFieldToggle from '@Components/FormFieldToggle';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: this.props.editedMerchant,
            isFileDraggingOn: false,
            isVisible: false,
            isValid: false,
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
            `removeMerchant`,
            `setField`,
        ].forEach(
            functionName =>
                this[functionName] = this[functionName].bind(this)
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editedMerchant && nextProps.editedMerchant !== this.state.editMode) {
            this.initEditMode(nextProps.editedMerchant);
        } else if (nextProps.editedMerchant) {
            this.setState({
                isVisible: true,
            });
        }
    }

    initEditMode(id) {
        const {
            firstName,
            lastName,
            avatarUrl,
            email,
            phone,
            hasPremium,
        } = this.props.merchants.filter(
            merchant => merchant.id === id
        )[0].flat();

        this.setState({
            isVisible: true,
            editMode: id,
            data: {
                firstName,
                lastName,
                avatarUrl,
                email,
                phone,
                hasPremium
            },
        });
    }

    addMerchant() {
        const defaultAvatar = {
            avatarUrl: `https://eu.ui-avatars.com/api/?name=${this.state.data.firstName}+${this.state.data.lastName}`,
        };
        this.props.dispatch({
            type: `ADD_MERCHANT`,
            merchant: new Merchant({ ...this.state.data, bids: getBids(), ...(!this.state.data.avatarUrl ? defaultAvatar : {}) }),
        });
        this.props.onAddingMode();
        this.setState({
            fileStatus: `Select or drop a file`,
        });
        this.clearForm();
    }

    removeMerchant() {
        const id = this.props.editedMerchant;
        this.props.onRemove();
        this.props.dispatch({
            type: `REMOVE_MERCHANT`,
            id,
        });
        this.toggleMode();
    }


    editMerchant() {
        const defaultAvatar = {
            avatarUrl: `https://eu.ui-avatars.com/api/?name=${this.state.data.firstName}+${this.state.data.lastName}`,
        };
        const id = this.props.editedMerchant;
        this.props.dispatch({
            type: `EDIT_MERCHANT`,
            id,
            data: new Merchant({ ...this.state.data, id, ...(!this.state.data.avatarUrl ? defaultAvatar : {}) }),
        });
        
    }

    toggleMode() {
        this.setState({
            editMode: !this.state.editMode,
        });
        this.clearForm();
    }

    clearForm() {
        this.setState({
            data: {
                firstName: ``,
                lastName: ``,
                avatarUrl: ``,
                email: ``,
                phone: ``,
            },
        });
    }
    
    setField(key, value) {
        this.setState({
            data: {
                ...this.state.data,
                [key]: value,
            }
        });
    }

    render() {
        return (
            <form
                className={
                    `Form ${this.state.isVisible ? '--Visible' : `--Invisible`} ${this.state.editMode ? `--EditMode` : `--AddMode`}`
                }
                onSubmit={event => { 
                    event.preventDefault();
                    this.state.editMode ? this.editMerchant() : this.addMerchant();
                }}
            >
                <h3 className="Form__Heading">
                    {
                        this.state.editMode ? 
                            `Edit merchant` :
                            `Add a merchant`
                    }
                </h3>
                <button
                    type="button"
                    className="Form__ModeToggle"
                    onClick={
                        this.toggleMode
                    }
                >
                    Add a new merchant instead?
                </button>
                <div
                    className="Form__Trigger"
                    onClick={
                        () => this.setState({ 
                            isVisible: !this.state.isVisible 
                        })
                    }
                >
                    <span className="Form__TriggerIcon">
                        ‹
                    </span>
                </div>
                <FormField
                    label="First name"
                    modifierClass="--FirstName"
                    value={
                        this.state.data.firstName
                    }
                    onInput={
                        value => this.setField(`firstName`, value)
                    }
                    pattern="\D+"
                />
                <FormField
                    label="Last name"
                    modifierClass="--LastName"
                    value={
                        this.state.data.lastName
                    }
                    onInput={
                        value => this.setField(`lastName`, value)
                    }
                    pattern="\D+"
                />
                <FormFieldFile
                    label="Avatar"
                    modifierClass="--Avatar"
                    value={
                        this.state.data.avatarUrl
                    }
                    onInput={
                        value => this.setField(`avatarUrl`, value)
                    }
                />
                <FormFieldToggle
                    label="Subscription"
                    modifierClass="--HasPremium"
                    value={
                        this.state.data.hasPremium
                    }
                    onInput={
                        value => this.setField(`hasPremium`, value)
                    }
                />
                <FormField
                    label="E-mail"
                    modifierClass="--Email"
                    value={
                        this.state.data.email
                    }
                    inputType="email"
                    onInput={
                        value => this.setField(`email`, value)
                    }
                />
                <FormField
                    label="Phone number"
                    modifierClass="--Phone"
                    value={
                        this.state.data.phone
                    }
                    inputType="tel"
                    onInput={
                        value => this.setField(`phone`, value)
                    }
                    pattern="\+\d+"
                />
                {
                    this.state.editMode ? (
                        <button
                            className="Form__Button --Submit"
                            type="submit"
                        >
                            Edit merchant
                        </button>
                    ) : (
                        <button
                            className="Form__Button --Submit"
                            type="submit"
                        >
                            Add a merchant
                        </button>
                    )
                }
                {
                    this.state.editMode && (
                        <button
                            className="Form__Button --Remove"
                            onClick={
                                this.removeMerchant
                            }
                        >
                            Remove merchant
                        </button>
                    )
                }
            </form>
        );
    }
};

const mapStateToProps = state => ({
    merchants: state.merchants,
});

export default connect(
    mapStateToProps,
)(Form);
