import React, { Component } from 'react'
import * as THREE from 'three';
import { withRouter } from 'react-router-dom';


class ThreeContainer extends Component {

  constructor (props) {
    super(props)
    this.ref = React.createRef()

    const { init, animate, onMouseMove, onMouseClick } = this.props

    this.init = init.bind(this)
    this.animate = animate.bind(this)
    if (onMouseMove) this.onMouseMove = onMouseMove.bind(this)
    if (onMouseClick) this.onMouseClick = onMouseClick.bind(this)
  }

  componentDidMount () {
    
    this.width = this.ref.current.clientWidth
    this.height = this.ref.current.clientHeight

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor('black', 0)
    this.ref.current.appendChild(this.renderer.domElement)
    this.clock = new THREE.Clock()

    
    this.init()
    this.animate()

    if (this.onMouseMove) window.addEventListener('mousemove', this.onMouseMove)
    if (this.onMouseClick) window.addEventListener('click', this.onMouseClick)
  }


  componentWillUnmount () {
    window.cancelAnimationFrame(this.frameId)
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('click', this.onMouseClick)
  }

  render () {
    const { className } = this.props
    return (
      <div ref={this.ref} className={className} />
    )
  }
}

export default withRouter(ThreeContainer)