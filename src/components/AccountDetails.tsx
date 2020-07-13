/* eslint-disable jsx-a11y/anchor-is-valid */
import { LoadingErrorOrRender } from './LoadingErrorOrRender';
import { GiExitDoor } from 'react-icons/gi';

import { NavButton, NavButtonPositions } from './NavButton';
import { SuccessIconThenAction } from './SuccessIconThenAction';

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

  return (
    <>
      <LoadingErrorOrRender
        error={error}
        isLoading={loading}
        isSuccess={data?.logoutAccount.wasLogoutSuccess}
        renderOnSuccess={
          <SuccessIconThenAction delayedCallback={() => onLogout()} />
        }>
        <>
          <div>Logged in as:{loggedInAccountEmail}</div>
          <NavButton
            position={NavButtonPositions.BottomRight}
            clickHandler={() => logoutAccount()}
            icon={
              <GiExitDoor
                color={cssTheme.colors.red}
                size={cssTheme.sizes.navbarButtonIconSize}
              />
            }
          />
        </>
      </LoadingErrorOrRender>
    </>
  );
};
