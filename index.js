const express = require('express');
const path = require('path');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// env file import
require('dotenv').config();

// CORS config | Allow cross-origin requests
app.use(cors());

// MongoDB connection
mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds139775.mlab.com:39775/codingband-test-server`
);
mongoose.connection.once('open', () => {
  console.log('Connected to DB');
});

// GraphQL middleware
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// Use React client middleware
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  // Send client routing to React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Port config
const PORT =  process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
