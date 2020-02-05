import React, { useState, useEffect } from 'react';
import LatestPosts from './LatestPost';

const Home = ({ posts }) => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    setTitles(
      posts,
    );
  }, []);
  return (
    <div>
      <LatestPosts />
    </div>
  );
};

export default Home;
