import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { linkReset, listReset } from '../CSS'

const LatestPostContainer = styled.div`
  margin-left: 2em;
  color: white;

  h2 {
    margin: 0;
    font-family: "Futura";
    font-size: 2.5em;
    margin-bottom: 0.5em;
  }

  ol  {
    white-space: nowrap;
    max-width: 30em;
  }
`

const LatestPost = styled.li`
  font-family: "Space Mono";
  font-size: 1.5em;
  font-weight: 600;
  width:100%;
  padding-bottom: 0.5em;
`

const LatestPosts = () => {
  const list = ['The path to resistance', 'Being one with the path', 'The middle ground of software']

  return (
    <LatestPostContainer>
      <h2>Latest Posts</h2>
      <ol css={listReset}>
        {list.map((l, i) => <LatestPost key={i}><a css={linkReset}>{l}</a></LatestPost>)}
      </ol>
    </LatestPostContainer>
  )
}

export default LatestPosts
