import React, { Component } from 'react'
import { connect } from 'react-redux';

import "./Form.css";

import Merchant from '@Classes/Merchant';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFileDraggingOn: false,
            isVisible: false,
            fileStatus: `Select or drop a file`,
            data: {
                firstName: ``,
                lastName: ``,
                avatarUrl: ``,
                email: ``,
                phone: ``,
            },
        };
        this.addMerchant = this.addMerchant.bind(this);
        this.processAvatar = this.processAvatar.bind(this);
    }

    addMerchant() {
        this.props.dispatch({
            type: `ADD_MERCHANT`,
            merchant: new Merchant({ ...this.state.data }),
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
            <div className={`Form ${this.state.isVisible ? '--Visible' : `--Invisible`}`}>
                <h3 className="Form__Heading">Add a merchant</h3>
                <div className="Form__Trigger" onClick={() => this.setState({ isVisible: !this.state.isVisible })}>
                    <span className="Form__TriggerIcon">
                        ‹
                    </span>
                </div>
                <div className="Form__Field --FirstName">
                    <label className="Form__FieldLabel" htmlFor="first-name">First name</label>
                    <input className="Form__FieldInput" id="first-name" onInput={({ target }) => this.setState({ data: { ...this.state.data, firstName: target.value } })} type="text" />
                </div>
                <div className="Form__Field --LastName">
                    <label className="Form__FieldLabel" htmlFor="last-name">Last name</label>
                    <input className="Form__FieldInput" id="last-name" onInput={({ target }) => this.setState({ data: { ...this.state.data, lastName: target.value } })} type="text" />
                </div>
                <div className={`Form__Field --Avatar ${this.state.isFileDraggingOn ? `--IsFileDraggingOn` : ``}`} data-label={ this.state.fileStatus }>
                    <label className="Form__FieldLabel" htmlFor="avatar">Avatar</label>
                    <input className="Form__FieldFileInput" id="avatar" onInput={this.processAvatar} onDragOver={() => this.setState({ isFileDraggingOn: true, fileStatus: `Drop here` })}  onDragEnd={() => this.setState({ isFileDraggingOn: false, fileStatus: `Select or drop a file` })} accept="image/png, image/jpeg" type="file" />
                </div>
                <div className="Form__Field --Email">
                    <label className="Form__FieldLabel" htmlFor="email">E-mail</label>
                    <input className="Form__FieldInput" id="email" onInput={({ target }) => this.setState({ data: { ...this.state.data, email: target.value } })} type="email" />
                </div>
                <div className="Form__Field --Phone">
                    <label className="Form__FieldLabel" htmlFor="phone">Phone number</label>
                    <input className="Form__FieldInput" id="phone" onInput={({ target }) => this.setState({ data: { ...this.state.data, phone: target.value } })} type="tel" />
                </div>
                <button className="Form__Button --Submit" onClick={ this.addMerchant }>Add a merchant</button>
            </div>
        );
    }
}
export default connect()(Form);
