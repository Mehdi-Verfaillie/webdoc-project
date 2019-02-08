import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import dotSvg from '../../assets/dot_btn.svg'
import BgSound from '../../assets/audio/audio_cut.mp3'
import { Link } from 'react-router-dom'
import homeIcon from '../../assets/home_btn.svg'

/**
 * @Import Components
 */
import IntroForm from './IntroForm/IntroForm';
import Intro from './Intro/Intro';
import Home from './Home/Home';
import Chaos from './Chaos/Chaos';
import Pendule from './Pendule/Pendule';
import Conclusion from './Conclusion/Conclusion';
import Song from './Song/Song';
import Impact from './Impact/Impact';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { play : false};
        this.sound = BgSound;
        this.audio = new Audio(this.sound);
        this.togglePlay = this.togglePlay.bind(this);

    }

    togglePlay(){
        this.setState({play: !this.state.play});
        console.log(this.audio);
        this.state.play ? this.audio.play() : this.audio.pause();
    }

    render() {
    return (
      <div className="App">

        <Song/>
          <img className="dot" src={dotSvg} alt="dot" onClick={this.togglePlay}/>
        <Router>
          <Fragment>
            <Link to="/"> <button className="back-home hover-underline-animation ">
              <img className="home-icon" src={homeIcon} />
              <span className="home-icon-text">Home</span>
              </button></Link>
            <Route path="/introForm" component={IntroForm}/>
            <Route path="/intro/:page?" component={Intro}/>
            <Route exact path="/" component={Home}/>
            <Route path="/chaos/:page?" component={Chaos}/>
            <Route path="/pendule" component={Pendule}/>
            <Route path="/conclusion/:page?" component={Conclusion} />
            <Route path="/impact/:page?" component={Impact} />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
