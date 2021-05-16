import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#52504f",
        height: "5vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        color: "rgb(214, 202, 202)"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function FooterBar(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <span className="footer-span">Created by&nbsp;<a className="footer-link" href="https://www.linkedin.com/in/yasenvit/"> Vitaliy Yasenivskyy </a>&nbsp; © 2020 New York</span>
        </div>
    );
}
