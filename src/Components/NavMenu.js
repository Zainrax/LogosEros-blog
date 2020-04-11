/** @jsx jsx */
import React, { useState } from "react";
import { css, jsx } from "@emotion/core";
import { useTrail, animated } from "react-spring";
import { NavLink } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { linkReset, listReset } from "../CSS";

const navStyle = css`
  color: ${(props) => props.theme.colors.primary};
  align-self: flex-end;
  direction: rtl;
  padding-bottom: 0.2em;
  font-size: calc(1em + 25 * ((90vw + 50vh) / 660));
  font-weight: 800;
  font-family: "Futura", sans-serif;
  line-height: 1em;
`;

const navLinkStyle = css`
  color: black;
  &:hover {
    color: red;
  }
`;

const config = { mass: 5, tension: 1400, friction: 130 };

const NavMenu = () => {
  const [toggle, setToggle] = useState(true);
  const menuItems = ["HOME", "WORK", "BLOG", "ABOUT", "CONTACT"];
  const slide = useTrail(menuItems.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 330,
  });

  return (
    <nav css={navStyle}>
      <ToggleButton toggle={toggle} setToggle={setToggle} />
      <ul
        css={css`
          ${listReset}
        `}
      >
        {slide.map(({ x, ...rest }, index) => (
          <animated.li
            key={menuItems[index]}
            style={{
              transform: x.interpolate((y) => `translate3d(${y}px,0,0)`),
              ...rest,
            }}
          >
            <NavLink
              css={css`
                ${linkReset}
                ${navLinkStyle};
              `}
              to={`/${
                menuItems[index] !== "HOME"
                  ? menuItems[index].toLowerCase()
                  : ""
              }`}
            >
              {menuItems[index]}
            </NavLink>
          </animated.li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
