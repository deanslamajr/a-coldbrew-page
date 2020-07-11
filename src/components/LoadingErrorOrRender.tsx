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
}

export const LoadingErrorOrRender: React.FC<Props> = ({
  isSuccess,
  error,
  isLoading,
  children,
  renderOnSuccess,
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    // @TODO replace with centralized logging
    console.error('error', error);
    return (
      <MdError color={cssTheme.colors.red} size={cssTheme.sizes.errorIcon} />
    );
  }

  if (isSuccess === false) {
    return (
      <MdError color={cssTheme.colors.red} size={cssTheme.sizes.errorIcon} />
    );
  }

  if (isSuccess && renderOnSuccess) {
    return <>{renderOnSuccess}</>;
  }

  if (!children) {
    console.error(
      'Inproper use of LoadingErrorOrRender:\nMust pass a child component.'
    );
    return (
      <MdError color={cssTheme.colors.red} size={cssTheme.sizes.errorIcon} />
    );
  }

  return <>{children}</>;
};
