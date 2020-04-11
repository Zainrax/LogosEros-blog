/** @jsx jsx */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Global, css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "emotion-theming";

import Home from "../Home";
import Admin from "../Admin";
import "./App.css";

const theme = {
  colors: {
    primary: "0A0A0A",
    highlight: "CC3838",
  },
};

const mainStyle = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const App = () => {
  const client = new ApolloClient({
    uri: "https://us-central1-logos-eros.cloudfunctions.net/graphql",
  });

  return (
    <Router>
      <Global
        styles={css`
          "@font-face": {
            src: "https://fonts.googleapis.com/css?family=Raleway:bold|Roboto+Slab|Space+Mono|Futura&display=swap";
          }

          body {
            overflow: hidden;
          }
        `}
      />
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <main className="App" css={mainStyle}>
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/admin" render={() => <Admin />} />
            </Switch>
          </main>
        </ThemeProvider>
      </ApolloProvider>
    </Router>
  );
};

export default App;
