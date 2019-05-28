import React from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, getBookQuery, editBookMutation, getBooksQuery } from '../../queries';
// import { Form, Input, DatePicker, Select, Typography } from 'antd';
import { StyledButton, StyledEditBookWrapper, StyledSpinnerWrapper } from './style';
import Spinner from '../Spinner';
import { Spring, config } from 'react-spring/renderprops';
import moment from 'moment';

// antd imports
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Typography from 'antd/lib/typography';
import Select from 'antd/lib/select';
import DatePicker from 'antd/lib/date-picker';

interface Props {
  data: any;
  form: any;
  getAuthorsQuery: any;
  match: any;
  getBookQuery: any;
  editBookMutation: any;
  history: any
}


const EditBook = (props: Props) => {

  // Push to root directory if cancel btn clicked
  const handleCancel = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.history.push('/');
  }

  // Call mutation to GraphQL server and refresh book queries
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.form.validateFields((err, { title, edition, authors }) => {
      if (!err) {
        // Call edit mutation, repopulate table and push to root path
        props.editBookMutation({
          variables: {
            id: props.match.params.bookId,
            title,
            edition,
            authorsId: authors
          },
          refetchQueries: [{
            query: getBooksQuery
          },]
        });
        props.history.push('/');
      }
    });
  };
  

  const { getFieldDecorator } = props.form

  if (props.getAuthorsQuery.loading || !props.getBookQuery.book) {
    return <StyledSpinnerWrapper><Spinner /></StyledSpinnerWrapper>;
  }

  // Store book object in variable
  let book = props.getBookQuery.book;
  let authorIds = book.authors.map(author => author.id)
  return (

    <Spring native
      config={config.gentle}
      from={{  transform: 'scale(0)', backfaceVisibility: 'hidden'}}
      to={{ opacity: 1, transform: 'scale(1)', backfaceVisibility: 'hidden'}}>
        
        {animProps => <StyledEditBookWrapper style={animProps}>
      <div>
        <Typography.Title level={2}>Editing: {book.title}</Typography.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator('title', {
              initialValue: book.title
            })(
              <Input placeholder="Book Title" ></Input>

            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('edition', {
              // set book edition moment
              initialValue: moment(book.edition)
            })(
              <DatePicker placeholder="Select edition date" format="YYYY-MM-DD HH:mm:ss" />

            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('authors', {
              initialValue: authorIds
            })(<Select mode="multiple" placeholder="Select authors">
              {props.getAuthorsQuery.authors.map((author) => <Select.Option key={author.id} value={author.id}>{author.name}</Select.Option>)}
            </Select>)}
          </Form.Item>
          <StyledButton htmlType="submit" type="primary" ghost>Edit Book</StyledButton>
          <StyledButton onClick={handleCancel} type="danger" ghost>Cancel</StyledButton>
        </Form>
      </div>
    </StyledEditBookWrapper>}
      </Spring>
    
  )

}

// antd form HOF
const WrappedEditBook = Form.create({ name: 'edit_book' })(EditBook);

// Compose all GraphQL queries
// @ts-ignore
export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(editBookMutation, { name: 'editBookMutation' }),
  graphql(getBookQuery, {
    name: 'getBookQuery',
    options: (props: Props) => {
      return {
        variables: {
          id: props.match.params.bookId
        }
      }
    }
  }),
)(WrappedEditBook);