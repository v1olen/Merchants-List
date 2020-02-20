import React, { Component } from 'react';

export default class FormFieldToggle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
        });
    }

    toggleValue(newValue) {
        this.setState({
            value: newValue,
        });
        this.props.onInput(newValue);
    }

    render() {
        return (
            <div className={
                `Form__Field ${this.props.modifierClass}`
            }>
                <label className="Form__FieldLabel">
                    {
                        this.props.label
                    }
                </label>
                <button
                    className={
                        `Form__FieldButton ${this.state.value ? `` : `--Active`}`
                    }
                    onClick={
                        () => this.toggleValue(false)
                    }
                    type="button"
                >
                    Standard
                </button>
                <button
                    className={
                        `Form__FieldButton ${this.state.value ? `--Active` : ``}`
                    }
                    onClick={
                        () => this.toggleValue(true)
                    }
                    type="button"
                >
                    Premium
                </button>
            </div>
        )
    }
};
