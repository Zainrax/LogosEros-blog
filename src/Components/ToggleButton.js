/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { css, jsx } from '@emotion/core';

const svgButton = css`
  outline: none;
  background: none;
  cursor: pointer;
  border: none;
  margin-left: 1em;
`;

const svgStyle = css`
  background-color: none;
  width: 38;
  height: 38;
`;

const config = { mass: 13, tension: 1300, friction: 190 };

const ToggleButton = ({ toggle, setToggle }) => {
  const { x, y } = useSpring({
    config,
    x: toggle ? 1 : 0,
    y: toggle ? 0 : 1,
  });

  return (
    <button css={svgButton} type="button" onClick={() => { setToggle(!toggle); }}>
      <svg css={svgStyle} width="40px" height="40px" viewBox="0 0 40 40" fill="none">
        <animated.path
          css={{
            transformOrigin: 'center',
          }}
          className="menuPath"
          stroke="white"
          strokeWidth="8"
          fill="none"
          transform={y.interpolate((i) => `scale(${i})`)}
          d={`
        M 5, 21
        a 5,5 0 1,0 30,0
        a 5,5 0 1,0 -30,0
    `}
        />
        <animated.path
          css={{
            transformOrigin: 'center',
          }}
          className="menuPath"
          stroke="white"
          strokeWidth="8"
          fill="none"
          transform={x.interpolate((j) => `scale(${j})`)}
          d={`
          M33 28.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z
    `}
        />
      </svg>
    </button>
  );
};

ToggleButton.propTypes = {
  toggle: PropTypes.bool,
  setToggle: PropTypes.func,
};

ToggleButton.defaultProps = {
  toggle: false,
  setToggle: () => {},
};

export default ToggleButton;
