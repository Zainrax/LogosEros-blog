import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

import { linkReset, listReset } from "../CSS";

const LatestPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2em;
  color: white;

  h2 {
    margin: 0;
    font-family: "Space Mono";
    font-style: italic;
    font-size: 2em;
    margin-bottom: 0.2em;
  }

  ol {
    max-width: 30em;
  }
`;

const LatestPost = styled.li`
  font-family: "Space Mono";
  font-size: 1.5em;
  font-weight: 600;
  min-width: 15em;
  padding-bottom: 0.5em;
`;

const POSTS = gql`
  {
    posts {
      title
    }
  }
`;

const LatestPosts = () => {
  const { loading, error, data } = useQuery(POSTS);

  if (loading) return <p>loading...</p>;
  if (error) return <p> Error : (</p>;

  return (
    <LatestPostContainer>
      <h2>LATEST POSTS</h2>
      <ol css={listReset}>
        {data.posts.map(({ title }, index) => (
          <LatestPost key={index}>
            <Link css={linkReset} to={title.toLowerCase().replace(/\s/g, "-")}>
              {title}
            </Link>
          </LatestPost>
        ))}
      </ol>
    </LatestPostContainer>
  );
};

export default LatestPosts;
