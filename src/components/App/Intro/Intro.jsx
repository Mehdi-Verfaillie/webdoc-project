import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Intro.scss';
import * as THREE from 'three';
import { lerp } from 'canvas-sketch-util/math'
import random from 'canvas-sketch-util/random'
import { getContent } from '../api'
import classNames from 'classnames'

const glsl = require('glslify')

class Intro extends Component {
  
	constructor (props) {
		super(props)
		this.myRef = React.createRef()
		this.state = {
				content: [],
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

	async componentDidMount () {

		const content = await getContent('intro')
		this.setState({ content })





		this.width = window.innerWidth
		this.height = window.innerHeight

		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000)
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		this.renderer.setSize(this.width, this.height)
		this.renderer.setClearColor('black')
		this.myRef.current.appendChild(this.renderer.domElement)

		const length = 100
		
		const geometry = new THREE.BufferGeometry()
		const positions = []
		for (let i = 0; i < length; i++) {
			for (let j = 0; j < length; j++) {
				const x = lerp(-length, length, i/length)
				const z = lerp(-length, length, j/length)
				const y = random.noise4D(
					x / 4, 0, z,
					0,
					0.05, 5
				)
				positions.push( x, y, z )
			}
		}
		geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

		const vertexShader = glsl(/* glsl */`
			attribute vec3 position;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;
			uniform vec3 cameraPosition;

			void main() {
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				gl_PointSize = 150.0 / length(cameraPosition - position);
			}
		`)
		const fragmentShader = glsl(/* glsl */`
			precision highp float;

			void main () {

				vec2 coord = gl_PointCoord - vec2(0.5);
				float dist = length(coord);

				float alpha = smoothstep(0.5, 0.0, dist);

				gl_FragColor = vec4(vec3(1.0), alpha * 0.5);
			}
		`)
		const material = new THREE.RawShaderMaterial({
			vertexShader,
			fragmentShader,
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		})
		const object = new THREE.Points(geometry, material)

		this.scene.add(object)

		this.clock = new THREE.Clock()
		this.animate()
	}

	animate = () => {
		const time = this.clock.getElapsedTime()
		this.camera.position.set(
			0,
			10 + time,
			10 + time
		)
		this.camera.lookAt(0, 0, 0)
		this.renderer.render(this.scene, this.camera)
		requestAnimationFrame(this.animate)
	}

	render () {
		const { match: { params: { page } }, history } = this.props
		const { content } = this.state

		const index = parseInt(page) - 1
		
		return (
			<div className="intro-main" onClick={() => history.push(`/intro/${index+2}`)}>
					<div className='intro-three' ref={this.myRef} />
					<div className={classNames('intro-main-container', { 'last': page === '4' })}>
							<p className="intro-main-container-text">{content[index]}</p>
					</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        count: state.count,
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

export default connect(mapStateToProps, mapDispatchToProps)(Intro);