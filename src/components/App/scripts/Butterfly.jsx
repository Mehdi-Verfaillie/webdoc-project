import React from 'react'
import * as THREE from 'three';
import ThreeContainer from '../ThreeContainer'
import { lerp } from 'canvas-sketch-util/math';
const glsl = require('glslify')
const { cos, sin, PI } = Math


const Butterfly = ({ className, impactCompleted, chaosCompleted, chanceCompleted }) => {
  return (
    <ThreeContainer
      init={init}
      animate={animate}
      onMouseMove={onMouseMove}
      onMouseClick={onMouseClick}
      className={className}
      impactCompleted={impactCompleted}
      chaosCompleted={chaosCompleted}
      chanceCompleted={chanceCompleted}
    />
  )
}

function getPosition(i, offset = [0, 0, 0]) {
	const o = 2 / (3 - cos(2 * i)) * 10
	return [
		(o * cos(i)  + offset[0]) * 1,
		(o * sin(2 * i) / 2 + offset[1]) * 1.5,
		0 + offset[2]
	]
}

function dot (text, isCenter, hover) {
  const size = 1000
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // ctx.fillRect(0, 0, size, size)

  ctx.fillStyle = "white";
  ctx.font = "bold 80px VT323";
  ctx.fillText(text, size/2 - 100, size * 0.75 );
  
  // ctx.globalAlpha = isCenter ? 0.1 : 1
  // ctx.beginPath()
  // ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2)
  // ctx.fillStyle = hover ? 'yellow' : isCenter ? 'white' : '#F65858'
  // ctx.fill()
  
  const canvasTexture = new THREE.CanvasTexture(canvas)
  canvasTexture.flipX = false
  canvasTexture.flipY = false

  return canvasTexture
}

function init () {
  const positions = []
  for (let i = 0; i < 2 * PI; i += PI / 36) {
    positions.push(...getPosition(i))
  }



  this.loopVertexShader = glsl(/* glsl */`
    attribute vec3 position;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform vec3 cameraPosition;
    uniform float time;


    #pragma glslify: noise = require('glsl-noise/simplex/4d');


    void main() {

      float ny = noise(vec4(
          vec3(
            position.x,
            position.y,
            position.z * 10.0
          ) * 0.02,
          time * 0.1
      )) * 1.0;
      float nz = noise(vec4(
          vec3(
            position.x,
            position.y,
            position.z * 20.0
          ) * 0.1,
          time * 0.2
      )) * 1.0;

      vec3 newPosition = vec3(
        position.x,
        position.y + ny,
        position.z + nz
      );


      gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
      gl_PointSize = 300.0;
    }
  `)

  this.loopFragmentShader = glsl(/* glsl */`
    precision highp float;


    void main () {


        gl_FragColor = vec4(vec3(1.0), 0.1);
    }
  `)

  
  // const material = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.5 })
  this.loopMaterial = new THREE.RawShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: this.loopVertexShader,
    fragmentShader: this.loopFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })

  const length = 40
  this.loops = [...Array(length)].map((_, a) => {
    const loopPositions = [...positions]
    for (let i = 0; i < loopPositions.length; i += 3) {
      // // loopPositions[i] *= (1 + length/2 * 0.01) - (abs(a - length/2)*0.01)
      loopPositions[i + 1] -= a*0.02
      loopPositions[i + 2] += -a*0.02
    }
    const loopGeometry = new THREE.BufferGeometry()
    loopGeometry.addAttribute('position', new THREE.Float32BufferAttribute(loopPositions, 3));

    return new THREE.Line(loopGeometry, this.loopMaterial)
  })
  this.loops.forEach((loop, i) => {
    // loop.position.set(0, -i*0.1, -i*0.2)
    this.scene.add(loop)
  })


  const fragmentShader = glsl(/* glsl */`
    precision highp float;
    
    uniform vec3 color;
    uniform sampler2D texture;
    uniform float alpha;
    uniform float size;

    void main () {

        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);

        float circleAlpha1 = smoothstep(0.15 * size, 0.0, dist);
        float circleAlpha2 = smoothstep(0.09 * size, 0.08, dist);

        if (gl_PointCoord.y < 0.7) {
          gl_FragColor = vec4(color, ((circleAlpha1 + circleAlpha2) / 2.0) * alpha);
        } else {
          gl_FragColor = texture2D(texture, gl_PointCoord);
        }
    }
  `)


  this.sphereMaterial = new THREE.RawShaderMaterial({
    uniforms: {
      time: { value: 0 },
      texture: { value: null },
      color: { value: [] },
      alpha: { value: 1 },
      size: { value: 1 },
    },
    vertexShader: this.loopVertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })

  this.spheres = [
    { text: '', 				  link: '/conclusion' , initialColor: [1.0, 1.0, 1.0] 		 , size: 1.5,  initialAlpha: 0.4, offset: PI / 2	},
    { text: 'chaos ?', 	  link: '/chaos' , initialColor: [0.964, 0.345, 0.345], size: 1,    initialAlpha: 0.6, offset: 2 	    },
    { text: 'impact ?', 	link: '/impact' , initialColor: [0.964, 0.345, 0.345], size: 1,    initialAlpha: 0.6, offset: 4	    },
    { text: 'chance ?', 	link: '/chance' , initialColor: [0.964, 0.345, 0.345], size: 1,    initialAlpha: 0.6, offset: 6 	    },
  ].map(({ text, initialColor, offset, size, initialAlpha, link }, i) => {

    const positions = [...getPosition(offset)]


    const sphereGeometry = new THREE.BufferGeometry()
    sphereGeometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

    const material = this.sphereMaterial.clone()
    material.uniforms.texture.value = dot(text, !i)
    material.uniforms.color.value = initialColor
    material.uniforms.size.value = size
    return {
      sphere: new THREE.Points(sphereGeometry, material),
      // text: new THREE.Mesh(new THREE.TextGeometry(text, { font, size: 1, height: 0 }), new THREE.MeshBasicMaterial()),
      link,
      initialColor,
      offset,
      initialAlpha
    }
  })
  this.container = new THREE.Object3D()
  this.spheres.forEach(({ sphere, text, offset, link }, i) => {
    // sphere.position.set(...(!i ? [0, 0, 0.2] : getPosition(i, [0, 0, 0.2])))

    // text.position.set(...(!i ? [1.5, -0.5, 0.2] : getPosition(i, [1.5, -0.5, 0.2])))
    // sphere.position.set(
    //   ...getPosition(offset, [0, 0, 0.2])
    // )
    // text.position.set(
    //   ...getPosition(offset, [1.5, -0.5, 0.2])
    // )
    sphere.link = link
    this.container.add(sphere)
    // this.container.add(text)
  })
  this.scene.add(this.container)



  // this.camera.position.z = 10
  // this.camera.position.set(-5, -5, 10)
  this.camera.initialPosition = { x: 0, y: 5, z: 10 }

  this.camera.lookAt(0, 0, 0)
  this.offset = { x: 0, y: 0, z: 0 }

  this.count = 0
  this.raycaster = new THREE.Raycaster()
  this.mouse = new THREE.Vector2(1000, 1000)
}

