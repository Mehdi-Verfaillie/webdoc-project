import React, { Component } from 'react';
import './Chaos.scss';
import './bulles.css';
import Bubbles from '../scripts/Bubbles'

class Chaos extends Component {

    render() {
        return(
            <div className="chaos-main">
                <div id="content">
                    <Bubbles />
                </div>
                <div className="chaos-main-container">

                    <span className="chaos-back-text">SPACE</span>
                    <span className="chaos-back-text">SPEED</span>
                    <span className="chaos-back-text">CHANCE</span>
                    <span className="chaos-back-text">MATTER</span>
                </div>

                <div className="chaos-snd-container">
                    <div className="chaos-snd-text">CHAOS</div>
                </div>

                <div className="main-thd-container">
                    <div className="main-video-container">
                        <video src="" controls>
                            Votre navigateur ne gère pas l'élément <code>video</code>.
                        </video>
                    </div>
                    <button className="button chaos-btn">NEXT PATH</button>
                </div>
            </div>
        );
    }
}

export default Chaos;