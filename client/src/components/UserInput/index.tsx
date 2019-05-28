import React, { lazy, Suspense } from 'react';
import AddAuthor from '../AddAuthor';
import AddBook from '../AddBook';
import { UserInputWrapper } from './style';
// import Spinner from '../Spinner';
import { Spring, config } from 'react-spring/renderprops';



// Lazy loading
// const AddBook = lazy(() => import('../AddBook'))
// const AddBook = lazy(() => import('../AddBook'))


const UserInput = () => (
  <Spring native
  config={config.gentle}
  from={{  transform: 'scale(0)'}}
  to={{  transform: 'scale(1)'}}>
  {props => <UserInputWrapper style={props}>
      <AddAuthor />
      <AddBook />
  </UserInputWrapper>}
</Spring>
  
);

export default UserInput;