import React from 'react'
import * as THREE from 'three'
import ThreeContainer from '../ThreeContainer'
import { lerp } from 'canvas-sketch-util/math'
import random from 'canvas-sketch-util/random'
const glsl = require('glslify')

const Waves = ({ className }) => (
  <ThreeContainer
    init={init}
    animate={animate}
    className={className}
  />
)

function init () {

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
}

function animate () {
  const time = this.clock.getElapsedTime()
  this.camera.position.set(
    0,
    10 + time,
    10 + time
  )
  this.camera.lookAt(0, 0, 0)
  this.renderer.render(this.scene, this.camera)
  this.frameId = requestAnimationFrame(this.animate)
}

export default Waves