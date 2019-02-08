import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Chaos.scss';
import './bulles.css';
import Bubbles from '../scripts/Bubbles'
import VideoLayout from '../layout/VideoLayout'
import Waves from '../scripts/Waves'


/**
 * @Import vidéo :p < je bave
 */

import video3src from '../../../assets/video - designer.mp4'

class Chaos extends Component {

    render() {
        const { match: { params: { page = '1' } }, set_chaosCompleted } = this.props

        switch (page) {
            case '1':
                return(
                    <div className="chaos-main" style={{background: '$black'}}>
                        <div id="content">
                            <Bubbles />
                        </div>
                        <div className="chaos-main-container">
                            <span className="chaos-back-text">SPACE</span>
                            <span className="chaos-back-text">SPEED</span>
                            <span className="chaos-back-text">CHANCE</span>
                            <span className="chaos-back-text">MATTER</span>
                        </div>
                    </div>
                )
            case '2':
                return (
                    <Fragment>
                        <Waves className='intro-three' />
                        <div className="chaos-main">
                            <div className="chaos-snd-container">
                                <div className="chaos-snd-text">CHAOS</div>
                            </div>
                        </div>
                    </Fragment>
                )
            case '3':
                return (
                    <Fragment>
                        <Waves className='intro-three' />
                        <VideoLayout
                            videoSrc={video3src}
                            button={
                            <Link
                                to='/'
                                onClick={set_chaosCompleted}                                                                                                                                                                                
                                className="button chaos-btn"
                            >
                                back to home
                            </Link>
                        }
                    />
                    </Fragment>
                )                            
            default:
                return ""
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    set_chaosCompleted: () => dispatch({ type: 'SET_CHAOS_COMPLETED', value: true })
})

export default connect(null, mapDispatchToProps)(Chaos)