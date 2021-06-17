import React, { Component } from 'react';
import DisplayDiagram from './DisplayDiagram';
import Axis from './utils/Axis';
import ArrowButton from './ArrowButton';
import GetOptimalFontSize from './utils/GetOptimalFontSize';
import FontSlider from './FontSlider';
import DiagramScale from './DiagramScale';
import '../FishboneStyling.css';
import GetManualData from './GetManualData.js'

export default class BuildDiagram extends Component {
    state = {
        title: "",
        goal: "",
        currentValue: "",
        previousValue: "",
        branches: [],
        originBranches: [],
        sorted: "unsorted",
        axisIdx: 0.75,
        rightAngle: 60,
        leftAngle: 120,
        isRightDirection: true,
        titleColor: '#333333',
        lineColor: "rgb(17,33,54)",
        childColor: " #A41404",
        branchColor: '#4A090D',
        goalColor: "#4A090D",
        titleFont: "Italic 14pt Helvetica",
        childFontSize: "",
        branchFontSize: "",
        goalFontSize: "",
        scaleIdx: 1,
        // diagramSize: 1
    };

    printCanvas = () => {
        const dataUrl = document.getElementById('myCanvas').toDataURL();
        let windowContent = '<!DOCTYPE html>';
        windowContent += '<html>';
        windowContent += '<head><title>Print canvas</title></head>';
        windowContent += '<body>';
        windowContent += '<img src="' + dataUrl + '">';
        windowContent += '</body>';
        windowContent += '</html>';
        const printWin = window.open('', '', `'width=''width=440,height=260'`);
        printWin.document.open();
        printWin.document.write(windowContent);
        printWin.document.addEventListener('load', function () {
            printWin.focus();
            printWin.print();
            printWin.document.close();
            printWin.close();
        }, true);
    };

    settingData(obj) {
        console.log("settingData")
        if (obj.branches) {
            this.setState({
                goal: obj.goal,
                branches: obj.branches.map(object => {
                    let newObj = {};
                    newObj["name"] = object.name;
                    newObj["elements"] = object.elements;
                    return newObj;
                }),
                title: obj.title,
                currentValue: obj.currentValue,
                previousValue: obj.previousValue,
            });
        }
    };

    getOriginBranches = (data) => {
        console.log("getOriginBranches")
        this.setState({
            originBranches: data.map(object => {
                let newObj = {};
                newObj["name"] = object.name;
                newObj["elements"] = object.elements;
                return newObj;
            })
        });
    };
    getRadian = () => {
        const { rightAngle, leftAngle, isRightDirection } = this.state;
        let angleDegree = isRightDirection ? rightAngle : leftAngle;
        let angleRadian = angleDegree * (Math.PI / 180);;
        return angleRadian
    }
    getDisplaySize = (idx) => {
        var elmnt = document.getElementById("display");
        var canvasWidth = elmnt.offsetWidth * 0.95 * idx
        var canvasHeight = Math.round(canvasWidth / 1.4142)
        return { "canvasWidth": canvasWidth, "canvasHeight": canvasHeight }
    }
    getCredential = () => {
        console.log("getCredentials")
        let angleRadian = this.getRadian()
        let { canvasWidth, canvasHeight } = this.getDisplaySize(this.state.scaleIdx)
        const { axisIdx, isRightDirection } = this.state;
        let canvas = document.getElementById("myCanvas");
        let axisHeightPosition = Math.round(canvasHeight / 2) + 0.5;
        let axisLength = Math.round(canvasWidth * axisIdx) - 50;
        let leftEdge = isRightDirection ? Math.round((canvasWidth - axisLength) / 2)
            : Math.round((canvasWidth - axisLength) / 2);
        let rightEdge = isRightDirection ? Math.round((canvasWidth - axisLength) / 2)
            : Math.round((canvasWidth - axisLength) / 2);
        let topEdge = Math.round(canvasHeight * 0.08);
        let bottomEdge = Math.round(canvasHeight * 0.08);

        this.setState({
            canvas,
            canvasWidth,
            canvasHeight,
            angleRadian,
            axisHeightPosition,
            axisLength,
            leftEdge,
            topEdge,
            rightEdge,
            bottomEdge,
        });
    };

    getScaleIdx = (idx) => {
        this.setState({
            scaleIdx: idx
        })
    }
    getFontSize = (size) => {
        this.setState({
            childFontSize: size,
            branchFontSize: size + 2,
            goalFontSize: size + 4
        });
    };

    toggleHandler = () => {
        this.setState(state => ({ isRightDirection: !state.isRightDirection }));
        // this.getCredential()
    };

    getSorted = (dir, arr) => {
        console.log("getSorted")
        if (dir === "ascend") {
            this.setState({
                branches: arr.sort((a, b) => a.elements.length - b.elements.length),
                sorted: dir
            });
        } else if (dir === "descend") {

            this.setState({
                branches: arr.sort((a, b) => b.elements.length - a.elements.length),
                sorted: dir
            });
        } else if (dir === "unsorted") {
            this.setState({
                branches: this.state.originBranches.map(object => {
                    let newObj = {};
                    newObj["name"] = object.name;
                    newObj["elements"] = object.elements;
                    return newObj;
                }),
                sorted: dir
            });
        };
    };

