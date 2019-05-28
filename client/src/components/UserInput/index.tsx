import React, { lazy, Suspense } from 'react';
import AddAuthor from '../AddAuthor';
import { UserInputWrapper } from './style';
import Spinner from '../Spinner';
import { Spring, config } from 'react-spring/renderprops';



// Lazy loading
// const AddAuthor = lazy(() => import('../AddAuthor'))
const AddBook = lazy(() => import('../AddBook'))


const UserInput = () => (
  <Spring native
  config={config.gentle}
  from={{  transform: 'scale(0)'}}
  to={{  transform: 'scale(1)'}}>
  {props => <UserInputWrapper style={props}>
      <AddAuthor />
    <Suspense fallback={<Spinner />}>
      <AddBook />
    </Suspense>
  </UserInputWrapper>}
</Spring>
  
);

export default UserInput;