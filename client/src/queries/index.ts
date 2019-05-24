import { gql } from 'apollo-boost';

export const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

export const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      title
      edition
      authors {
        id
        name
      }
    }
  }
`;

export const getBooksQuery = gql`
  {
    books {
      title
      id
      edition
      authors {
        id
        name
      }
    }
  }
`;



export const addBookMutation = gql`
  mutation($title: String!, $authorsId: [ID!]!, $edition: String!) {
    addBook(title: $title, authorsId: $authorsId, edition: $edition) {
      title
      id
      authors {
        id
        name
      }
    }
  }
`;


export const editBookMutation = gql`
  mutation($id: ID!, $title: String, $authorsId: [ID!], $edition: String) {
    editBook(id: $id, title: $title, authorsId: $authorsId, edition: $edition) {
      id
      title
      edition
      authors {
        id
        name
      }
    }
  }
`;

export const deleteBookMutation = gql`
  mutation($id: ID!) {
    deleteBook(id: $id){
      id,
      title,
      edition
    }
  }
`

export const addAuthorMutation = gql`
  mutation($name: String!) {
    addAuthor(name: $name) {
      id
      name
    }
  }
`;

