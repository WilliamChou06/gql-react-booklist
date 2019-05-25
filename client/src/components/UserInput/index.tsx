import React, { lazy, Suspense } from 'react';
import { UserInputWrapper } from './style';
import Spinner from '../Spinner';
import { Spring, animated } from 'react-spring/renderprops';



// Lazy loading
const AddAuthor = lazy(() => import('../AddAuthor'))
const AddBook = lazy(() => import('../AddBook'))


const UserInput = () => (
  <Spring native
  from={{ opacity: 0, marginTop: -1000 }}
  to={{ opacity: 1, marginTop: 0 }}>
  {props => <UserInputWrapper style={props}>
    <Suspense fallback={<Spinner />}>
      <AddAuthor />
    </Suspense>

    <Suspense fallback={<Spinner />}>
      <AddBook />
    </Suspense>
  </UserInputWrapper>}
</Spring>
  
);

export default UserInput;