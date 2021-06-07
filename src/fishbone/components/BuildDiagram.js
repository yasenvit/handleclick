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
        diagramSize: 1
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

    getCredential = () => {
        const { rightAngle, leftAngle, axisIdx, isRightDirection } = this.state;
        let canvas = document.getElementById("myCanvas");
        let angleDegree = this.state.isRightDirection ? rightAngle : leftAngle;
        let angleRadian = this.getRadianFromDegree(angleDegree);
        let canvas_dimensions = this.getDisplaySize(this.state.diagramSize)
        let { canvasWidth, canvasHeight } = canvas_dimensions
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
            angleRadian,
            axisHeightPosition,
            axisLength,
            leftEdge,
            topEdge,
            rightEdge,
            bottomEdge
        });
    };

    getDisplaySize = (idx) => {
        var elmnt = document.getElementById("display");
        var canvas_width = elmnt.offsetWidth * 0.95 * idx
        var canvas_height = Math.round(canvas_width / 1.4142)
        this.setState({
            canvasWidth: canvas_width,
            canvasHeight: canvas_height
        })
        return { "canvasWidth": canvas_width, "canvasHeight": canvas_height }
    }

    setDiagramSize = (size) => {
        this.setState({
            diagramSize: size,
        });
    };

    getFontSize = (size) => {
        this.setState({
            childFontSize: size,
            branchFontSize: size + 2,
            goalFontSize: size + 4
        });
    };

    toggleHandler = () => {
        this.setState(state => ({ isRightDirection: !state.isRightDirection }));
    };

    getSorted = (dir, arr) => {
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
    getRadianFromDegree(deg) {
        let radianAngle = deg * (Math.PI / 180);
        return radianAngle;
    }
    getOptimalFontSize = (arr) => {
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
        if (this.props.goal !== prevProps.goal) {
            this.settingData(this.props)
            this.getOptimalFontSize(this.props.branches)
        };
        const { branches, goal, title, previousValue, diagramSize,
            isRightDirection, childFontSize, sorted } = this.state;
        if (
            branches !== prevState.branches ||
            previousValue !== prevState.previousValue
        ) {
            this.getOptimalFontSize(this.state.branches)
        };
        if (branches !== prevState.branches ||
            goal !== prevState.goal ||
            title !== prevState.title ||
            previousValue !== prevState.previousValue ||
            isRightDirection !== prevState.isRightDirection ||
            childFontSize !== prevState.childFontSize ||
            sorted !== prevState.sorted ||
            childFontSize !== prevState.childFontSize ||
            diagramSize !== prevState.diagramSize
        ) {
            Axis(this.state)
        };
        if (diagramSize !== prevState.diagramSize) {
            this.getDisplaySize(diagramSize)
            this.settingData(this.state)
            this.getCredential()
        }
    };

    componentDidMount() {
        this.getDisplaySize();
        this.getCredential();
    };
    render() {
        const { canvasWidth, canvasHeight, isRightDirection, branches, sorted } = this.state;
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
                                    diagramSize={this.state.diagramSize}
                                    setDiagramSize={this.setDiagramSize}
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
