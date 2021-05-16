import * as React from "react"
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, Container } from "@material-ui/core"
import { Home } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core"
// https://ansonlowzf.com/how-to-build-a-material-ui-navbar/
const useStyles = makeStyles({
    mainContainer: {
        boxSizing: 'border-box',
        height: '4vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    navbarDisplayFlex: {
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
    },
    navDisplayFlex: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    linkText: {
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontWeight: '500',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        color: 'lightgrey',
    },
    isActive: {
        color: 'white',
    }
});

const navLinks = [
    { title: 'fishbone diagram', path: '/fishbone-diagram' },
    { title: 'chart', path: '/chart' }
]
const Header = (props) => {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.mainContainer}>
            <Toolbar>
                <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
                    <NavLink to='/' className={classes.linkText} activeClassName={classes.isActive}>
                        <IconButton edge="start" color="inherit" aria-label="home">
                            <Home fontSize="medium" />
                        </IconButton></NavLink>
                    <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>

                        {navLinks.map(({ title, path }) => (
                            <NavLink to={path} className={classes.linkText} activeClassName={classes.isActive}>
                                <ListItem button>
                                    <ListItemText primary={title} />
                                </ListItem></NavLink>
                        ))}
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
    )
}
export default Header
