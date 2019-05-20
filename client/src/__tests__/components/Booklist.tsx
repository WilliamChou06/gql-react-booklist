import React from 'react'
import { shallow } from 'enzyme'

import Booklist from '../../components/Booklist';

it('should render Booklist component correctly', () => {
  const wrapper = shallow(<Booklist />);

  expect(wrapper).toMatchSnapshot();
})