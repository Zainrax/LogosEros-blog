/** @jsx jsx */
import React, { useState } from 'react';
import { css, jsx } from '@emotion/core';
import { useTrail, animated } from 'react-spring';
import { NavLink } from 'react-router-dom';
import ToggleButton from './ToggleButton';

const navStyle = css`
  position: absolute;
  bottom: 0;
  padding-bottom: 0.2em;
  font-size:  calc(3em + 20 * ((100vw) / 660));
  font-weight: 800;
  font-family: 'Raleway', sans-serif;
  line-height: 1em;
`;

const ulStyle = css`
  list-style: none;
  margin: 0;
`;

const linkStyle = css`
  color: white;
  text-decoration: none;
`;

const config = { mass: 13, tension: 1300, friction: 190 };

const NavMenu = () => {
  const [toggle, setToggle] = useState(true);
  const menuItems = ['HOME', 'WORK', 'BLOG', 'ABOUT', 'CONTACT'];
  const slide = useTrail(menuItems.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : -330,
  });

  return (
    <nav css={
      navStyle
    }
    >
      <ToggleButton toggle={toggle} setToggle={setToggle} />
      <ul css={ulStyle}>
        { slide.map(({ x, ...rest }, index) => (
          <animated.li key={menuItems[index]} style={{ transform: x.interpolate((y) => `translate3d(${y}px,0,0)`), ...rest }}>
            <NavLink
              css={linkStyle}
              to={`/${menuItems[index] !== 'HOME' ? menuItems[index].toLowerCase() : ''}`}
            >
              <b>
                {menuItems[index]}
              </b>
            </NavLink>
          </animated.li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
