/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from 'redux/create';
import {Provider} from 'react-redux';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import renderRoutes from 'routes';

const apolloClient = new ApolloClient();

const dest = document.getElementById('content');
const store = createStore(apolloClient);
// const store = createStore();

ReactDOM.render(
  <ApolloProvider store={store} client={apolloClient}>
    {renderRoutes(store)}
  </ApolloProvider>,
  dest
);

