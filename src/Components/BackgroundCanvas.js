import React, { useRef, useState, useEffect, useCallback } from "react";
import { useSpring, animated, interpolate } from "react-spring/three";
import PropTypes from "prop-types";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { useInterval } from "../Utilities";

const Room = () => {
  const box = useRef();
  return (
    <mesh ref={box} scale={[1, 1, 1]} position={[0, 0, -50]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshBasicMaterial attach="material" color={"hsl(0,0%,100%)"} />
    </mesh>
  );
};

const Indicator = ({ xy, duration }) => {
  const { camera } = useThree();
  const circle = useRef();

  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    duration: 0,
    config: { mass: 1, tension: 50, friction: 10 },
  }));

  useEffect(() => {
    console.log(duration);
    set({ xy, duration });
  }, [xy, duration]);

  const vec3 = useCallback((x, y) => {
    const vector = new THREE.Vector3(x, y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));
    return [pos.x, pos.y, pos.z];
  }, []);

  return (
    <group>
      <animated.mesh
        scale={props.duration.interpolate((x) => [x * 0.1, x * 0.1, x * 0.1])}
        ref={circle}
        position={props.xy.interpolate((x, y) => vec3(x, y))}
      >
        <circleGeometry attach="geometry" args={[0.5, 50]} />
        <meshStandardMaterial attach="material" color={"hsl(0,0%,20%)"} />
      </animated.mesh>
      <animated.mesh>
        <bufferGeometry attach="geometry" />
        <lineBasicMaterial attach="material" color={"hsl(0,0%,20%)"} />
      </animated.mesh>
    </group>
  );
};

Indicator.propTypes = {
  xy: PropTypes.array,
  duration: PropTypes.number,
};

const Pyrimod = ({ xyz }) => {
  // This reference will give us direct access to the mesh
  const { camera } = useThree();
  const topMesh = useRef();
  const bottomMesh = useRef();

  const scale = [3, 3, 3];

  const vec3 = useCallback((x, y, z) => {
    const vector = new THREE.Vector3(x, y, z);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));
    return [pos.x, pos.y, z];
  }, []);

  const [props, set] = useSpring(() => ({
    xyz: [0, 0, 0],
    config: { mass: 10, tension: 25, friction: 20 },
  }));

  useEffect(() => {
    console.log(xyz);
    set({ xyz });
  }, [xyz]);

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
        position={props.xyz.interpolate((x, y, z) => vec3(x, y + 0.52, z * -1))}
        ref={topMesh}
        scale={scale}
      >
        <coneBufferGeometry attach="geometry" args={[1, 1.3, 4, 1]} />
        <meshStandardMaterial attach="material" color={"hsl(0,0%,70%)"} />
      </animated.mesh>
      <animated.mesh
        ref={bottomMesh}
        position={props.xyz.interpolate((x, y, z) => vec3(x, y - 0.52, z * -1))}
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
  xyz: PropTypes.array,
};

const BackgroundCanvas = () => {
  const [pressed, setPressed] = useState(false);
  const [xy, setXY] = useState([0, 0]);
  const [xyz, setXYZ] = useState([0, 0, 3.2]);
  const [duration, setDuration] = useState(0);

  useInterval(
    () => {
      if (duration < 6) {
        setDuration(duration + 1);
      }
    },
    pressed ? 200 : null
  );
  const getRelativeXY = useCallback((x, y) => {
    const xCord = (x / window.innerWidth) * 2 - 1;
    const yCord = -(y / window.innerHeight) * 2 + 1;
    return [xCord, yCord];
  }, []);

  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) => {
      if (pressed) {
        setXY(getRelativeXY(x, y));
      }
    },
    [pressed]
  );

  const onMouseDown = useCallback(
    ({ clientX: x, clientY: y }) => {
      setXY(getRelativeXY(x, y));
      setDuration(0);
      setPressed(true);
    },
    [duration]
  );

  const onMouseUp = useCallback(
    ({ clientX: x, clientY: y }) => {
      setXYZ([...getRelativeXY(x, y), duration + 3.2]);
      setDuration(0);
      setPressed(false);
    },
    [duration]
  );

  return (
    <>
      <Canvas
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        style={{ position: "absolute", zIndex: -1 }}
      >
        <ambientLight />
        <pointLight position={[-25, 0, 0]} color="hsl(0,100%,45%)" />
        <Indicator xy={xy} duration={duration} />
        <Pyrimod xyz={xyz} />
        <Room />
      </Canvas>
    </>
  );
};

export default BackgroundCanvas;
