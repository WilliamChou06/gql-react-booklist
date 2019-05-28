import React from 'react'
import { graphql } from 'react-apollo';
import { addAuthorMutation, getAuthorsQuery } from '../../queries';
// import { Form, Input, Button, Typography } from 'antd';
import { StyledAddAuthorContainer } from './style';

// antd imports
import Form from 'antd/lib/form'; 
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Typography from 'antd/lib/typography';


// Component interfaces
interface Props {
  data: any,
  form: any,
  getAuthorsQuery: any,
  mutate(args): any
}


const AddAuthor = React.memo((props: Props) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    props.form.validateFields((err, { name }) => {
      if (!err) {
        props.mutate({
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
      props.form.resetFields();
    });
  };

  const { getFieldDecorator } = props.form
  return (
    <StyledAddAuthorContainer>
      <Typography.Title level={2}>Author</Typography.Title>
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator('name')(
            <Input placeholder="Add Author"></Input>
          )}
        </Form.Item>
        <Button htmlType="submit" type="primary" ghost>Add Author</Button>
      </Form>
    </StyledAddAuthorContainer>
  )
})

const WrappedAddAuthor = Form.create({ name: 'add_book' })(AddAuthor);

// @ts-ignore
export default graphql(addAuthorMutation)(WrappedAddAuthor);