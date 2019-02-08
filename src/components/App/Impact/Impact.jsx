import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getContent } from '../api'
import '../Chaos/Chaos.scss'
import Waves from '../scripts/Waves'
import { connect } from 'react-redux'
import VideoLayout from '../layout/VideoLayout'
import TypewriterLayout from '../layout/TypewriterLayout'
/**
 * @Import vidéos :p
 */

 import videoSrc from '../../../assets/video - chaos is everywhere.mp4'
 import video2src from '../../../assets/video - impact of chaos.mp4'

class Impact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: []
        };
    }

  async componentDidMount () {
    const content = await getContent('impact')
    this.setState({ content })
  }

  setImpactCompleted = () => {
    this.props.set_impactCompleted(true)
  }

  render () {
    const { match: { params: { page = 1 } }, history } = this.props
    const { content } = this.state

    const index = parseInt(page) - 1
    const nextPage = parseInt(page) + 1
    
    const isPageOne = index === 0

    
    if (index === 0 || index === 3) {
        {/* <div className="chaos-main">
              <div className="main-thd-container">
                  <div className="main-video-container">
                      <video src={isPageOne ? videoSrc : video2src} controls>
                          Votre navigateur ne gère pas l'élément <code>video</code>.
                      </video>
                  </div>
                  {isPageOne ? (
                    <Link to={`/impact/${nextPage}`} className="button chaos-btn">Continue</Link>
                  ) : (
                    <Link
                        to='/'
                        className="button chaos-btn"
                        onClick={this.setImpactCompleted}
                    >
                        Back to home
                    </Link>
                  )}
              </div>
          </div> */}
      return (
        <VideoLayout
            videoSrc={isPageOne ? videoSrc : video2src}
            button={isPageOne ? (
                <Link to={`/impact/${nextPage}`} className="button chaos-btn">Continue</Link>
                ) : (
                <Link to='/' onClick={this.setImpactCompleted} className="button chaos-btn">
                    Back to home
                </Link>
            )}
        />
      )
    }
      {/* <div className="intro-main">
        <Waves className='intro-three' />
        <div className="intro-main-container">
          <p className="intro-main-container-text typewriter">{content[index]}</p>
        </div>
    </div> */}
    return (
        <TypewriterLayout skip={() => history.replace(`/impact/${nextPage}`)} >
            {content[index]}
        </TypewriterLayout>
    )        

  }
}

const mapStateToProps = (state) => {
    return {
        impactCompleted: state.impactCompleted,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_impactCompleted: (impactCompleted) => { dispatch({type: 'SET_IMPACT_COMPLETED', value: impactCompleted}) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Impact);