import React, { useState, useEffect } from "react";

import LatestPosts from "./LatestPosts";
import { BackgroundCanvas, Logo, NavMenu } from "../Components";

const Home = () => {
  return (
    <>
      <BackgroundCanvas />
      <Logo />
      <LatestPosts />
      <NavMenu />
    </>
  );
};

export default Home;
