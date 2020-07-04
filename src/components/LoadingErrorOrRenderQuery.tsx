import { ApolloError } from 'apollo-client';

import { Spinner } from './Spinner';

interface Props<T> {
  error: ApolloError | undefined;
  isLoading: boolean;
  queryResult: T | undefined;
  render: (props: { queryResult: T }) => JSX.Element;
}

export const LoadingErrorOrRenderQuery = <T,>({
  error,
  isLoading,
  queryResult,
  render,
}: React.PropsWithChildren<Props<T>>) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (error || !queryResult) {
    // @TODO replace with centralized logging
    console.error('error', error);
    return null;
  }

  return render({
    queryResult,
  });
};
