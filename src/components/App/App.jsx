import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
// import dotSvg from '../../assets/dot_btn.svg';

/**
 * @Import Components
 */
import IntroForm from './IntroForm/IntroForm';
import Intro from './Intro/Intro';
import Home from './Home/Home';
import Chaos from './Chaos/Chaos';
import Pendule from './Pendule/Pendule';
import Song from './Song/Song';


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <img className="dot" src={dotSvg} alt="dot"/> */}
        <Song/>
        <Router>
          <Fragment>
            <Route path="/introForm" component={IntroForm}/>
            <Route path="/intro/:page" component={Intro}/>
            <Route exact path="/" component={Home}/>
            <Route path="/chaos" component={Chaos}/>
            <Route path="/pendule" component={Pendule}/>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
