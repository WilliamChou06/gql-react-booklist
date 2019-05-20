import React from 'react'
import { shallow } from 'enzyme'

import AddBook from '../../components/AddBook';

it('should render AddBook component correctly', () => {
  const wrapper = shallow(<AddBook />);

  expect(wrapper).toMatchSnapshot();
})