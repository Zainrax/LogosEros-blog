import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const logoStyle = css`
  width: 100%;
  max-width: 35em;
`;

const Logo = () => {
  return (
    <svg
      css={logoStyle}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 530 100"
    >
      <g fill="none" fillRule="evenodd">
        <path fill="#282828" d="M297 13h226v74H297z" />
        <text
          fontFamily="Raleway-Bold, Raleway"
          fontSize="84.7"
          fontWeight="bold"
        >
          <tspan x="9.4" y="80" fill="#282828">
            LOGOS
          </tspan>{" "}
          <tspan x="296.4" y="80" fill="#FFF">
            EROS
          </tspan>
        </text>
        <path stroke="#282828" strokeWidth="8.7" d="M5 12h520v78H5z" />
      </g>
    </svg>
  );
};

export default Logo;
