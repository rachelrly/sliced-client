import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './history';
import App from './App';
import ScrollToTop from './components/Routes/ScrollToTop'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import UserContextProvider from './contexts/user-context';
import RecipeContextProvider from './contexts/recipe-context';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserContextProvider>
      <RecipeContextProvider>
        <Router history={history}>
          <ScrollToTop history={history} />
          <App />
        </Router>
      </RecipeContextProvider>
    </UserContextProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
