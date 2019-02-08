import React, { Component } from 'react';
import './Pendule.scss';
import gearwheel from '../../../assets/gearWheel.png';
import pendulumGif from '../../../assets/video-pendulum.mp4'
import { connect } from 'react-redux'

class Pendule extends Component {

    componentDidMount () {
        const { set_chanceCompleted } = this.props
        set_chanceCompleted()
    }

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

const mapDispatchToProps = (dispatch) => ({
    set_chanceCompleted: () => dispatch({ type: 'SET_CHANCE_COMPLETED', value: true })
})

export default connect(null, mapDispatchToProps)(Pendule)
