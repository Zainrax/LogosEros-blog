import React, { useRef, useState, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring/three";
import PropTypes from "prop-types";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { useInterval } from "../Utilities";

const Room = () => {
  const box = useRef();
  return (
    <mesh ref={box} scale={[1, 1, 1]} position={[0, 0, -50]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color={"hsl(0,0%,60%)"} />
    </mesh>
  );
};

const Indicator = ({ isPressed, xyz }) => {
  const { mouse, camera } = useThree();
  const circle = useRef();

  const vec3 = useCallback(() => {
    const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));
    return [pos.x, pos.y, pos.z];
  }, []);

  return (
    <animated.mesh
      scale={xyz.interpolate((x, y, z) => [z * 0.1, z * 0.1, z * 0.1])}
      visible={isPressed}
      ref={circle}
      position={vec3()}
    >
      <circleGeometry attach="geometry" args={[0.5, 50]} />
      <meshStandardMaterial attach="material" color={"hsl(0,0%,50%)"} />
    </animated.mesh>
  );
};

Indicator.propTypes = {
  isPressed: PropTypes.bool,
  xyz: PropTypes.object,
};

const Pyrimod = ({ position, xyz }) => {
  // This reference will give us direct access to the mesh
  const { mouse, camera } = useThree();
  const topMesh = useRef();
  const bottomMesh = useRef();

  const scale = [3, 3, 3];

  // Set up state for the hovered and active state
  // const [hovered, setHover] = useState(false)
  // const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    //   bottomMesh.current.rotation.y += 0.005
    topMesh.current.rotation.y += 0.005;
  });

  return (
    <group>
      <animated.mesh
        position={xyz.interpolate((x, y, z) => [x, y + 2, z * -1])}
        ref={topMesh}
        scale={scale}
      >
        <coneBufferGeometry attach="geometry" args={[1, 1.3, 4, 1]} />
        <meshStandardMaterial attach="material" color={"hsl(0,0%,70%)"} />
      </animated.mesh>
      <animated.mesh
        ref={bottomMesh}
        position={xyz.interpolate((x, y, z) => [x, y - 2, z * -1])}
        scale={scale}
        rotation={[0, 0, Math.PI]}
      >
        <coneBufferGeometry attach="geometry" args={[1, 1.3, 4, 1]} />
        <meshStandardMaterial attach="material" color={"hsl(0,0%,15%)"} />
      </animated.mesh>
    </group>
  );
};

Pyrimod.propTypes = {
  position: PropTypes.array,
  xyz: PropTypes.object,
};

const BackgroundCanvas = () => {
  const [pressed, setPressed] = useState(false);
  const xyz = useRef([0, 0, 1]);

  useInterval(
    () => {
      if (xyz.current[2] < 6) {
        xyz.current[2] += 1;
        set({ xyz: xyz.current });
      }
    },
    pressed ? 200 : null
  );

  const [props, set] = useSpring(() => ({
    xyz: xyz.current,
    config: { mass: 1, tension: 6, friction: 10 },
  }));

  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    const xCord = (x / window.innerWidth) * 2 - 1;
    const yCord = -(y / window.innerHeight) * 2 + 1;
    xyz.current = [xCord, yCord, xyz.current[2]];
  }, []);

  const onMouseDown = useCallback(() => {
    setPressed(true);
    xyz.current[2] = 0;
  }, []);

  const onMouseUp = useCallback(() => {
    setPressed(false);
    set({ xyz: xyz.current });
    xyz.current[2] = 0;
  }, []);

  return (
    <>
      <Canvas
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        style={{ position: "absolute", zIndex: 1 }}
      >
        <ambientLight />
        <pointLight position={[-25, 0, 0]} color="hsl(0,100%,45%)" />
        <Indicator isPressed={pressed} xyz={props.xyz} />
        {
          //       <Pyrimod position={[0, 0, 2]} xyz={props.xyz} />
        }
        <Room />
      </Canvas>
    </>
  );
};

export default BackgroundCanvas;
