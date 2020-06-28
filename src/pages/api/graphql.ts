import { ApolloServer } from 'apollo-server-micro';
import nextConnect from 'next-connect';

import schema from '../../graphql-server/schema';
import {
  resolveContext,
  sessionMiddleware,
} from '../../graphql-server/context';

const apolloServer = new ApolloServer({ context: resolveContext, schema });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default nextConnect()
  .use(sessionMiddleware)
  .use(apolloServer.createHandler({ path: '/api/graphql' }));
