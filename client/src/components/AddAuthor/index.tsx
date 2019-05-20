import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { addAuthorMutation, getAuthorsQuery } from '../../queries';
import { Form, Input, Button, Typography } from 'antd'
import { StyledAddAuthorContainer } from './style';


// Component interfaces
interface Props {
  data: any,
  form: any,
  getAuthorsQuery: any,
  mutate(args): any
}


class AddAuthor extends Component<Props> {

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.props.form.validateFields((err, { name }) => {
      if (!err) {
        console.log('Received values of form: ');
        this.props.mutate({
          variables: {
            name
          },
          refetchQueries: [
            {
              query: getAuthorsQuery
            }
          ]
        });
      }
      this.props.form.resetFields();
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form
    return (
      <StyledAddAuthorContainer>
        <Typography.Title level={2}>Author</Typography.Title>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('name')(
              <Input placeholder="Add Author"></Input>
            )}
          </Form.Item>
          <Button htmlType="submit" type="primary" ghost>Add Author</Button>
        </Form>
      </StyledAddAuthorContainer>
    )
  }
}

const WrappedAddAuthor = Form.create({ name: 'add_book' })(AddAuthor);

// @ts-ignore
export default graphql(addAuthorMutation)(WrappedAddAuthor);