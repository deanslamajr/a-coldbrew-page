import { IncomingMessage } from 'http';

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

const initializedSession: SessionInterface = {
  accountId: undefined,
};

export type IncomingMessageWithSession = IncomingMessage & {
  session: SessionInterface;
};

const context = (incomingContext: {
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

export default context;
