import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import dotSvg from '../../assets/dot_btn.svg'

/**
 * @Import Components
 */
import IntroForm from './IntroForm/IntroForm';
import Intro from './Intro/Intro';
import Home from './Home/Home';
import Chaos from './Chaos/Chaos';
import Pendule from './Pendule/Pendule';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img className="dot" src={dotSvg} alt="dot"/>
        <Router>
          <Fragment>
            <Route exact path="/introForm" component={IntroForm}/>
            <Route exact path="/intro" component={Intro}/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/chaos" component={Chaos}/>
            <Route exact path="/pendule" component={Pendule}/>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
