import React, { Component } from 'react';
import './Pendule.scss';
import gearwheel from '../../../assets/gearWheel.png';
import pendulumGif from '../../../assets/video-pendulum.mp4'

class Pendule extends Component {
    render() {
        return(
            <div className="pendule-main">
                <div className="pendule-text">Here you will see the accumulation of a few pendulums, placed at slightly different position.</div>
                <div className="pendule-obj">
                    <div className="videoContainer">
                    <video loop="loop"  autoPlay="autoPlay">
                        <source  src={pendulumGif} type="video/mp4" />
                    </video>
                    </div>
                </div>

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