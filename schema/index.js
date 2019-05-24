const graphql = require('graphql');
const graphqlIsoDate = require('graphql-iso-date');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
  GraphQLNonNull
} = graphql;

// Dependency for GraphQL dates
const { GraphQLDateTime } = graphqlIsoDate;

// Types

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    edition: { type: GraphQLDateTime },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //  return Author.find({_id: parent.authorsId});
        return Author.find()
          .where('_id')
          .in(parent.authorsId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return Book.find({ authorId: parent.id });
        return Book.find()
          .where('authorsId')
          .in(parent.id);
      }
    }
  })
});

// Root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find();
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return Author.find();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        authorsId: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        edition: { type: GraphQLString }
      },
      resolve(parent, args) {
        let book = new Book({
          title: args.title,
          authorsId: args.authorsId,
          edition: args.edition
        });
        return book.save();
      }
    },
    editBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        authorsId: { type: new GraphQLList(GraphQLID) },
        edition: { type: GraphQLString }
      },
      resolve(parent, { id, title, authorsId, edition }) {
        return Book.findOneAndUpdate({ _id: id }, { $set: {
          title,
          authorsId,
          edition
        }});
      }
    },
    deleteBook: {
      type: BookType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, { id }) {
        return Book.findByIdAndRemove(id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
