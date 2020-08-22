import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { RiAddLine } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';

import {
  ChoreButton,
  ChoreButtonDueDate,
  FlexContainer,
} from '../../components/styles/index.styles';
import { NavButton, NavButtonPositions } from '../../components/NavButton';
import { CreateChoreModal } from '../../components/CreateChoreModal';
import { ChoreDetailsModal } from '../../components/ChoreDetailsModal';
import { Spinner } from '../../components/Spinner';

import { useChores } from '../../hooks/useChores';

import { computeStatus } from '../../helpers/dueDates';
import { cssTheme } from '../../helpers/constants';

import { ChoreInterface, DueDateInterface } from '../../types';

import { withApollo } from '../../graphql-client/with-apollo';

interface ChoreProps {
  dueDate: DueDateInterface;
  name: string;
  clickHandler: () => void;
}

const { publicRuntimeConfig } = getConfig();

export const Chore: React.FC<ChoreProps> = ({
  clickHandler,
  dueDate,
  name,
}) => {
  const { status, dueDifferenceCopy } = computeStatus(dueDate);

  return (
    <ChoreButton dueStatus={status} onClick={clickHandler}>
      {name}
      <br />
      <ChoreButtonDueDate>{dueDifferenceCopy}</ChoreButtonDueDate>
    </ChoreButton>
  );
};

const Home: NextPage = () => {
  const { chores } = useChores({
    fetchPolicy: 'network-only',
  });
  const [showCreateChoreModal, setShowCreateChoreModal] = useState(false);
  const [selectedChore, setSelectedChore] = useState<ChoreInterface | null>(
    null
  );

  const router = useRouter();
  // setChoressetChores
  const toggleChoreModal = (show = !showCreateChoreModal): void => {
    setShowCreateChoreModal(show);
  };

  const toggleChoreDetailModal = (
    selectedChore: ChoreInterface | null
  ): void => {
    setSelectedChore(selectedChore);
  };

  const showMainNavButtons = (): boolean =>
    !showCreateChoreModal && !selectedChore;

  return (
    <>
      <Head>
        <title>{publicRuntimeConfig.APP_TITLE}</title>
      </Head>
      <FlexContainer>
        {chores ? (
          chores.map((chore: ChoreInterface) => (
            <Chore
              key={chore.id}
              clickHandler={() => toggleChoreDetailModal(chore)}
              dueDate={chore.dueDate}
              name={chore.summary}
            />
          ))
        ) : (
          <Spinner />
        )}
      </FlexContainer>
      {showMainNavButtons() && (
        <NavButton
          position={NavButtonPositions.BottomRight}
          clickHandler={() => toggleChoreModal(true)}
          icon={
            <RiAddLine
              color={cssTheme.colors.green}
              size={cssTheme.sizes.navbarButtonIconSize}
            />
          }
        />
      )}
      {showMainNavButtons() && (
        <NavButton
          position={NavButtonPositions.BottomLeft}
          clickHandler={() => router.push('/a/login')}
          icon={
            <FaUser
              color={cssTheme.colors.blue}
              size={cssTheme.sizes.navbarButtonIconSize}
            />
          }
        />
      )}
      {showCreateChoreModal && (
        <CreateChoreModal
          handleHideCreateChoreModal={() => toggleChoreModal(false)}
        />
      )}
      {selectedChore && (
        <ChoreDetailsModal
          chore={selectedChore}
          handleHide={() => toggleChoreDetailModal(null)}
        />
      )}
    </>
  );
};

export default withApollo(Home);
