import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import getConfig from 'next/config';
import moment from 'moment';
import shortid from 'shortid';
import { RiAddLine } from 'react-icons/ri';
import { IoMdSearch } from 'react-icons/io';

import {
  ChoreButton,
  ChoreButtonDueDate,
  FlexContainer,
} from '../../components/styles/index.styles';
import { NavButton, NavButtonPositions } from '../../components/NavButton';
import {
  CreateChoreModal,
  ChoreFormValuesInterface,
} from '../../components/CreateChoreModal';
import { FiltersModal } from '../../components/FiltersModal';
import { ChoreDetailsModal } from '../../components/ChoreDetailsModal';

import { theme } from '../../theme';

import { ChoreInterface } from '../../types';

import { withApollo } from '../../graphql/with-apollo';
// import { useFetchHomeQuery } from '../../graphql/queries/fetchHome.graphql';

interface ChoreProps {
  dueDate: Date;
  name: string;
  clickHandler: () => void;
}

export enum DueStatusEnum {
  OverDue = 'OVER_DUE',
  DueToday = 'DUE_TODAY',
  NotYetDue = 'NOT_YET_DUE',
}

const { publicRuntimeConfig } = getConfig();

const getDateForYesterday = (): Date => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

const mockedChores: ChoreInterface[] = [
  // Over due
  {
    id: shortid.generate(),
    name: 'Sweep them floors',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: getDateForYesterday(),
  },
  {
    id: shortid.generate(),
    name: 'Wash the doge',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: getDateForYesterday(),
  },
  // Due today
  {
    id: shortid.generate(),
    name: 'Mop those flos',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: new Date(),
  },
  {
    id: shortid.generate(),
    name: 'Teach that pup "high 5" trick',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: new Date(),
  },
];

const Chore: React.FunctionComponent<ChoreProps> = ({
  clickHandler,
  dueDate,
  name,
}) => {
  const todayMoment = moment();
  const dueDateMoment = moment(dueDate);

  const getDueStatus = (): DueStatusEnum => {
    if (todayMoment.isSame(dueDateMoment, 'day')) {
      return DueStatusEnum.DueToday;
    } else if (todayMoment.isAfter(dueDateMoment, 'minute')) {
      return DueStatusEnum.OverDue;
    } else {
      return DueStatusEnum.NotYetDue;
    }
  };

  const computeOverdueText = (): string => {
    const days = todayMoment.diff(dueDateMoment, 'days');
    return days ? `(${days} day${days > 1 ? 's' : ''})` : '(today)';
  };

  return (
    <ChoreButton dueStatus={getDueStatus()} onClick={clickHandler}>
      {name}
      <br />
      <ChoreButtonDueDate>{computeOverdueText()}</ChoreButtonDueDate>
    </ChoreButton>
  );
};

const Home: NextPage = () => {
  //const { data, loading, error } = useFetchHomeQuery();
  const [chores, setChores] = useState(mockedChores);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showCreateChoreModal, setShowCreateChoreModal] = useState(false);
  const [selectedChore, setSelectedChore] = useState<ChoreInterface | null>(
    null
  );

  const markTaskCompleted = (id: string): void => {
    const choresClone = [...chores];
    const index = choresClone.findIndex(chore => chore.id === id);
    if (index > -1) {
      choresClone.splice(index, 1);
    }
    setChores(choresClone);
  };

  const toggleFiltersModal = (show = !showFiltersModal): void => {
    setShowFiltersModal(show);
  };

  const toggleChoreModal = (show = !showCreateChoreModal): void => {
    setShowCreateChoreModal(show);
  };

  const toggleChoreDetailModal = (
    selectedChore: ChoreInterface | null
  ): void => {
    setSelectedChore(selectedChore);
  };

  const handleSubmit = (values: ChoreFormValuesInterface) => {
    const newChore: ChoreInterface = {
      id: shortid.generate(),
      name: values.summary,
      description: values.description,
      due: values.dueDate,
    };

    setChores([...chores, newChore]);
    setShowCreateChoreModal(false);
  };

  const handleCompleteChore = (): void => {
    if (selectedChore) {
      markTaskCompleted(selectedChore.id);
      toggleChoreDetailModal(null);
    }
  };

  const showMainNavButtons = (): boolean =>
    !showCreateChoreModal && !showFiltersModal && !selectedChore;

  return (
    <>
      <Head>
        <title>{publicRuntimeConfig.APP_TITLE}</title>
      </Head>
      <FlexContainer>
        {chores &&
          chores.map((chore: ChoreInterface) => (
            <Chore
              key={chore.id}
              clickHandler={() => toggleChoreDetailModal(chore)}
              dueDate={chore.due}
              name={chore.name}
            />
          ))}
      </FlexContainer>
      {showMainNavButtons() && (
        <NavButton
          position={NavButtonPositions.BottomRight}
          clickHandler={() => toggleChoreModal(true)}
          icon={
            <RiAddLine
              color={theme.colors.green}
              size={theme.sizes.navbarButtonIconSize}
            />
          }
        />
      )}
      {showMainNavButtons() && (
        <NavButton
          position={NavButtonPositions.BottomLeft}
          clickHandler={() => toggleFiltersModal(true)}
          icon={
            <IoMdSearch
              color={theme.colors.blue}
              size={theme.sizes.navbarButtonIconSize}
            />
          }
        />
      )}
      {showCreateChoreModal && (
        <CreateChoreModal
          handleHideCreateChoreModal={() => toggleChoreModal(false)}
          handleSubmit={handleSubmit}
        />
      )}
      {showFiltersModal && (
        <FiltersModal closeFiltersModal={() => toggleFiltersModal(false)} />
      )}
      {selectedChore && (
        <ChoreDetailsModal
          chore={selectedChore}
          handleHide={() => toggleChoreDetailModal(null)}
          handleCompleteChore={handleCompleteChore}
        />
      )}
    </>
  );
};

export default withApollo(Home);
