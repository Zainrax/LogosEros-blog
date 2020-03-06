import React, { useRef, useState, useCallback } from 'react'
import { useSpring, animated } from 'react-spring/three'
import PropTypes from 'prop-types'
import { Canvas, useFrame } from 'react-three-fiber'
import { useInterval } from '../Utilities'

const Room = () => {
  const box = useRef()
  return (
    <mesh ref={box} scale={[1, 1, 1]} position={[1, 1, 1]}>
      <boxBufferGeometry attach="geometry" args={[15, 15, 15]} />
      <meshStandardMaterial attach="material" color={'hsl(0,0%,15%)'} />
    </mesh>
  )
}

const Pyrimod = ({ position, xyz }) => {
  // This reference will give us direct access to the mesh
  const topMesh = useRef()
  const bottomMesh = useRef()

  const scale = [3, 3, 3]
  const far = 1000

  // Set up state for the hovered and active state
  // const [hovered, setHover] = useState(false)
  // const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    //   bottomMesh.current.rotation.y += 0.005
    topMesh.current.rotation.y += 0.005
  })

  return (
    <group>
      <animated.mesh
        position={xyz.interpolate((x, y, z) => [(x * ((far - z) / far)) * 0.01, (y * ((far - z) / far)) * -0.01, z * -1])}
        ref={topMesh}
        scale={scale}
      >
        <coneBufferGeometry attach="geometry" args={[1, 1.3, 4, 1]}/>
        <meshStandardMaterial attach="material" color={'hsl(0,0%,70%)'} />
      </animated.mesh>
      <animated.mesh
        ref={bottomMesh}
        position={xyz.interpolate((x, y, z) => [(x * ((far - z) / far)) * 0.01, (y * ((far - z) / far)) * -0.01 - 4.2, z * -1])}
        scale={scale}
        rotation={[0, 0, Math.PI]}
      >
        <coneBufferGeometry attach="geometry" args={[1, 1.3, 4, 1]}/>
        <meshStandardMaterial attach="material" color={'hsl(0,0%,15%)'} />
      </animated.mesh>
    </group>
  )
}

Pyrimod.propTypes = {
  position: PropTypes.array,
  xyz: PropTypes.object
}

const BackgroundCanvas = () => {
  const [pressed, setPressed] = useState(false)
  const xyz = useRef([200, -200, 1])

  useInterval(() => {
    console.log(xyz.current)
    xyz.current[2] += 1
  }, pressed ? 200 : null)

  const [props, set] = useSpring(() => ({ xyz: xyz.current, config: { mass: 8, tension: 10, friction: 10 } }))
  const onMouseDown = useCallback(({ clientX: x, clientY: y }) => {
    setPressed(true)
    xyz.current = [x - window.innerWidth / 2, y - window.innerHeight / 2, 1]
  }, [])
  const onMouseUp = useCallback(() => {
    setPressed(false)

    set({ xyz: xyz.current })
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <Canvas style={{ position: 'absolute', zIndex: -1 }} >
        <ambientLight />
        <pointLight position={[-25, 0, 0]} color='hsl(0,90%,55%)'/>
        <Room />
        <Pyrimod position={[0, 4, 0]} xyz={props.xyz}/>
      </Canvas>
    </div>
  )
}

export default BackgroundCanvas
