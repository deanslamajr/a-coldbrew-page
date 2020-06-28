import { ApolloError } from 'apollo-client';

import { Spinner } from './Spinner';

interface LoadingErrorOrRenderProps<T> {
  error: ApolloError | undefined;
  isLoading: boolean;
  queryResult: T | undefined;
  render: (props: { queryResult: T }) => JSX.Element;
}

export const LoadingErrorOrRender = <T,>({
  error,
  isLoading,
  queryResult,
  render,
}: React.PropsWithChildren<LoadingErrorOrRenderProps<T>>) => {
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
