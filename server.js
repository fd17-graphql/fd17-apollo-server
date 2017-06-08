import express from 'express';
import { apolloServer } from 'graphql-tools';
import Schema from './data/fd17-schema';
import Resolvers from './data/fd17-resolvers';

const GRAPHQL_PORT = process.env.PORT || 8080;

const graphQLServer = express();
graphQLServer.use('/graphql', apolloServer({
  graphiql: true,
  pretty: true,
  schema: Schema,
  resolvers: Resolvers,
}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
