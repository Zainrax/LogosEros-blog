import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ test }) => (
  <div>
    <h1>Home</h1>
    <h2>{test ? 'True' : 'False'}</h2>
  </div>
);

Home.propTypes = {
  test: PropTypes.bool,
};

Home.defaultProps = {
  test: false,
};

export default Home;
