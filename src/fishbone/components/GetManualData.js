import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ManualFormField from './ManualFormField';
import BuildDiagram from './BuildDiagram';
import '../FishboneStyling.css'

export default class GetManualData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goal: "",
            title: "",
            inputFor: "",
            currentValue: "",
            previousValue: "",
            branches: [],
            prevInput: ""
        };
        this.keyPress = this.keyPress.bind(this);
    };
    componentDidMount() {
        this.props.getActive("manual")
    }
    getBranch = () => {
        this.setState({
            inputFor: "Enter Branch",
            prevInput: "Enter Branch"
        });
    };

    addTitle = () => {
        this.setState({ inputFor: "Title (optional)" });
    }
    getComplete = () => {
        this.setState({ inputFor: "" })
    }
    handleChange = () => ({ target: { value } }) => {
        this.setState({
            currentValue: value
        });
    };

    getCreatedManually = () => {
        this.setState(state => ({
            title: "",
            goal: "",
            branches: [],
            inputFor: "Enter Goal",
            prevInput: "",
            currentValue: ""
        }));
    };

    keyPress(e) {
        if (e.keyCode === 13) {
            this.getInput(this.state.inputFor);
        };
    };

    getInput = (name) => {
        const { currentValue, branches } = this.state
        if (currentValue === "" && name !== "Title (optional)") {
            alert("Empty input isn't allowed")
        } else {
            if (name === "Enter Goal") {
                this.setState({
                    goal: currentValue,
                    currentValue: "",
                    inputFor: "Enter Branch",
                    prevInput: "Enter Branch"
                })
            } else if (name === "Enter Branch") {
                this.setState(prevState => ({
                    branches: [...prevState.branches, { name: currentValue, elements: [] }],
                    branchName: currentValue,
                    inputFor: "Enter Element",
                    prevInput: "Enter Element",
                    currentValue: "",
                }))
            } else if (name === "Enter Element") {
                branches[branches.length - 1].elements.push(currentValue);
                this.setState({
                    branches: branches.map(object => {
                        let newObj = {};
                        newObj["name"] = object.name;
                        newObj["elements"] = object.elements;
                        return newObj;
                    }),
                    inputFor: "Enter Element",
                    prevInput: "Enter Element",
                    currentValue: ""
                })
            } else if (name === "Title (optional)") {
                this.setState(state => ({
                    title: currentValue,
                    currentValue: "",
                    inputFor: state.prevInput ? state.prevInput : "Enter Goal",
                }))
            };
        };
    };

    getBack = () => {
        const { branches, inputFor, goal, title } = this.state;
        let nextGoal = goal;
        let nextTitle = title;
        let lastBranch, poppedElement, lastBranchElements, lastBranchElementsLength, nextInputFor;
        if (inputFor === "Enter Goal") {
            this.setState({
                inputFor: "",
                currentValue: "",
                previousValue: "",
            })
        } else if ((inputFor === "Enter Branch" && branches.length > 0) || inputFor === "Title (optional)") {
            this.setState({ inputFor: "Enter Element" })
        } else {
            if (branches.length > 1) {
                lastBranchElements = branches[branches.length - 1].elements;
                lastBranchElementsLength = lastBranchElements.length;
                if (lastBranchElementsLength > 0) {
                    poppedElement = lastBranchElements[lastBranchElementsLength - 1];
                    lastBranch = branches[branches.length - 1].name;
                    lastBranchElements.pop();
                    nextInputFor = "Enter Element";
                } else {
                    poppedElement = branches[branches.length - 1].name;
                    lastBranch = branches[branches.length - 2].name;
                    branches.pop();
                    nextInputFor = "Enter Branch";
                }
            } else if (branches.length === 1) {
                lastBranchElements = branches[branches.length - 1].elements;
                lastBranchElementsLength = lastBranchElements.length;
                if (lastBranchElementsLength > 0) {
                    poppedElement = lastBranchElements[lastBranchElementsLength - 1];
                    lastBranch = branches[branches.length - 1].name;
                    lastBranchElements.pop();
                    nextInputFor = "Enter Element";
                } else {
                    poppedElement = branches[branches.length - 1].name;
                    lastBranch = "";
                    branches.pop();
                    nextInputFor = "Enter Branch";
                }
            } else if (branches.length === 0) {
                nextGoal = "";
                nextInputFor = "Enter Goal";
                nextTitle = ""
            };
            this.setState({
                goal: nextGoal,
                title: nextTitle,
                branches: branches,
                currentValue: "",
                branchName: lastBranch,
                inputFor: nextInputFor,
                previousValue: poppedElement
            });
        };
    };

    render() {
        console.log(this.state.inputFor, "<-----------")

        const { title, goal, branches, currentValue, inputFor,
            branchName, previousValue } = this.state;
        let initialButton, formField;
        if (!inputFor) {
            initialButton = (
                <Button
                    variant="text"
                    style={buttonStyle}
                    color="primary"
                    onClick={() => { this.getCreatedManually() }}
                >
                    create new
                </Button>
            );
        } else {
            initialButton = (
                <Button
                    variant="text"
                    style={buttonStyle}
                    color="primary"
                    onClick={() => { this.getBack() }}
                >
                    back
                </Button>
            );
        };
        formField = (<ManualFormField
            goal={goal} branches={branches}
            previousValue={previousValue}
            currentValue={currentValue}
            inputFor={inputFor}
            title={title}
            getInput={this.getInput}
            getBranch={this.getBranch}
            addTitle={this.addTitle}
            getComplete={this.getComplete}
            branchName={branchName}
            keyPress={this.keyPress}
            buttonStyle={buttonStyle}
        />);

        return (
            <div className="manual-create">
                <div className="manual-create-form-buttons" onChange={this.handleChange(inputFor)}>
                    <div className="manual-create-form-buttons-initial">
                        {initialButton}
                    </div>
                    <div className="manual-create-form-buttons-field">
                        {formField}
                    </div>
                </div>
                <div className="manual-display">
                    <BuildDiagram
                        page="manual"
                        title={title}
                        goal={goal}
                        branches={branches}
                        previousValue={previousValue}
                    />
                </div>
            </div>
        );
    };
};
var buttonStyle = {
    width: '120px',
    height: '40px',
    margin: '0px 5px 0px 5px',
    fontFamily: "Computer Modern TypeWriter",
    fontSize: '12px',
    fontWeight: 600,
    borderWidth: '1.6px',
    backgroundColor: '#5b6692',
    color: "whitesmoke"
};
