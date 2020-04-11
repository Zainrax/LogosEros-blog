import React, { useRef, useState, useCallback } from "react";
import { useSpring, animated } from "react-spring/three";
import PropTypes from "prop-types";
import { Canvas, useFrame, useThree } from "react-three-fiber";
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

const Indicator = ({ xyz }) => {
  const circle = useRef();
  console.log(xyz);
  return (
    <mesh ref={circle} position={[xyz[0], xyz[0], 0]}>
      <circleGeometry attach="geometry" args={[0, 50]} />
      <meshStandardMaterial attach="material" color={"hsl(0,0%,50%)"} />
    </mesh>
  );
};

Indicator.propTypes = {
  xyz: PropTypes.object,
};

const Pyrimod = ({ position, xyz }) => {
  // This reference will give us direct access to the mesh
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
  const { mouse } = useThree();
  const xyz = useRef([0, 0, 1]);

  useInterval(
    () => {
      console.log(xyz.current);
      xyz.current[2] += 1;
    },
    pressed ? 200 : null
  );

  const [props, set] = useSpring(() => ({
    xyz: xyz.current,
    config: { mass: 8, tension: 10, friction: 10 },
  }));
  const onMouseDown = useCallback(({ clientX: x, clientY: y }) => {
    setPressed(true);
    console.log(mouse);
    xyz.current = [0, 0, 0];
  }, []);
  const onMouseUp = useCallback(() => {
    setPressed(false);

    set({ xyz: xyz.current });
  }, []);

  return (
    <>
      <Canvas
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        raycaster
        style={{ position: "absolute", zIndex: 1 }}
      >
        <ambientLight />
        <pointLight position={[-25, 0, 0]} color="hsl(0,100%,45%)" />
        {pressed && <Indicator xyz={xyz.current} />}
        <Pyrimod position={[0, 0, 2]} xyz={props.xyz} />
        <Room />
      </Canvas>
    </>
  );
};

export default BackgroundCanvas;
