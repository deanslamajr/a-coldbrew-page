import { ReactNode } from 'react';
import { ApolloError } from 'apollo-client';
import { MdError } from 'react-icons/md';

import { Spinner } from './Spinner';

import { cssTheme } from '../helpers/constants';

interface Props {
  error: ApolloError | undefined;
  isLoading: boolean;
  isSuccess?: boolean;
  renderOnSuccess?: ReactNode;
  renderOnFailure?: ReactNode;
}

const Error = () => (
  <MdError color={cssTheme.colors.red} size={cssTheme.sizes.errorIcon} />
);

export const LoadingErrorOrRender: React.FC<Props> = ({
  isSuccess,
  error,
  isLoading,
  children,
  renderOnSuccess,
  renderOnFailure,
}) => {
  if (!children) {
    console.error(
      'Inproper use of LoadingErrorOrRender:\nMust pass a child component.'
    );
    return <Error />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    // @TODO replace with centralized logging
    console.error('error', error);
    return <Error />;
  }

  if (isSuccess === false) {
    return renderOnFailure ? <>{renderOnFailure}</> : <Error />;
  }

  if (isSuccess) {
    return <>{renderOnSuccess || children}</>;
  }

  return <>{children}</>;
};
