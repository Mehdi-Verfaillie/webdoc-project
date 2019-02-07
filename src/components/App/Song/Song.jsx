import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import dotSvg from '../../../assets/dot_btn.svg';

/** 
 * @Import audio  
 */
import audioIntro from '../../../assets/audio/audioIntro.mp3';


class Song extends Component {

    // audioLoading = () => {
    //     let audio = document.getElementById('audio');
    //     let audioLength = Math.floor(audio.duration)
    // }
    
	render () {
	    return(
            <Fragment>
                <audio id="audio" controls="controls" autoPlay={true}>
                    <source src={audioIntro} type="audio/mp3" />
                </audio>
                <img className="dot" src={dotSvg} alt="dot" on={this.audioLoading}/>
            </Fragment>
		);
	}
}

const mapStateToProps = (state) => {
    return {

    }
}

/**
 * Used to update the initstate values on redux
 */
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);