import React, { useState, useEffect } from 'react'

import LatestPosts from './LatestPosts'
import BackgroundCanvas from '../Components/BackgroundCanvas'
const Home = () => {
  return (
    <div>
      <BackgroundCanvas />
      <LatestPosts />
    </div>
  )
}

export default Home
