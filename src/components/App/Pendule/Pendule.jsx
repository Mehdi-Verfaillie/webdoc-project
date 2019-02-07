import React, { Component } from 'react';
import './Pendule.scss';
import gearwheel from '../../../assets/gearWheel.png';
import gif from '../../../assets/gif.gif';

class Pendule extends Component {
    render() {
        return(
            <div className="pendule-main">
                <div className="pendule-text">Here are 5 pendulums. Each one has a slightly different initial displacement.</div>
                <div className="pendule-obj">
                    <span><img className="gif" src={gif} alt="img"/></span>
                </div>
                <div className="pendule-text-spe">drag the pendulum</div>

                <div className="gearwheel-container">
                    <span className="gearwheel-img"><img src={gearwheel} alt="img"/></span>
                    <span className="gearwheel-img"><img src={gearwheel} alt="img"/></span>
                    <span className="gearwheel-img"><img src={gearwheel} alt="img"/></span>
                    <span className="gearwheel-img"><img src={gearwheel} alt="img"/></span>
                    <span className="gearwheel-img"><img src={gearwheel} alt="img"/></span>
                    <span className="gearwheel-img"><img src={gearwheel} alt="img"/></span>
                </div>
                
            </div>
        );
    }
}

export default Pendule;