    getOptimalFontSize = (arr) => {
        console.log("getOptimalFontSize")
        if (arr) {
            const { goalFontSize, branchFontSize, childFontSize } = GetOptimalFontSize(arr);
            this.setState({
                goalFontSize: goalFontSize,
                goalOptimalFontSize: goalFontSize,
                branchFontSize: branchFontSize,
                branchOptimalFontSize: branchFontSize,
                childFontSize: childFontSize,
                childOptimalFontSize: childFontSize
            });
        };
    };
    getData = (obj) => {
        this.setState({
            goal: obj.goal,
            title: obj.title,
            branches: obj.branches,
            previousValue: obj.previousValue
        })
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("DIDUPDATE")

        if (this.props.goal !== prevProps.goal ||
            this.props.title !== prevState.title ||
            this.props.branches !== prevProps.branches ||
            this.props.previousValue !== prevProps.previousValue) {
            console.log("props working, this goal->", this.props.goal, "prevProps GOAL->", prevProps.goal)
            this.getOriginBranches(this.props.branches)
            this.settingData(this.props)
            this.getOptimalFontSize(this.props.branches)
        };
        const { branches, goal, title, previousValue, scaleIdx, canvasWidth,
            isRightDirection, childFontSize, sorted, angleRadian } = this.state;
        if (
            branches !== prevState.branches ||
            previousValue !== prevState.previousValue
        ) {
            console.log("branches or previousValue")
            this.getOptimalFontSize(this.state.branches)
        };
        if (scaleIdx !== prevState.scaleIdx) {
            console.log("SCALE")
            this.getCredential()
        }
        if (branches !== prevState.branches) {
            console.log("Branches--Axis")
            // this.getCredential();
            Axis(this.state)
        } else if (goal !== prevState.goal) {
            console.log("Goal--Axis")
            // this.getCredential();
            Axis(this.state)
        } else if (title !== prevState.title) {
            console.log("Title--Axis")
            // this.getCredential();
            Axis(this.state)
        } else if (previousValue !== prevState.previousValue) {
            console.log("PrevValue--Axis")
            // this.getCredential();
            Axis(this.state)
        } else if (childFontSize !== prevState.childFontSize) {
            console.log("ChildFontSize--Axis")
            // this.getCredential();
            Axis(this.state)
        } else if (isRightDirection !== prevState.isRightDirection) {
            console.log("DIRECTION--Axis")
            // this.getCredential();
            Axis(this.state)
        } else if (sorted !== prevState.sorted) {
            console.log("Sorted--Axis")
            // this.getCredential();
            Axis(this.state)
        } else if (canvasWidth !== prevState.canvasWidth) {
            console.log("CanvasWidth--Axis")
            // this.getCredential();
            Axis(this.state)
        } else if (angleRadian !== prevState.angleRadian) {
            console.log("AngleRadian--Axis")
            // this.getCredential();
            Axis(this.state)
        }

    };

    componentDidMount() {
        console.log("componentDidMount")
        this.getCredential();
    };
    render() {
        console.log("render=======")

        const { canvasWidth, canvasHeight, isRightDirection, branches, sorted, angleRadian } = this.state;
        console.log("R-DIR==>", isRightDirection, "<==")
        console.log("R-angleR==>", angleRadian, "<==")

        let displayDiagram;
        let buttonsCluster = (<div></div>)
        if (this.props.page && this.props.page === "manual") {
            buttonsCluster = (
                <GetManualData getData={this.getData} />
            )
        }
        displayDiagram = (
            <canvas className="canvas" id="myCanvas" width={canvasWidth} height={canvasHeight}></canvas>
        );
        return (
            <div className="build">
                <div className="build-header">
                    <div className="build-imported-buttons">
                        {buttonsCluster}
                    </div>
                    <div className="build-buttons">
                        <ArrowButton
                            toggleHandler={this.toggleHandler}
                            isRightDirection={isRightDirection}
                            printCanvas={this.printCanvas}
                            getSorted={this.getSorted}
                            branches={branches}
                            sorted={sorted}
                            arrowButtonStyle={arrowButtonStyle}
                        />
                        <div className="build-sizing">
                            <div className="build-sizer">
                                <DiagramScale
                                    scaleIdx={this.state.scaleIdx}
                                    getScaleIdx={this.getScaleIdx}
                                />
                            </div>
                            <div className="build-slider">
                                <FontSlider
                                    childOptimalFontSize={this.state.childOptimalFontSize}
                                    getFontSize={this.getFontSize}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="build-display" id="display">
                    <DisplayDiagram diagram={displayDiagram} />
                </div>
            </div>
        );
    };
};

const arrowButtonStyle = {
    fontSize: "10px",
    backgroundColor: '#5b6692',
    color: 'whitesmoke',
    border: "none",
    marginRight: "0.5em",
};
