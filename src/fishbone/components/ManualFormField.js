import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../FishboneStyling.css'

export default class ManualFormField extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    };

    render() {
        const { title, branches, currentValue, getInput, getBranch,
            inputFor, addTitle, getComplete, keyPress, buttonStyle } = this.props;
        let getBranchButton, inputField, submitButton, buttonTitle, buttonComplete;

        if (inputFor) {
            inputField = (
                <TextField
                    autoFocus={true}
                    inputRef={this.textInput}
                    style={formInputStyle}
                    label={inputFor}
                    value={currentValue}
                    onKeyDown={keyPress}
                    margin="normal"
                />
            );
            submitButton = (
                <Button
                    variant="text"
                    style={buttonStyle}
                    color="primary"
                    onClick={(e) => { getInput(inputFor); this.textInput.current.focus(); }}>
                    {inputFor === "Title (optional)" ? "submit title" :
                        inputFor === "Enter Goal" ? "submit goal" :
                            inputFor === "Enter Branch" ? "add branch" :
                                "add element"}
                </Button>
            );
            buttonTitle = (
                <Button
                    style={buttonStyle}
                    variant="text"
                    size="medium"
                    color="primary"
                    onClick={() => { addTitle(); this.textInput.current.focus(); }}
                >
                    {title === "" ? 'title' : 'update title'}
                </Button>
            );
            buttonComplete = (
                <Button
                    style={buttonStyle}
                    variant="text"
                    size="medium"
                    color="primary"
                    onClick={() => { getComplete(); this.textInput.current.focus(); }}
                >
                    complete
                </Button>
            );
        }

        if (branches && branches.length > 0 && inputFor === "Enter Element") {
            getBranchButton = (
                <Button
                    style={buttonStyle}
                    variant="text"
                    size="medium"
                    color="primary"
                    onClick={() => { getBranch(); this.textInput.current.focus(); }}>
                    New Branch
                </Button>
            )
        };

        return (
            <Fragment>
                <div className="manual-create-form-buttons-field-input">
                    {inputField}
                    {submitButton}
                    {getBranchButton}

                </div>
                <div className="manual-create-form-buttons-field-title">
                    {buttonTitle}
                    {buttonComplete}
                </div>
            </Fragment >
        );
    };
};
var formInputStyle = {
    maxWidth: '300px',
    height: '40px',
    padding: '0px',
    margin: '0px 10px 20px 10px',
    fontSize: '12px',
};

