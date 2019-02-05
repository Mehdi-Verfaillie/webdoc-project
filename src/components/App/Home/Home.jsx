import React, { Component } from 'react';
import * as THREE from 'three';
import './Home.scss';
import { withRouter } from 'react-router-dom'
import { lerp } from 'canvas-sketch-util/math'
import fontJson from '../../../assets/vt323.json'
const glsl = require('glslify')


const { cos, sin, PI } = Math

function getPosition(i, offset = [0, 0, 0]) {
	const o = 2 / (3 - cos(2 * i)) * 10
	return [
		o * cos(i)  + offset[0],
		o * sin(2 * i) / 2 + offset[1],
		0 + offset[2]
	]
}

class Home extends Component {

	componentDidMount() {
		this.width = this.mount.clientWidth
		this.height = this.mount.clientHeight

		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000)
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		this.renderer.setSize(this.width, this.height)
		this.renderer.setClearColor(0x000000, 0)
		this.mount.appendChild(this.renderer.domElement)

		const positions = []
		for (let i = 0; i < 2 * PI; i += PI / 36) {
			positions.push(...getPosition(i))
		}
		const geometry = new THREE.BufferGeometry()
		geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
		const material = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.5 })

		this.loops = [...Array(6)].map(() => (
			new THREE.Line(geometry, material)
		))
		this.loops.forEach((loop, i) => {
			loop.position.set(0, -i*0.1, -i*0.2)
			this.scene.add(loop)
		})




		const vertexShader = glsl(/* glsl */`
			attribute vec3 position;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;
			uniform vec3 cameraPosition;
			uniform vec3 color;

			varying vec3 vColor;
		  
		  void main() {
				vColor = color;
		    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		    gl_PointSize = 30.0;
		  }
		`)
		const fragmentShader = glsl(/* glsl */`
		  precision highp float;

			varying vec3 vColor;

		  void main () {

		    vec2 coord = gl_PointCoord - vec2(0.5);
		    float dist = length(coord);

		    float alpha = smoothstep(0.5, 0.4, dist);

		    gl_FragColor = vec4(vColor, alpha);
		  }
		`)

		const sphereGeometry = new THREE.BufferGeometry()
		sphereGeometry.addAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3))
		const sphereMaterial = new THREE.RawShaderMaterial({
			vertexShader,
			fragmentShader,
			transparent: true
		})
		
		const font = new THREE.Font(fontJson)
		this.spheres = [
			{ text: '', 				initialColor: [1.0, 1.0, 1.0] 		 , offset: PI / 2	},
			{ text: 'chaos?', 	initialColor: [0.964, 0.345, 0.345], offset: 2 	},
			{ text: 'impact?', 	initialColor: [0.964, 0.345, 0.345], offset: 4 	},
			{ text: 'chance?', 	initialColor: [0.964, 0.345, 0.345], offset: 6 	},
		].map(({ text, initialColor, offset }) => {
			const material = sphereMaterial.clone()
			material.uniforms = { color: { value: initialColor } }
			return {
				sphere: new THREE.Points(sphereGeometry, material),
				text: new THREE.Mesh(new THREE.TextGeometry(text, { font, size: 1, height: 0 }), new THREE.MeshBasicMaterial()),
				link: '/chaos',
				initialColor,
				offset
			}
		})
		this.spheres.forEach(({ sphere, text, offset }, i) => {
			// sphere.position.set(...(!i ? [0, 0, 0.2] : getPosition(i, [0, 0, 0.2])))
			
			// text.position.set(...(!i ? [1.5, -0.5, 0.2] : getPosition(i, [1.5, -0.5, 0.2])))
			sphere.position.set(
				...getPosition(offset, [0, 0, 0.2])
			)
			text.position.set(
				...getPosition(offset, [1.5, -0.5, 0.2])
			)
			this.scene.add(sphere)
			this.scene.add(text)
		})



		this.camera.position.z = 10
		// this.camera.position.set(-10, -10, 20)
		this.camera.lookAt(0, 0, 0)
		this.offset = { x: 0, y: 0 }

		this.count = 0
		this.raycaster = new THREE.Raycaster()
		this.mouse = new THREE.Vector2(1000, 1000)

		window.addEventListener('mousemove', this.onMouseMove, false)
		window.addEventListener('click', this.onMouseClick)

		if (!this.frameId) {
			this.frameId = requestAnimationFrame(this.animate)
		}
	}
	animate = () => {

		this.spheres.forEach(({ sphere, text, offset }, i) => {
			if (!i) return
			sphere.position.set(
				...getPosition(this.count*0.005 + offset, [0, 0, 0.2])
			)
			text.position.set(
				...getPosition(this.count*0.005 + offset, [-2, -2, 0.2])
			)
		})

		// this.sphere.position.set(
		// 	...getPosition(this.count * 0.01)
		// )
		this.count += 1

		this.camera.position.x = this.offset.x
		this.camera.position.y = this.offset.y
		this.camera.lookAt(0, 0, 0)
		


		this.raycaster.setFromCamera(this.mouse, this.camera)
		const intersects = this.raycaster.intersectObjects(this.scene.children)
		
		// this.spheres.forEach(sphere => sphere.material.color.set('white'))
		document.body.style.cursor = ''

		this.spheres.forEach(({ sphere, initialColor }) => sphere.material.uniforms.color.value = initialColor)
		// console.log(intersects)
		const filteredIntersects = intersects.filter(intersect => intersect.object.material.type === 'RawShaderMaterial')
		
		
		if (filteredIntersects.length) {
			document.body.style.cursor = 'pointer'
			for (var i = 0; i < filteredIntersects.length; i++) {
				// filteredIntersects[i].object.material.color.set('yellow');
				filteredIntersects[i].object.material.uniforms.color.value = [0, 0, 0]
			}
		}
		this.renderer.render(this.scene, this.camera)
		this.frameId = window.requestAnimationFrame(this.animate)
	}
	onMouseMove = e => {
		this.mouse.x = ( ( e.clientX - this.renderer.domElement.offsetLeft ) / this.renderer.domElement.clientWidth ) * 2 - 1;
		this.mouse.y = - ( ( e.clientY - this.renderer.domElement.offsetTop ) / this.renderer.domElement.clientHeight ) * 2 + 1;

		this.offset.x = lerp(-2, 2, e.clientX / window.innerWidth)
		this.offset.y = lerp(2, -2, e.clientY / window.innerHeight)
	}
	onMouseClick = e => {
		var intersects = this.raycaster.intersectObjects(this.scene.children);
		const filteredIntersects = intersects.filter(intersect => intersect.object.material.type === 'RawShaderMaterial')
		if (filteredIntersects.length) {
			console.log('chouette')
			this.props.history.push('/chaos')
		}
	}
	componentWillUnmount() {
		cancelAnimationFrame(this.frameId)
		window.removeEventListener('mousemove', this.onMouseMove)
		window.removeEventListener('click', this.onMouseClick)
		this.mount.removeChild(this.renderer.domElement)
	}



	render() {
		return (
			<div className="main-container">
				<div
					className="main-three"
					
				/>
				<h1 className="main-title">ENIGMA OF <span className="main-title-red">WORD CHOSEN</span></h1>
				<div className="main-butterfly" ref={mount => { this.mount = mount }}></div>
				<div className="main-text">You must learn other paths to understand this one.</div>
			</div>
		);
	}
}

export default withRouter(Home)