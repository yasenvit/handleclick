import React, { Component } from 'react'
import GetJsonData from './components/GetJsonData'
import GetManualData from './components/GetManualData'
import AboutFishbone from './components/AboutFishbone'
import { Route, Link, Switch } from 'react-router-dom'
import NoMatch from '../components/NoMatch'
import './FishboneStyling.css'



export default class Fishbone extends Component {
    preventDefault = (event) => event.preventDefault();
    render() {

        // console.log(this.props.match.url)
        let fishboneRoutes = (
            <Switch>
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
                <div className="fishbone-container-nav">
                    <div className='fishbone-container-nav-link'>
                        <Link to={`${this.props.match.url}`}>About Diagram</Link>
                    </div>
                    <div className='fishbone-container-nav-link'>
                        <Link to={`${this.props.match.url}/manual`}>Manual</Link>
                    </div>
                    <div className='fishbone-container-nav-link'>
                        <Link to={`${this.props.match.url}/json`}>Json</Link>
                    </div>
                </div>

                { fishboneRoutes}
            </div >
        )
    }
}
