import React from 'react'
import { shallow } from 'enzyme'

import AddAuthor from '../../components/AddAuthor';

it('should render AddAuthor component correctly', () => {
  const wrapper = shallow(<AddAuthor />);

  expect(wrapper).toMatchSnapshot();
})