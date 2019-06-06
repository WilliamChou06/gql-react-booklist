import React, { useState, useEffect } from 'react';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import uniqBy from 'lodash/uniqBy';
import { getBooksQuery, deleteBookMutation } from '../../queries';
import { StyledBooklistContainer } from './style';
import Spinner from '../Spinner';
import { Spring, config } from 'react-spring/renderprops';
import { Link } from 'react-router-dom';

// import { Table, Input, Icon, Button } from 'antd';
import Highlighter from 'react-highlight-words';

// antd imports
import Table from 'antd/lib/table';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

interface Props {
  data: any;
  getBooksQuery: any;
  deleteBookMutation: any;
}

const BookList: React.FC<Props> = props => {
  const [searchText, setSearchText] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  });

  // Updating window width in state

  const updateWindowWidth = (): void => setWindowWidth(window.innerWidth);

  const handleDeleteBook = (id: number | string): void => {
    props.deleteBookMutation({
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: getBooksQuery,
        },
      ],
    });
  };

  // Edition sorting method

  const sortEditions = (a, b) => {
    if (a.edition > b.edition) {
      return 1;
    }
    if (a.edition === b.edition) {
      return 0;
    }
    return -1;
  };

  // Get all table Author tab filters
  // Ugly implementation
  const getAllAuthorsList = (): object[] => {
    const authorsFilter = [];
    const books = props.getBooksQuery.books;
    books.forEach(book =>
      book.authors.forEach(author =>
        authorsFilter.push({ text: author.name, value: author.name })
      )
    );
    return uniqBy(authorsFilter, 'value');
  };

  let searchInput: React.ReactNode;

  // antd search filter
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            // @ts-ignore
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        // @ts-ignore
        setTimeout(() => searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  if (props.getBooksQuery.loading) {
    return <Spinner />;
  }

  // Table columns and sorting functions
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 300,
      sorter: (a, b) => a.title.localeCompare(b.title),
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Edition',
      dataIndex: 'edition',
      key: 'edition',
      width: 100,
      render: date => date && moment(date).format('DD/MM/YYYY'),
      sorter: sortEditions,
    },
    {
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <p style={{ marginBottom: 0 }}>
            #<Icon type="user" />
          </p>
        </div>
      ),
      dataIndex: 'authors',
      key: '#authors',
      width: 60,
      render: authors => (
        <div style={{ width: '100%', textAlign: 'center' }}>
          {authors.length}
        </div>
      ),
      sorter: (a, b) => a.authors.length - b.authors.length,
    },
    {
      title: 'Authors',
      dataIndex: 'authors',
      key: 'authors',
      render: authors => authors.map(author => author.name).join(', '),
      sorter: (a, b) => a.authors[0].name.localeCompare(b.authors[0].name),
      filters: getAllAuthorsList(),
      onFilter: (value, record) =>
        record.authors
          .map(author => author.name)
          .join(', ')
          .indexOf(value) >= 0,
    },
    {
      title: 'Actions',
      render: book => {
        // Rendering actions for each table item
        // Icon style is in-line because it's too much of a hassle to
        // put in style.ts at the moment
        return (
          <span style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Link title="Edit" to={`/edit/${book.id}`}>
              <Icon style={{ fontSize: '18px' }} type="edit" />
            </Link>
            <a title="Delete" onClick={() => handleDeleteBook(book.id)}>
              <Icon
                style={{ fontSize: '18px', color: '#ff4d4f' }}
                type="delete"
              />
            </a>
          </span>
        );
      },
    },
  ];

  const columnsMobile: object[] = columns
    .map(column => {
      delete column.width;
      return column;
    })
    .filter(column => column !== columns[2]);

  return (
    <Spring
      native
      config={config.gentle}
      from={{
        opacity: 0,
        transform: 'scale(0) translateZ(0)',
        willChange: 'scale translateZ',
      }}
      to={{ opacity: 1, transform: 'scale(1) translateZ(0)' }}
    >
      {animProps => (
        <StyledBooklistContainer style={animProps}>
          <Table
            dataSource={props.getBooksQuery.books}
            columns={windowWidth > 960 ? columns : columnsMobile}
            size={windowWidth > 960 ? 'middle' : 'small'}
          />
        </StyledBooklistContainer>
      )}
    </Spring>
  );
};

// @ts-ignore
export default compose(
  graphql(getBooksQuery, { name: 'getBooksQuery' }),
  graphql(deleteBookMutation, { name: 'deleteBookMutation' })
)(BookList);
