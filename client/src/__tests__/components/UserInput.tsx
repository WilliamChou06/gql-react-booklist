import React from 'react'
import { shallow } from 'enzyme'

import UserInput from '../../components/UserInput';

it('should render UserInput component correctly', () => {
  const wrapper = shallow(<UserInput />);

  expect(wrapper).toMatchSnapshot();
});