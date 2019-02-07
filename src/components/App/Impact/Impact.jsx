import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getContent } from '../api'
import '../Chaos/Chaos.scss'
import './Impact.scss'
import Waves from '../scripts/Waves'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
    const { match: { params: { page = 1 } } } = this.props
    const { content } = this.state

    const index = parseInt(page) - 1
    const nextPage = parseInt(page) + 1
    
    const isPageOne = index === 0

    
    if (content[index] === '') {
      return (
          <div className="chaos-main">
              <div className="main-thd-container">
                  <div className="main-video-container">
                      <video src={isPageOne ? videoSrc : video2src} controls>
                          Votre navigateur ne gère pas l'élément <code>video</code>.
                      </video>
                  </div>
                  {isPageOne ? (
              <Link to={`/impact/${nextPage}`} > <button className="button chaos-btn">CONTINUE</button></Link>
                  ) : (
                    <Link
                        to='/'
                        onClick={this.setImpactCompleted}
                > <button className="button chaos-btn">BACK TO HOME</button>
                    </Link>
                  )}
              </div>
          </div>
      )
    }
    return (
      <div className="intro-main">
        <Waves className='intro-three' />
        <div className="intro-main-container">
          <p className="intro-main-container-text typewriter">{content[index]}</p>
        </div>
	    </div>
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