import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import GetSample from './GetSample'
import '../FishboneStyling.css'


export default class AboutFishbone extends Component {
    componentDidMount() {
        this.props.getActive("about")
    }


    render() {
        let buttons = (
            <div className="about-buttons">
                <Button
                    style={formButtonStyle}
                    variant="text"
                    size="medium"
                    color="primary"
                    onClick={this.props.goToManual}
                >
                    Create manually
                </Button>
                <Button
                    style={formButtonStyle}
                    variant="text"
                    size="medium"
                    color="primary"
                    onClick={this.props.goToJson}
                >
                    JSON Creation
                </Button>
            </div>
        )
        return (
            <div className="about">
                <div className="about-text">
                    <h3>FISHBONE DIAGRAM</h3>
                    <p>Also called: cause-and-effect diagram, Ishikawa diagram.</p>
                    <div className="about-text-box">
                        <p> This cause analysis tool is considered one of the
                            seven basic quality tools.
                            The fishbone diagram identifies
                            many possible causes for an effect or problem.
                            It can be used to structure a brainstorming session.
                            It immediately sorts ideas into useful categories.</p>
                    </div>

                    <h4>WHEN TO USE A FISHBONE DIAGRAM</h4>

                    <ul>
                        <li>When identifying possible causes for a problem;</li>
                        <li>When a team’s thinking tends to fall into ruts.</li>
                    </ul>
                    <h4>LETS GET STARTED</h4>
                </div>
                {buttons}
                <div id="display" className="about-display">
                    <GetSample />
                </div>
            </div >
        );
    };
};

var formButtonStyle = {
    maxWidth: '250px',
    maxHeight: '150px',
    minWidth: '250px',
    minHeight: '40px',
    padding: '0px',
    margin: '2px',
    // fontFamily: "Computer Modern Bright",
    fontFamily: "Computer Modern TypeWriter",
    fontSize: '16px',
    fontWeight: 700,
    color: 'whitesmoke',
    backgroundColor: "#5b6692",
};


