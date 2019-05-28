import React from 'react';
import AddAuthor from '../AddAuthor';
import AddBook from '../AddBook';
import { UserInputWrapper } from './style';
// import Spinner from '../Spinner';
import { Spring, config } from 'react-spring/renderprops';



const UserInput = () => (
  <Spring native
  config={config.gentle}
  from={{ transform: 'scale(0)', willChange: 'scale'}}
  to={{ transform: 'scale(1)'}}>
  {props => <UserInputWrapper style={props}>
      <AddAuthor />
      <AddBook />
  </UserInputWrapper>}
</Spring>
  
);

export default UserInput;