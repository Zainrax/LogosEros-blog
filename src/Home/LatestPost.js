import React from 'react';

const LatestPosts = () => {
  const list = ['test', 'one', 'two'];

  return (
    <div>
      <h2>Latest Posts</h2>
      {list.map((l) => <h3>{l}</h3>)}
    </div>
  );
};

export default LatestPosts;
