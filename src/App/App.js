/** @jsx jsx */
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Global, css, jsx } from '@emotion/core'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import NavMenu from '../Components/NavMenu'
import Home from '../Home'
import Admin from '../Admin'
import './App.css'

const mainStyle = css`
`

const App = () => {
  const client = new ApolloClient({
    uri: 'https://us-central1-logos-eros.cloudfunctions.net/graphql'
  })
  return (
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
      <ApolloProvider client={client}>
        <main className="App" css={mainStyle}>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/admin" render={() => <Admin />} />
          </Switch>
          <NavMenu />
        </main>
      </ApolloProvider>
    </Router>
  )
}

export default App
