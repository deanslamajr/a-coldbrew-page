import React, { useState } from 'react';
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
  const [showChoreDetailModal, setShowChoreDetailModal] = useState(false);
  const [selectedChore, setSelectedChore] = useState<ChoreInterface | null>(
    null
  );
  const router = useRouter();

  const showMainNavButtons = !showCreateChoreModal && !showChoreDetailModal;

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
              clickHandler={() => {
                setSelectedChore(chore);
                setShowChoreDetailModal(true);
              }}
              dueDate={chore.dueDate}
              name={chore.summary}
            />
          ))
        ) : (
          <Spinner />
        )}
      </FlexContainer>
      {showMainNavButtons && (
        <NavButton
          position={NavButtonPositions.BottomRight}
          clickHandler={() => setShowCreateChoreModal(true)}
          icon={
            <RiAddLine
              color={cssTheme.colors.green}
              size={cssTheme.sizes.navbarButtonIconSize}
            />
          }
        />
      )}
      {showMainNavButtons && (
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
      {showChoreDetailModal && (
        <ChoreDetailsModal
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          chore={selectedChore!}
          handleHide={() => {
            setShowChoreDetailModal(false);
            setSelectedChore(null);
          }}
          handleEdit={() => {
            setShowCreateChoreModal(true);
            setShowChoreDetailModal(false);
          }}
        />
      )}
      {showCreateChoreModal && (
        <CreateChoreModal
          chore={selectedChore}
          handleHideCreateChoreModal={() => {
            if (selectedChore) {
              setSelectedChore(null);
            }
            setShowCreateChoreModal(false);
          }}
        />
      )}
    </>
  );
};

export default withApollo(Home);
