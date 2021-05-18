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
        // backgroundColor: 'yellow'
    },
    navbarDisplayFlex: {
        boxSizing: 'border-box',
        // maxWidth: '1920px',
        height: '5vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        // backgroundColor: 'green'
    },
    navDisplayFlex: {
        boxSizing: 'border-box',
        height: '5vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        // backgroundColor: 'purple'
    },
    linkText: {
        boxSizing: 'border-box',
        textDecoration: 'none',
        textTransform: 'lowercase',
        fontWeight: '500',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        color: 'lightgrey',
    },
    isActive: {
        boxSizing: 'border-box',
        textDecoration: 'none',
        textTransform: 'lowercase',
        fontWeight: '1000',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        color: 'lightgrey',
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

                    <NavLink exact activeClassName={classes.isActive} to='/' className={classes.linkText}>

                        <IconButton edge="start" color="inherit" aria-label="home">
                            <Home fontSize="small" />
                        </IconButton>
                    </NavLink>

                    <div>

                        <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>

                            {navLinks.map(({ title, path }) => (
                                <NavLink key={title} to={path} className={classes.linkText} activeClassName={classes.isActive}>
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
