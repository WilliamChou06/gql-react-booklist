import React from 'react'
import { shallow } from 'enzyme'

import EditBook from '../../components/EditBook';
import { Form } from 'antd';

let wrapper, history;

beforeEach(() => {
  wrapper = shallow(<EditBook />);
  history = {
    push: jest.fn()
  }
})

it('should render EditBook component correctly', () => {
  expect(wrapper).toMatchSnapshot();
})

// it('should handle onSubmit', () => {
//   wrapper.find('Form').simulate('submit');
//   expect(history.push).toHaveBeenLastCalledWith("/");
// })