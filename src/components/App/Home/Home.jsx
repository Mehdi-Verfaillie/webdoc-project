import React, { Component } from 'react';
import './Home.scss';

class Home extends Component {
    render() {
        return(
            <div className="main-container">
                <h1 className="main-title">ENIGMA OF <span className="main-title-red">WORD CHOSEN</span></h1>
                <div className="main-butterfly"></div>
                <div className="main-text">You must learn other paths to understand this one.</div>
            </div>
        );
    }
}

export default Home;