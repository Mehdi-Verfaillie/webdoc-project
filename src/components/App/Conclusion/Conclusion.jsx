import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './Conclusion.scss';
import '../Intro/Intro.scss';
import earthVideo from '../../../assets/Earth_animation.mp4';
import {getContent} from '../api';
import classNames from 'classnames'
import Waves from '../scripts/Waves'

/**
 * @Import vidéos :p
 */

 import video3src from '../../../assets/video - designer.mp4'

class Conclusion extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: []
        }
    }
    async componentDidMount () {
        const content = await getContent('conclusion')
        this.setState({ content })
    }
        
    getAnswer = () => {
        let answer = document.querySelector('.input').value;
        this.props.set_conclusionCompleted(answer);
        /** 
         * Set default answer as 'Chaos' @String if empty
         * */

        if (answer === '') {
            this.props.set_conclusionCompleted('CHAOS');
        }
    }
    render() {

        const { match: { params: { page = '1' } }, history } = this.props
        const { content } = this.state

        const index = parseInt(page || 1) - 1
        const nextPage = parseInt(page) + 1

        switch (page) {
            case '1':
                return(
                    <div id="conclusion-content" onClick={() => history.push(`./${index + 2}`)}>
                        <section className={classNames('globe-section', { 'intro-three': page >= '3' })} ref={this.myRef}>
                            <div className={classNames('video-content', { 'hidden': page >= '2'})}>
                                <video height="300" width="600" loop autoPlay>
                                    <source src={earthVideo}></source>
                                </video>
                            </div>
                            <div><span className={classNames({ 'last': page >= '2' })}>{content[index]}</span></div>
                         </section>
                    </div>
                )
            case '2':
                    return(
                        <div id="conclusion-content" onClick={() => history.push(`./${index + 2}`)}>
                            <section className="video-designer-section">
                                <div className="main-thd-container">
                                    <div className="main-video-container">
                                            <video height="300" width="600" src={video3src} controls>
                                            Votre navigateur ne gère pas l'élément <code>video</code>.
                                        </video>
                                    </div>
                                    {/* <button className="button chaos-btn">CONTINUE</button> */}
                                    <Link to={`/conclusion/${nextPage}`} className="button chaos-btn">CONTINUE</Link>
                                </div>
                            </section>
                        </div>
                    )
            case '3':
                    return(
                        <Fragment>
                            <Waves className='intro-three' />
                            <div id="conclusion-content" onClick={() => history.push(`./${index + 2}`)}>
                                <section>
                                    <span>{content[index]}</span>
                                </section>
                            </div>
                        </Fragment>

                    )
            case '4':
                    return(
                        <Fragment>
                            <Waves className='intro-three' />
                            <div id="conclusion-content" onClick={() => history.push(`./${index + 2}`)}>
                                <section>
                                    <span>{content[index]}</span>
                                </section>
                            </div>
                        </Fragment>
                    )
            case '5':
                    return(
                        <Fragment>
                            <Waves className='intro-three' />
                            <div id="conclusion-content">
                                <section>
                                    <span>{content[index]}</span>
                                    <Link to={`/conclusion/${nextPage}`} className="button chaos-btn">END</Link>
                                </section>
                            </div>
                        </Fragment>
                    )
            case '6':
                    return(
                        <Fragment>
                            <Waves className='intro-three' />
                            <div id="conclusion-content">
                                <section className="">
                                <span className="C letter">C</span>
                                <span className="H letter">H</span>
                                <span className="A letter">A</span>
                                <span className="O letter">O</span>
                                <span className="S letter">S</span>
                                <div className="input-content">
                                    <div className="typewriter">
                                        <h1>What does the chaos theory means for you <span>now</span>?</h1>
                                    </div>
                                    <Link to='/'
                                        className="button"
                                    >SAME AS BEFORE</Link>
                                    <Link to={`/conclusion/${nextPage}`} className="button">DIFFERENT</Link>
                                </div>
                                </section>
                            </div>
                        </Fragment>
                    )
                case '7':
                    return(
                        <div id="conclusion-content">
                            <section className="">
                            <span className="C letter">C</span>
                            <span className="H letter">H</span>
                            <span className="A letter">A</span>
                            <span className="O letter">O</span>
                            <span className="S letter">S</span>
                            <div>
                                <div className="input-content">
                                    <div className="typewriter">
                                        <h1>What does the chaos theory means for you  <span>now</span>?</h1>
                                    </div>
                                    <input onBlur={() => { this.getAnswer(); }} className='input' type='text' placeholder="CHAOS" maxLength="15" />
                                    <Link 
                                        to='/'
                                        className="button"
                                    >OK</Link>
                                </div>
                            </div>
                            </section>
                        </div>

                    )
            default:
                return ""
        }
    }
}

const mapStateToProps = (state) => {
    return {
        answer: state.answer,
    }
}

const mapDispatchToProps = (dispatch) => ({
    set_conclusionCompleted: (answer) => dispatch({ type: 'SET_CONCLUSION_COMPLETED', value: answer })
})

export default connect(mapStateToProps, mapDispatchToProps)(Conclusion);