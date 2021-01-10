import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './history';
import App from './App';
import ScrollToTop from './components/Routes/ScrollToTop'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client';
import UserContextProvider from './contexts/user-context';
import TokenService from './services/token-service';

const httpLink = new HttpLink({ uri: 'https://sliced-updated.herokuapp.com/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${TokenService.getAuthToken()}`
    }
  })
  return forward(operation);
})


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserContextProvider>
      <Router history={history}>
        <ScrollToTop history={history} />
        <App />
      </Router>
    </UserContextProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
