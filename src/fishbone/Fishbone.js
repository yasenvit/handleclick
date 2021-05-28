import React, { Component } from 'react'
import GetJsonData from './components/GetJsonData'
import GetManualData from './components/GetManualData'
import AboutFishbone from './components/AboutFishbone'
import { Route, Link, Switch } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import NoMatch from '../components/NoMatch'
import { ListItem, ListItemText } from "@material-ui/core"
import './FishboneStyling.css'

export default class Fishbone extends Component {
    state = {
        isActive: "about"
    }
    makeActive = (val) => {
        this.setState({ isActive: val })
    }
    classList(classes) {
        return Object
            .entries(classes)
            .filter(entry => entry[1])
            .map(entry => entry[0])
            .join(' ');
    }
    preventDefault = (event) => event.preventDefault();
    render() {

        let fishboneRoutes = (
            <Switch>
                {/* <Route exact path={`${this.props.match.url}`} render={(props) => <AboutFishbone {...props} />} /> */}
                <Route exact path={`${this.props.match.url}`} component={AboutFishbone} />
                <Route exact path={`${this.props.match.url}/manual`} component={GetManualData} />
                <Route exact path={`${this.props.match.url}/json`} component={GetJsonData} />
                <Route>
                    <NoMatch />
                </Route>
            </Switch>
        )

        return (
            <div className='fishbone-container'>
                <div className="fishbone-nav">
                    <div className={this.classList({
                        'fishbone-nav-elem': true,
                        'fishbone-nav-elem-active': this.state.isActive == "about"
                    })}>
                        <NavLink to={`${this.props.match.url}`} onClick={() => this.makeActive("about")}
                            className={this.classList({
                                'fishbone-elem-link': true,
                                'fishbone-elem-link-active': this.state.isActive == "about"
                            })}>
                            <ListItem button className='fishbone-elem-link-listitem'>
                                <ListItemText primary='About Diagram' />
                            </ListItem>
                        </NavLink>
                    </div>
                    <div className={this.classList({
                        'fishbone-nav-elem': true,
                        'fishbone-nav-elem-active': this.state.isActive == "manual"
                    })}>
                        <NavLink to={`${this.props.match.url}/manual`} onClick={() => this.makeActive("manual")}
                            className={this.classList({
                                'fishbone-elem-link': true,
                                'fishbone-elem-link-active': this.state.isActive == "manual"
                            })}>
                            <ListItem button className='fishbone-elem-link-listitem'>
                                <ListItemText primary='Manual' />
                            </ListItem>
                        </NavLink>
                    </div>
                    <div className={this.classList({
                        'fishbone-nav-elem': true,
                        'fishbone-nav-elem-active': this.state.isActive == "json"
                    })}>
                        <NavLink to={`${this.props.match.url}/json`} onClick={() => this.makeActive("json")}
                            className={this.classList({
                                'fishbone-elem-link': true,
                                'fishbone-elem-link-active': this.state.isActive == "json"
                            })}>
                            <ListItem button className='fishbone-elem-link-listitem'>
                                <ListItemText primary='Json' />
                            </ListItem>
                        </NavLink>
                    </div>
                </div>
                {fishboneRoutes}
            </div >
        )
    }
}
