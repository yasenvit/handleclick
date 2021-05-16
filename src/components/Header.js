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
        backgroundColor: 'green'
    },
    navbarDisplayFlex: {
        boxSizing: 'border-box',
        height: '4vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        backgroundColor: 'yellow'
    },
    navDisplayFlex: {
        boxSizing: 'border-box',
        height: '4vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'blue'
    },
    linkText: {
        boxSizing: 'border-box',
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontWeight: '500',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        color: 'lightgrey',
        backgroundColor: 'orange'
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
                    <div className="header-elem">
                        <NavLink exact activeClassName={classes.isActive} to='/' className={classes.linkText}>

                            Home
                        </NavLink>
                    </div>
                    <div>

                        <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>

                            {navLinks.map(({ title, path }) => (
                                <NavLink to={path} className={classes.linkText} activeClassName={classes.isActive}>
                                    <ListItem button>
                                        <ListItemText primary={title} />
                                    </ListItem></NavLink>
                            ))}
                        </List>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}
export default Header
