import * as React from "react"
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, Container } from "@material-ui/core"
import { Home } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core"
// https://ansonlowzf.com/how-to-build-a-material-ui-navbar/
const useStyles = makeStyles({
    mainContainer: {
        boxSizing: 'border-box',
        height: '5vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        padding: '0px',
        backgroundColor: '#115293'
    },
    navbarDisplayFlex: {
        boxSizing: 'border-box',
        // maxWidth: '1920px',
        height: '5vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px',
        // backgroundColor: 'green'
    },
    navDisplayFlex: {
        boxSizing: 'border-box',
        height: '5vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: '0px',
        // backgroundColor: 'purple'
    },
    linkText: {
        boxSizing: 'border-box',
        height: '4vh',
        textDecoration: 'none',
        textTransform: 'lowercase',
        fontWeight: '500',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        margin: '0px 5px 0px 5px',
        color: 'lightgrey',
        // backgroundColor: 'yellow',
    },
    linkTestActive: {
        color: 'white',
        backgroundColor: '#1976d2',
        borderRadius: '5px 5px 0px 0px'
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
                <Container maxWidth="md" className={classes.navbarDisplayFlex}>
                    <NavLink exact to='/' style={{ color: 'lightgrey' }} activeStyle={{ color: 'white' }}>
                        <IconButton edge="start" color="inherit" aria-label="home">
                            <Home fontSize="small" />
                        </IconButton>
                    </NavLink>
                    <div>
                        <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
                            {navLinks.map(({ title, path }) => (
                                <NavLink key={title} to={path} className={classes.linkText} activeClassName={classes.linkText, classes.linkTestActive}>
                                    <ListItem button>
                                        <ListItemText primary={title} />
                                    </ListItem>
                                </NavLink>
                            ))}
                        </List>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}
export default Header
