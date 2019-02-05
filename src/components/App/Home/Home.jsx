import React, { Component } from 'react';
import './Home.scss';

class Home extends Component {
    render() {
        return(
            <div className="home-main-container">
                <h1 className="home-main-title">ENIGMA OF <span className="home-main-title-red">WORD CHOSEN</span></h1>
                <div className="home-main-butterfly"></div>
                <div className="home-main-text">You must learn other paths to understand this one.</div>
            </div>
        );
    }
}

export default Home;