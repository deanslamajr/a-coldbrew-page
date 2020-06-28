import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import cookieSession from 'cookie-session';
import nextConnect from 'next-connect';
import getConfig from 'next/config';

const {
  serverRuntimeConfig: { SESSION_COOKIE_SECRET },
} = getConfig();

export type IncomingMessageWithSession = IncomingMessage & {
  session: SessionInterface;
};

export interface ContextInterface {
  session: {
    setAccountId: (id: string) => void;
    getAccountId: () => string | undefined;
    clear: () => void;
  };
}

interface SessionInterface {
  accountId?: string;
}

interface ResolveContextParams {
  req: IncomingMessage;
  res: ServerResponse;
}

const initializedSession: SessionInterface = {
  accountId: undefined,
};

export const resolveContext = (incomingContext: {
  req: IncomingMessageWithSession;
}): ContextInterface => {
  return {
    session: {
      setAccountId: (id: string) =>
        (incomingContext.req.session.accountId = id),
      getAccountId: () =>
        incomingContext.req.session && incomingContext.req.session.accountId,
      clear: () => (incomingContext.req.session = { ...initializedSession }),
    },
  };
};

export const sessionMiddleware = cookieSession({
  name: 'session',
  secret: SESSION_COOKIE_SECRET,
  expires: new Date(253402300000000), // Approximately Friday, 31 Dec 9999 23:59:59 GMT
});

export const resolveContextDuringNextSSR = async ({
  req,
  res,
}: ResolveContextParams): Promise<ContextInterface> => {
  const handler = nextConnect();
  handler.use(sessionMiddleware);
  await handler.apply(req as NextApiRequest, res as NextApiResponse);
  return resolveContext({
    req: req as IncomingMessageWithSession,
  });
};
