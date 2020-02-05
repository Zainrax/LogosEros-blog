/** @jsx jsx */
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Global, css, jsx } from '@emotion/core'

import BackgroundCanvas from '../Components/BackgroundCanvas'
import NavMenu from '../Components/NavMenu'
import Home from '../Home'
import './App.css'

const mainStyle = css`
`

const App = () => (
  <Router>
    <Global styles={css`
        '@font-face': {
          src: "https://fonts.googleapis.com/css?family=Raleway:bold|Roboto+Slab|Space+Mono&display=swap"
        }

        body {
          background-color: #1C1C1C;
          max-width: 100%;
          min-height 100vh;
        }
      `}
    />
    <main className="App" css={mainStyle}>
      <BackgroundCanvas />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
      </Switch>
      <NavMenu />
    </main>
  </Router>
)

export default App
