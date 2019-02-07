import React, { Component } from 'react';
import './Conclusion.scss';
import '../Intro/Intro.scss';
import earthVideo from '../../../assets/Earth_animation.mp4';
import {getContent} from '../api';
import classNames from 'classnames'


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
        
    
    render() {

        const { match: { params: { page } }, history } = this.props
        const { content } = this.state
        const index = parseInt(page) - 1
        return (
            <div id="conclusion-content" onClick={() => history.push(`./${index + 2}`)}>
                <section className={classNames('globe-section', { 'intro-three': page >= '3' })} ref={this.myRef}>

                    <div className={classNames('video-content', { 'hidden': page >= '2'})}>
                         <video height="300" width="600" loop autoPlay>
                             <source src={earthVideo}></source>
                         </video>
                    </div>

                    <div>
                        <span className={classNames({ 'last': page >= '2' })}>{content[index]}</span>
                    </div>
                </section>
 {/*
                <section className="video-designer-section">
                <div className="main-thd-container">
                    <div className="main-video-container">
                            <video height="300" width="600" src="" controls>
                            Votre navigateur ne gère pas l'élément <code>video</code>.
                        </video>
                    </div>
                    <button className="button chaos-btn">CONTINUE</button>
                </div>
                </section>

                <section>
                    <span>So what is the ultimate lesson we can take from all of this ? Well it’s that, all the complexity of the universe, all it’s infinite richness Emerges from mindless simple rules, repeated over and over again.
                    </span>
                </section>

                <section>
                    <span>But remember. Powerful tought this process is, it’s also inherently impredictable.
                    </span>
                </section>
                
                <section>
                    <span>So, although I can confidently tell you that the future will be amazing I can also say, with scientific certainty That I have no idea what it holds.
                     </span>
                </section>

              }  <section className="hidden">
                    <span className="C letter">C</span>
                    <span className="H letter">H</span>
                    <span className="A letter">A</span>
                    <span className="O letter">O</span>
                    <span className="S letter">S</span>
                    <div>
                        <div className="input-content">
                            <div className="typewriter">
                                <h1>What does the chaos theory means for you <span>now</span>?</h1>
                            </div>
                            <button className="button" type="button">SAME AS BEFORE</button>
                             <button className="button" type="button">DIFFERENT</button>
                        </div>
                    </div>
                </section>

                <section className="hidden">
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
                            <input onBlur={() => { this.getAnswer(); }} className='input' type='text' placeholder="Word chosen" maxLength="15" />
                            <button className="button" type="button">OK</button>
                        </div>
                    </div>
                </section> */}
                
            </div>
        );
    }
}


export default Conclusion;