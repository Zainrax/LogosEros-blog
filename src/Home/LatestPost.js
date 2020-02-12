import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { linkReset, listReset } from '../CSS'

const LatestPostContainer = styled.div`
  color: white;
`

const LatestPosts = () => {
  const list = ['test', 'one', 'two']

  return (
    <LatestPostContainer>
      <h2>Latest Posts</h2>
      <ol css={listReset}>
        {list.map((l, i) => <li key={i}><a css={linkReset}>{l}</a></li>)}
      </ol>
    </LatestPostContainer>
  )
}

export default LatestPosts
