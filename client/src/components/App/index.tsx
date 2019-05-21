import React, { lazy, Suspense } from 'react';
import { StyledApp } from './style';
import Spinner from '../Spinner';

const Booklist = lazy(() => import('../Booklist'))
const UserInput = lazy(() => import('../UserInput'))

const App: React.FC = () => (
  <StyledApp>
    <Suspense fallback={<Spinner />}>
      <Booklist />
    </Suspense>
    <Suspense fallback={<Spinner />}>
      <UserInput />
    </Suspense>
  </StyledApp>
)

export default App;
