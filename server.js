import express from 'express';
import { apolloServer } from 'graphql-tools';
import Schema from './data/fd17-schema';
//import Mocks from './data/fd17-mocks';
import Resolvers from './data/fd17-resolvers';

const GRAPHQL_PORT = 8080;

const graphQLServer = express();
graphQLServer.use('/graphql', apolloServer({
  graphiql: true,
  pretty: true,
  schema: Schema,
  //mocks: Mocks,
  resolvers: Resolvers,
}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));