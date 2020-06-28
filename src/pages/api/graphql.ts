import { ApolloServer } from 'apollo-server-micro';
import nextConnect from 'next-connect';
import cookieSession from 'cookie-session';
import getConfig from 'next/config';

import schema from '../../graphql-server/schema';
import context from '../../graphql-server/context';

const {
  serverRuntimeConfig: { SESSION_COOKIE_SECRET },
} = getConfig();

const apolloServer = new ApolloServer({ context, schema });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default nextConnect()
  .use(
    cookieSession({
      name: 'session',
      secret: SESSION_COOKIE_SECRET,
      expires: new Date(253402300000000), // Approximately Friday, 31 Dec 9999 23:59:59 GMT
    })
  )
  .use(apolloServer.createHandler({ path: '/api/graphql' }));
