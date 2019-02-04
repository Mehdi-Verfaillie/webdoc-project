import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import IntroForm from './IntroForm/IntroForm';
import Intro from './Intro/Intro';
import Home from './Home/Home';
import Chaos from './Chaos/Chaos';
import './App.scss';
import dotSvg from '../../assets/dot_btn.svg'


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
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
