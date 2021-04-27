import React, { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';

import { FlexContainer } from './styles/index.styles';
import { NavButton, NavButtonPositions } from './NavButton';
import { CreateChoreModal } from './CreateChoreModal';
import { ChoreDetailsModal } from './ChoreDetailsModal';
import { Spinner } from './Spinner';
import { Chore } from './Chore';

import { useChores } from '../hooks/useChores';

import { cssTheme } from '../helpers/constants';

import { ChoreInterface } from '../types';

export type HomeProps = {
  onNavigateToAccountPage: () => void;
};

export const Home: React.FC<HomeProps> = ({ onNavigateToAccountPage }) => {
  const { chores } = useChores({
    fetchPolicy: 'network-only',
  });

  const [showCreateChoreModal, setShowCreateChoreModal] = useState(false);
  const [showChoreDetailModal, setShowChoreDetailModal] = useState(false);
  const [selectedChore, setSelectedChore] = useState<ChoreInterface | null>(
    null
  );

  const showMainNavButtons = !showCreateChoreModal && !showChoreDetailModal;

  return (
    <>
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
          clickHandler={onNavigateToAccountPage}
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
