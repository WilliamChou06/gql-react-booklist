import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import Spinner from './components/Spinner';
import { Transition, animated } from 'react-spring/renderprops'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


// antd css imports
import 'antd/lib/date-picker/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/typography/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/table/style/css';

import GlobalStyle from './GlobalStyle';


import * as serviceWorker from './serviceWorker';

const EditBook = lazy(() => import('./components/EditBook'));
const App = lazy(() => import('./components/App'));

const client = new ApolloClient({
  uri: '/graphql'
})

const history = createBrowserHistory();

const AnimatedRoute = ({ children }) => (
  <Route
    render={({ location }) => (
      <Transition
        native
        items={location}
        keys={location => location.pathname}
        from={{ opacity: 1, transform: 'scale(0)' }}
        enter={{ opacity: 1, transform: 'scale(1)' }}
        leave={{ display: 'none', transform: 'scale(0)', pointerEvents: 'none' }}>
        {location => style => <animated.div style={style}>{children(location)}</animated.div>}
      </Transition>
    )}
  />
)


ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter history={history}>
      <AnimatedRoute>
        {location => (
          <Switch location={location}>
            <Route exact path="/" render={(props) => <Suspense fallback={<Spinner />}>
              <GlobalStyle />
              <App {...props} />
            </Suspense>} />
            <Route path="/edit/:bookId" render={(props) => <Suspense fallback={<Spinner />}>
              <EditBook {...props} />
            </Suspense>} />
          </Switch>
        )}
      </AnimatedRoute>
    </BrowserRouter>
  </ApolloProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
