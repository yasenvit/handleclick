import React, { Component } from 'react';
import DisplayDiagram from './DisplayDiagram';
import Axis from './utils/Axis';
import PrintGoal from './utils/PrintGoal';
import LevelBranches from './utils/LevelBranches';
import ArrowButton from './ArrowButton';
import GetOptimalFontSize from './utils/GetOptimalFontSize';
import FontSlider from './FontSlider';
import DiagramScale from './DiagramScale';
import '../FishboneStyling.css';
import GetManualData from './GetManualData.js'
import PrintTitle from './utils/PrintTitle';

export default class BuildDiagram extends Component {
    state = {
        canvas: "",
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

    branchBuilder = () => {
        const { branches } = this.state
        if (branches && branches.length > 0) {
            console.log("BranchBuilder")
            let upperSideObjects = [];
            let bottomSideObjects = [];
            for (let idx = 0; idx < branches.length; idx++) {
                if (idx % 2) {
                    bottomSideObjects.push(branches[idx]);
                } else {
                    upperSideObjects.push(branches[idx]);
                };
            };
            let pairsQty = Math.max(upperSideObjects.length, bottomSideObjects.length);
            let upperSide = "upperSide";
            let bottomSide = "bottomSide";
            LevelBranches(this.state, branches.length, upperSideObjects, pairsQty, upperSide);
            LevelBranches(this.state, branches.length, bottomSideObjects, pairsQty, bottomSide);
        };
    }
    diagramBuilder = () => {
        console.log("Diagrambuilder")
        const { leftEdge, axisLength, axisHeightPosition, title, goal, canvasWidth, canvasHeight, canvas } = this.state
        let cleaner = canvas.getContext('2d');

        if (goal) {
            Axis(this.state);
            PrintTitle(this.state)
            let goalSpace = PrintGoal(this.state, leftEdge, leftEdge + axisLength, axisHeightPosition).goalSpace
            this.branchBuilder();
            this.setState({
                goalSpace
            })
        } else {
            cleaner.clearRect(0, 0, canvasWidth, canvasHeight);
            if (title) {
                PrintTitle(this.state)
            }
        }
    }
    settingIncomeData(obj) {
        console.log("settingIncomeData")
        this.setState({
            goal: obj.goal,
            title: obj.title,
            previousValue: obj.previousValue
            // currentValue: obj.currentValue,
        })

        if (obj.branches) {
            const { goalFontSize, branchFontSize, childFontSize } = GetOptimalFontSize(obj.branches);
            this.setState({
                branches: obj.branches.map(object => {
                    let newObj = {};
                    newObj["name"] = object.name;
                    newObj["elements"] = object.elements;
                    return newObj;
                }),
                originBranches: obj.branches.map(object => {
                    let newObj = {};
                    newObj["name"] = object.name;
                    newObj["elements"] = object.elements;
                    return newObj;
                }),
                goalFontSize: goalFontSize,
                goalOptimalFontSize: goalFontSize,
                branchFontSize: branchFontSize,
                branchOptimalFontSize: branchFontSize,
                childFontSize: childFontSize,
                childOptimalFontSize: childFontSize
            });
        }
    };

    getRadian = (direction) => {
        const { rightAngle, leftAngle } = this.state;
        let angleDegree = direction ? rightAngle : leftAngle;
        let angleRadian = angleDegree * (Math.PI / 180);;
        return angleRadian
    }
    getDisplaySize = (idx) => {
        var elmnt = document.getElementById("display");
        var canvasWidth = elmnt.offsetWidth * 0.95 * idx
        var canvasHeight = Math.round(canvasWidth / 1.4142)
        return { "canvasWidth": canvasWidth, "canvasHeight": canvasHeight }
    }
    preBuilder = () => {
        console.log("preBuilder function")
        let angleRadian = this.getRadian(this.state.isRightDirection)
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
        let angleRadian = this.getRadian(!this.state.isRightDirection)
        this.setState(state => ({ isRightDirection: !state.isRightDirection, angleRadian: angleRadian }));
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

    componentDidUpdate(prevProps, prevState) {
        const { canvas, title, goal, branches, childFontSize, sorted, isRightDirection, angleRadian, scaleIdx, canvasWidth,
            previousValue } = this.state
        console.log("DIDUPDATE")
        if (this.props.goal !== prevProps.goal
            || this.props.title !== prevProps.title
            || this.props.branches !== prevProps.branches
            || this.props.previousValue !== prevProps.previousValue
        ) {
            console.log("props working")
            this.settingIncomeData(this.props)
        };
        if (
            isRightDirection != prevState.isRightDirection
            || scaleIdx != prevState.scaleIdx
        ) {
            this.preBuilder()
        }

        if (canvas !== prevState.canvas
            || previousValue !== prevState.previousValue
            || title !== prevState.title
            || goal !== prevState.goal
            || childFontSize !== prevState.childFontSize
            || branches !== prevState.branches
            || sorted !== prevState.sorted
            || angleRadian != prevState.angleRadian
            || canvasWidth != prevState.canvasWidth
        ) {
            this.diagramBuilder()
        };
    };

    componentDidMount() {
        // console.log("componentDidMount")
        this.preBuilder();
    };
    render() {
        console.log(this.state.goal, "<-state-goal", this.props.goal, "<-props-goal")
        const { canvasWidth, canvasHeight, isRightDirection, branches, sorted, angleRadian } = this.state;
        const { page } = this.props

        let displayDiagram;

        displayDiagram = (
            <canvas className="canvas" id="myCanvas" width={canvasWidth} height={canvasHeight}></canvas>
        );
        return (
            <div className={page === "manual" ? "build vertical-bar" : "build"}>
                <div className={page === "manual" ? "build-bar-vertical" : "build-bar-horizontal"}>
                    <div className={page === "manual" ? "build-buttons vertical" : "build-buttons"}>
                        <ArrowButton
                            toggleHandler={this.toggleHandler}
                            isRightDirection={isRightDirection}
                            printCanvas={this.printCanvas}
                            getSorted={this.getSorted}
                            branches={branches}
                            sorted={sorted}
                            arrowButtonStyle={arrowButtonStyle}
                        />
                        <div className={page === "manual" ?
                            "build-sizing sizing-horizontal" :
                            "build-sizing"}>
                            <div className="build-sizer">
                                <DiagramScale
                                    scaleIdx={this.state.scaleIdx}
                                    getScaleIdx={this.getScaleIdx}
                                />
                            </div>
                            <div className="build-font-slider">
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
            </div >
        );
    };
};

const arrowButtonStyle = {
    fontSize: "10px",
    backgroundColor: '#5b6692',
    color: 'whitesmoke',
    border: "none",
    margin: "0.5em",
};
