/* eslint-disable jsx-a11y/anchor-is-valid */
import { LoadingErrorOrRender } from './LoadingErrorOrRender';
import { FiCheckCircle } from 'react-icons/fi';

import { cssTheme } from '../helpers/constants';

import { useLogoutAccountMutation } from '../graphql-client/mutations/logoutAccount.graphql';

interface Props {
  loggedInAccountEmail: string;
  onLogout: () => Promise<any>;
}

export const AccountDetails: React.FC<Props> = ({
  loggedInAccountEmail,
  onLogout,
}) => {
  const [logoutAccount, { data, loading, error }] = useLogoutAccountMutation();

  const logout = async () => {
    await logoutAccount();
    onLogout();
  };

  return (
    <>
      <LoadingErrorOrRender
        error={error}
        isLoading={loading}
        isSuccess={data?.logoutAccount.wasLogoutSuccess}
        renderOnSuccess={
          <FiCheckCircle
            color={cssTheme.colors.green}
            size={cssTheme.sizes.errorIcon}
          />
        }>
        <>
          <div>Logged in as:{loggedInAccountEmail}</div>
          <button onClick={logout}>Logout</button>
        </>
      </LoadingErrorOrRender>
    </>
  );
};
