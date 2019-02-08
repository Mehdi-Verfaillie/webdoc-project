import React, { Component } from 'react'
import Waves from '../scripts/Waves'
import { withRouter } from 'react-router-dom'
import '../../../variables.scss'

class TypewriterLayout extends Component {

  state = {
    count: 0
  }

  componentDidMount () {
    this.intervalId = window.setInterval(this.updateCount, 100)
  }

  componentDidUpdate ({ location }) {
    if (location !== this.props.location) {
      this.setState({ count: 0 })
    }
  }

  updateCount = () => {
    this.setState(({ count }) => ({
      count: count + 1
    }))
  }

  componentWillUnmount () {
    window.clearInterval(this.intervalId)
  }

  render () {
    const { children = '', skip } = this.props
    const { count } = this.state
    return (
      <div className="intro-main">
        <Waves className='intro-three' />
        <div className='intro-main-container last'>
          <p className="intro-main-container-text typewriter">
            {children.slice(0, count)}
          </p>
        </div>
        <button className="skip-btn" onClick={skip}>Skip</button>
      </div>
    )
  }
}

export default withRouter(TypewriterLayout)