import { IncomingMessage } from 'http';

export interface ContextInterface {
  session: {
    setAccountId: (id: string) => void;
    getAccountId: () => string;
    clear: () => void;
  };
}

interface SessionInterface {
  accountId: string;
}

const initializedSession: SessionInterface = {
  accountId: '',
};

const context = (incomingContext: {
  req: IncomingMessage & { session: SessionInterface };
}): ContextInterface => {
  return {
    session: {
      setAccountId: (id: string) =>
        (incomingContext.req.session.accountId = id),
      getAccountId: () => incomingContext.req.session.accountId,
      clear: () => (incomingContext.req.session = { ...initializedSession }),
    },
  };
};

export default context;
