import React, { Component } from 'react';
import BuildDiagram from './BuildDiagram';

export default class ManualModule extends Component {
    componentDidMount() {
        this.props.getActive("manual")
    }
    render() {
        return (
            <div className="fishbone-manual-create">
                <div className="fishbone-manual-create-container">
                    <BuildDiagram page="manual" />
                </div>
            </div>
        )
    }
}
