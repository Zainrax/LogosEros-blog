import React, { useState, useEffect } from 'react'
import LatestPosts from './LatestPost'
import BackgroundCanvas from '../Components/BackgroundCanvas'

const Home = ({ posts }) => {
  const [titles, setTitles] = useState([])

  useEffect(() => {
    setTitles(
      posts
    )
  }, [])
  return (
    <div>
      <BackgroundCanvas />
      <LatestPosts />
    </div>
  )
}

export default Home
