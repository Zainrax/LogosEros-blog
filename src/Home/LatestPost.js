import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { linkReset, listReset } from '../CSS'

const LatestPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2em;
  color: white;

  h2 {
    margin: 0
    font-family: "Futura";
    font-size: 2.5em;
  }
`

const LatestPost = styled.li`
  font-family: "Space Mono"
`

const LatestPosts = () => {
  const list = ['test', 'one', 'two']

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
