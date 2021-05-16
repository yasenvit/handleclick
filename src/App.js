import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route, Switch, useLocation
} from 'react-router-dom'
import Fishbone from './fishbone/Fishbone'
import Chart from './chart/Chart'
import Home from './components/Home'
import NoMatch from './components/NoMatch'
import Header from "./components/Header"
import FooterBar from "./components/FooterBar"
import { CssBaseline } from "@material-ui/core"

// https://ansonlowzf.com/how-to-build-a-material-ui-navbar/

export default class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/fishbone-diagram' component={Fishbone} />
        <Route path='/chart' component={Chart} />
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    )

    return (
      <div className="app">
        <CssBaseline />
        <Header />
        {routes}
        <FooterBar />
      </div>
    )
  }
}
