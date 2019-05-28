import React, { lazy, Suspense } from 'react';
import ReactGA from 'react-ga';
import { StyledApp } from './style';
import UserInput from '../UserInput';
import Spinner from '../Spinner';

const Booklist = lazy(() => import('../Booklist'));
// const UserInput = lazy(() => import('../UserInput'));

// Check if production:
// React Google Analytics config
if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_CODE);
  ReactGA.pageview(window.location.pathname + window.location.search);
}



const App: React.FC = () => (
  <StyledApp>
    <Suspense fallback={<Spinner />}>
      <Booklist />
    </Suspense>
      <UserInput />
  </StyledApp>
)

export default App;
