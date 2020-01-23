import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router } from "react-router-dom";
import { persistCache } from "apollo-cache-persist";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "http://192.168.1.106:4000",
  clientState: {
    defaults: {
      selectedCharID: null
    }
  },
  cache: cache
});

const setupAndRender = async () => {
  await persistCache({
    cache,
    storage: localStorage
  });
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>,
    document.getElementById("root")
  );
};

setupAndRender();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
