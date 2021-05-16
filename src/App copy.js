import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route // for later
} from 'react-router-dom'
import Fishbone from './fishbone/Fishbone'
import Home from './Home'
import NavBar from './NavBar'


export default class App extends Component {
  render() {

    return (
      <div style={{ width: 1000, margin: '0 auto' }}>
        <NavBar />
        <hr />
        <Route exact path='/' component={Home} />
        <Route path='/fishbone-diagram' component={Fishbone} />
      </div>

    )
  }
}