function animate () {
  const { impactCompleted, chaosCompleted, chanceCompleted } = this.props

  // this.spheres.forEach(({ sphere, text, offset }, i) => {
  // 	if (!i) return
  // 	sphere.position.set(
  // 		...getPosition(this.count*0.005 + offset, [0, 0, 0.2])
  // 	)
  // 	text.position.set(
  // 		...getPosition(this.count*0.005 + offset, [-2, -2, 0.2])
  // 	)
  // })
  this.loopMaterial.uniforms.time.value = this.clock.getElapsedTime()
  // this.sphereMaterial.uniforms.time.value = this.clock.getElapsedTime()
  this.spheres.forEach(({ sphere }) => sphere.material.uniforms.time.value = this.clock.getElapsedTime())


  // this.sphere.position.set(
  // 	...getPosition(this.count * 0.01)
  // )
  this.count += 1

  this.camera.position.x = this.camera.initialPosition.x + this.offset.x
  this.camera.position.y = this.camera.initialPosition.y + this.offset.y
  this.camera.position.z = this.camera.initialPosition.z + this.offset.z
  this.camera.lookAt(0, 0, 0)
  


  this.raycaster.setFromCamera(this.mouse, this.camera)
  const intersects = this.raycaster.intersectObjects(this.container.children)
  
  // this.spheres.forEach(sphere => sphere.material.color.set('white'))
  document.body.style.cursor = ''


  const alphaActive = [
    impactCompleted && chaosCompleted && chanceCompleted,
    chaosCompleted,
    impactCompleted,
    chanceCompleted
  ]

  this.spheres.forEach(({ sphere, initialAlpha }, i) => 
    sphere.material.uniforms.alpha.value = alphaActive[i] ? 1.5 : initialAlpha
  )
  // console.log(intersects)
  const filteredIntersects = intersects.filter(intersect => intersect.object.material.type === 'RawShaderMaterial')
  
  
  if (filteredIntersects.length) {
    document.body.style.cursor = 'pointer'
    for (var i = 0; i < filteredIntersects.length; i++) {
      // filteredIntersects[i].object.material.color.set('yellow');
      filteredIntersects[i].object.material.uniforms.alpha.value = 1
      // filteredIntersects[i].object.material.size = 15
      // filteredIntersects[i].object.material.uniforms.texture.value = dot('hi', false, true)

    }
  }
  this.renderer.render(this.scene, this.camera)
  this.frameId = window.requestAnimationFrame(this.animate)
}
function onMouseMove (e) {
  this.mouse.x = ( ( e.clientX - this.renderer.domElement.offsetLeft ) / this.renderer.domElement.clientWidth ) * 2 - 1;
  this.mouse.y = - ( ( e.clientY - this.renderer.domElement.offsetTop ) / this.renderer.domElement.clientHeight ) * 2 + 1;

  this.offset.x = lerp(-2, 2, e.clientX / window.innerWidth)
  this.offset.y = lerp(2, -2, e.clientY / window.innerHeight)
}
function onMouseClick (e) {
  var intersects = this.raycaster.intersectObjects(this.container.children);
  const filteredIntersects = intersects.filter(intersect => intersect.object.type !== 'Line')
  if (filteredIntersects.length) {
    console.log('chouette')
    console.log(filteredIntersects)
    this.props.history.push(filteredIntersects[0].object.link)
  }
}



export default Butterfly