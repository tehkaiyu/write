const { ApolloServer } = require('apollo-server-express');
const keys = require('@server/config/keys');
const db = require('@server/services/db');
const schema = require('@server/services/schema');
const { parseRequest, getUser } = require('@server/services/authentication');

function createApollo() {
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => {
      const token = parseRequest(req);
      return {
        db,
        request: req,
        response: res,
        user: getUser(token),
      };
    },
    playground: keys.nodeEnv === 'development',
    debug: keys.nodeEnv === 'development',
    cors: { credentials: true },
  });

  return apolloServer;
}

module.exports = createApollo;