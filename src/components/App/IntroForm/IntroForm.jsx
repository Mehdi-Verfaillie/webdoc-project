import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './IntroForm.scss';


class IntroForm extends Component {

    getAnswer = () => {
        let answer = document.querySelector('.input').value;
        this.props.get_answer(answer);
        /** 
         * Set default answer as 'Chaos' @String if empty
         * */
        
        if (answer === '') {
            this.props.get_answer('Chaos');
        }
    }
    render() {
        return(
        <div>
            <span className="C letter">C</span>
            <span className="H letter">H</span>
            <span className="A letter">A</span>
            <span className="O letter">O</span>
            <span className="S letter">S</span>
            <div>
                <div className="input-content">
                    <div className="typewriter">
                    <h1>What does the chaos theory means for you?</h1>
                    </div>
                    <input onBlur={() => {this.getAnswer();}} className='input' type='text' placeholder="Chaos" maxLength="15"/>
                    <Link className="link-intro" to='/intro/1'> <button className="button-response" type="button">OK</button></Link>
                </div>
            </div>
        </div> 
        );
    }
}
const mapStateToProps = (state) => {
    return {
        answer: state.answer,
    }
}

/**
 * Used to update the initstate values on redux
 */
const mapDispatchToProps = (dispatch) => {
    return {
        get_answer: (answer) => { dispatch({type: 'GET_ANSWER', value: answer}) },
    }
}

IntroForm.protoType = {
    answer: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroForm);