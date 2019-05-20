import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import Spinner from './components/Spinner';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


import 'antd/dist/antd.css'
import * as serviceWorker from './serviceWorker';

const EditBook = lazy(() => import('./components/EditBook'));
const App = lazy(() => import('./components/App'));

const client = new ApolloClient({
  uri: '/graphql'
})

const history = createBrowserHistory();


ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/" render={(props) => <Suspense fallback={<Spinner />}>
          <App {...props} />
        </Suspense>} />
        <Route path="/edit/:bookId" render={(props) => <Suspense fallback={<Spinner />}>
          <EditBook {...props} />
        </Suspense>} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
