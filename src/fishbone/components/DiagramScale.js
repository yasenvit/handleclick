import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const styles = theme => ({
    root: {
        width: '80%',
        color: '#333333',
        textAlign: 'center',
        fontFamily: 'Computer Modern Typewriter',
    },
    margin: {
    },
});

const ChangeFontSlider = withStyles({
    root: {
        color: "#52504f",
        height: 2,
    },
    thumb: {
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 4,
        borderRadius: 2,
        backgroundColor: "#52504f"
    },
    rail: {
        height: 4,
        borderRadius: 2,
        backgroundColor: "#52504f"
    },
})(Slider);

class DiagramScale extends Component {
    state = {
        scaleIdx: 1
    }
    handleChange = (event, newValue) => {
        event.preventDefault();
        this.setState({ scaleIdx: newValue });
        this.props.getScaleIdx(newValue);
    };
    getDiagramSize = (size) => {
        this.setState({
            scaleIdx: size
        });
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.scaleIdx !== this.props.scaleIdx) {
            this.getDiagramSize(this.props.scaleIdx);
        };
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.margin} />
                <ChangeFontSlider
                    valueLabelDisplay="auto"
                    value={this.state.scaleIdx}
                    onChange={this.handleChange}
                    min={0.4}
                    max={1}
                    step={0.05}
                />
            </div>
        )
    }
}
export default withStyles(styles)(DiagramScale);
