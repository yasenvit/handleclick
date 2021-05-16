import React, { Component } from 'react'
import GetJsonData from './components/GetJsonData'
import GetManualData from './components/GetManualData'
import Home from './components/Home'
import { Route, Link, Switch } from 'react-router-dom'
import NoMatch from '../components/NoMatch'

export default class Fishbone extends Component {

    render() {
        // console.log(this.props.match.url)
        let fishboneRoutes = (
            <Switch>
                <Route exact path={`${this.props.match.url}`} component={Home} />
                <Route exact path={`${this.props.match.url}/manual`} component={GetManualData} />
                <Route exact path={`${this.props.match.url}/json`} component={GetJsonData} />
                <Route>
                    <NoMatch />
                </Route>
            </Switch>
        )

        return (
            <div>
                <ul>
                    <li>
                        <Link to={`${this.props.match.url}/manual`}>Manual</Link>
                    </li>
                    <li>
                        <Link to={`${this.props.match.url}/json`}>Json</Link>
                    </li>
                </ul>

                {fishboneRoutes}
            </div>
        )
    }
}

// function Fishbone({ match }) {
//     return (
//         <div>
//             <h1>Fishbone</h1>
//             <ul>
//                 <li>
//                     <Link to={`${match.url}/manual`}>Manual</Link>
//                 </li>
//                 <li>
//                     <Link to={`${match.url}/json`}>Json</Link>
//                 </li>
//             </ul>
//             <hr />
//             <Route path={`${match.path}/manual`} component={Manual} />
//             <Route path={`${match.path}/json`} component={Json} />
//         </div>
//     )
// }
// export default Fishbone
