import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Intro.scss';


class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curr_sentence: this.props.intro_sentence1,
        };
    }
    continue = () => {
        let count = this.props.count;
        let sentence;
        if (this.props.count <= 2) {
            count++
            switch (this.props.count) {
                case 0:
                    this.props.set_count(count);
                    sentence = this.props.intro_sentence2;
                    break;
                case 1:
                    this.props.set_count(count);
                    sentence = this.props.intro_sentence3;
                    break;
                case 2:
                    this.props.set_count(count);
                    sentence = this.props.intro_sentence4;
                    break;
                default:
                    break;
            }
            this.setState({
                curr_sentence: sentence,
            })
        }
    }
    /**
     * Todo:
        * Changer le background - img sur chaque sentence
     */
    render() {
        if (this.state.curr_sentence === this.props.intro_sentence4) {
            return(
                <div className="intro-main" onClick={this.continue}>
                    <div className="intro-main-container">
                        <p className="intro-main-container-text" style={{fontFamily:'VT323'}}>{this.state.curr_sentence}</p>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="intro-main" onClick={this.continue}>
                    <div className="intro-main-container">
                        <p className="intro-main-container-text">{this.state.curr_sentence}</p>
                    </div>
                </div>
            );
        }

    }
}

const mapStateToProps = (state) => {
    return {
        count: state.count,
        intro_sentence1: state.intro_sentence1,
        intro_sentence2: state.intro_sentence2,
        intro_sentence3: state.intro_sentence3,
        intro_sentence4: state.intro_sentence4
    }
}

/**
 * Used to update the initstate values on redux
 */
const mapDispatchToProps = (dispatch) => {
    return {
        set_count: (count) => { dispatch({type: 'SET_COUNT', value: count}) },
    }
}

Intro.propTypes = {
    curr_sentence: PropTypes.string,
    intro_sentence1: PropTypes.string,
    intro_sentence2: PropTypes.string,
    intro_sentence3: PropTypes.string,
    intro_sentence4: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Intro);