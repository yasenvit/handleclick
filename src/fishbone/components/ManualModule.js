import React, { Component } from 'react';
import { Fragment } from 'react';
import BuildDiagram from './BuildDiagram';

export default class ManualModule extends Component {
    componentDidMount() {
        this.props.getActive("manual")
    }
    render() {
        return (
            <Fragment>
                <BuildDiagram page="manual" />
            </Fragment>
        )
    }
}
