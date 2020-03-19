/** @jsx jsx */
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Global, css, jsx } from '@emotion/core'

import NavMenu from '../Components/NavMenu'
import Home from '../Home'
import Admin from '../Admin'
import './App.css'

const mainStyle = css`
`

const App = () => (
  <Router>
    <Global styles={css`
        '@font-face': {
          src: "https://fonts.googleapis.com/css?family=Raleway:bold|Roboto+Slab|Space+Mono|Futura&display=swap"
        }

        body {
          background-color: #1C1C1C;
          overflow: hidden;
        }
      `}
    />
    <main className="App" css={mainStyle}>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/admin" render={() => <Admin />} />
      </Switch>
      <NavMenu />
    </main>
  </Router>
)

export default App
