import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../../queries';
import { Form, Input, Button, DatePicker, Select, Typography } from 'antd'
import Spinner from '../Spinner';
import {StyledAddBookContainer} from './style'

interface Props {
  data: any,
  form: any,
  getAuthorsQuery: any,
  addBookMutation: any
}

interface State {
  title: string,
  edition: string,
  author: string
}

class AddBook extends Component<Props, State> {
  state = {
    title: '',
    edition: '',
    author: ''
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.props.form.validateFields((err, {title, edition, authors}) => {
      if (!err) {
        console.log('Received values of form: ', );
         this.props.addBookMutation({
          variables: {
            title,
            edition,
            authorsId: authors
          },
          refetchQueries: [{
            query: getBooksQuery
          }]
        });
        this.props.form.resetFields();

      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form

    // Wait for query to load in
    if (this.props.getAuthorsQuery.loading) {
      return <Spinner />
    }

    return (
      <StyledAddBookContainer>
        <Typography.Title level={2}>Book</Typography.Title>
        <p>All fields are required! *</p>
        <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('title')(
            <Input placeholder="Book Title"></Input>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('edition')(
            <DatePicker placeholder="Select edition date" format="YYYY-MM-DD HH:mm:ss" />

          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('authors')(<Select mode="multiple" placeholder="Select authors">
            {this.props.getAuthorsQuery.authors.map((author) => <Select.Option key={author.id} value={author.id}>{author.name}</Select.Option>)}
          </Select>)}
        </Form.Item>
        <Button htmlType="submit" type="primary" ghost>Add Book</Button>
      </Form>
      </StyledAddBookContainer>
    )
  }
}

// antd form higher order function
const WrappedAddBook = Form.create({ name: 'add_book' })(AddBook);

// @ts-ignore
export default compose(
  graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
  graphql(addBookMutation, {name: 'addBookMutation'})
)(WrappedAddBook);