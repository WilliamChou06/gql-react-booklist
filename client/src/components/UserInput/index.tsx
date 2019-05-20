import React, { lazy, Suspense } from 'react';
import { UserInputWrapper } from './style';
import Spinner from '../Spinner'


// Lazy loading
const AddAuthor = lazy(() => import('../AddAuthor'))
const AddBook = lazy(() => import('../AddBook'))


const UserInput = () => {
  return (
    <UserInputWrapper >
      <Suspense fallback={<Spinner />}>
        <AddAuthor />
      </Suspense>
      
      <Suspense fallback={<Spinner />}>
        <AddBook />
      </Suspense>
      </UserInputWrapper>
      );
    };
    
export default UserInput;