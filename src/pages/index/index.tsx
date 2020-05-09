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

interface StatusInterface {
  dueDifferenceCopy: string;
  status: DueStatusEnum;
}

export enum DueStatusEnum {
  OverDue = 'OVER_DUE',
  DueToday = 'DUE_TODAY',
  NotYetDue = 'NOT_YET_DUE',
}

const { publicRuntimeConfig } = getConfig();

const getDateForDaysAgo = (daysOverDue: number): Date => {
  const now = new Date();
  now.setDate(now.getDate() - daysOverDue);
  return now;
};

const getDateForHoursAgo = (hoursOverDue: number): Date => {
  const now = new Date();
  now.setHours(now.getHours() - hoursOverDue);
  return now;
};

const mockedChores: ChoreInterface[] = [
  // Over due
  {
    id: shortid.generate(),
    name: 'Sweep them floors',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: getDateForDaysAgo(1),
  },
  {
    id: shortid.generate(),
    name: 'Wash the doge',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: getDateForDaysAgo(7),
  },
  // Due today
  {
    id: shortid.generate(),
    name: 'Mop those flos',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: getDateForHoursAgo(1),
  },
  {
    id: shortid.generate(),
    name: 'Teach that pup "high 5" trick',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: getDateForHoursAgo(10),
  },
  // Not yet due
  {
    id: shortid.generate(),
    name: 'Listen to new NoDoubt record',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: getDateForDaysAgo(-5),
  },
  {
    id: shortid.generate(),
    name: 'Touch up the pots',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: getDateForHoursAgo(-10),
  },
];

const Chore: React.FunctionComponent<ChoreProps> = ({
  clickHandler,
  dueDate,
  name,
}) => {
  const todayMoment = moment();
  const dueDateMoment = moment(dueDate);

  const computeStatus = (): StatusInterface => {
    // chore not yet due
    if (todayMoment.isBefore(dueDateMoment)) {
      const daysUntilDue = dueDateMoment.diff(todayMoment, 'days');
      const hoursUntilDue = dueDateMoment.diff(todayMoment, 'hours');
      const minutesUntilDue = dueDateMoment.diff(todayMoment, 'minutes');

      const dueInCopy = 'Due in';

      if (daysUntilDue >= 1 && hoursUntilDue >= 24) {
        const daysCopy = daysUntilDue > 1 ? 'days' : 'day';
        return {
          status: DueStatusEnum.NotYetDue,
          dueDifferenceCopy: `(${dueInCopy} ${daysUntilDue} ${daysCopy})`,
        };
      }

      if (hoursUntilDue > 1 && minutesUntilDue >= 60) {
        const hoursCopy = hoursUntilDue > 1 ? 'hours' : 'hour';
        return {
          status: DueStatusEnum.NotYetDue,
          dueDifferenceCopy: `(${dueInCopy} ${hoursUntilDue} ${hoursCopy})`,
        };
      }

      const dueDifferenceCopy =
        minutesUntilDue > 1
          ? `(${dueInCopy} ${minutesUntilDue} minutes)`
          : `(${dueInCopy} seconds...)`;

      return {
        status: DueStatusEnum.NotYetDue,
        dueDifferenceCopy,
      };
    } else {
      const overdueCopy = 'overdue';
      const daysOverdue = todayMoment.diff(dueDateMoment, 'days');
      const hoursOverdue = todayMoment.diff(dueDateMoment, 'hours');
      const minutesOverdue = todayMoment.diff(dueDateMoment, 'minutes');

      if (daysOverdue >= 1 && hoursOverdue >= 24) {
        const daysCopy = daysOverdue > 1 ? 'days' : 'day';
        return {
          status: DueStatusEnum.OverDue,
          dueDifferenceCopy: `(${daysOverdue} ${daysCopy} ${overdueCopy})`,
        };
      }

      if (hoursOverdue > 1 && minutesOverdue >= 60) {
        const hoursCopy = hoursOverdue > 1 ? 'hours' : 'hour';
        return {
          status: DueStatusEnum.DueToday,
          dueDifferenceCopy: `(${hoursOverdue} ${hoursCopy} ${overdueCopy})`,
        };
      }

      const dueDifferenceCopy =
        minutesOverdue > 1
          ? `(${minutesOverdue} minutes ${overdueCopy})`
          : `(${overdueCopy})`;

      return {
        status: DueStatusEnum.DueToday,
        dueDifferenceCopy,
      };
    }
  };

  const { status, dueDifferenceCopy } = computeStatus();

  return (
    <ChoreButton dueStatus={status} onClick={clickHandler}>
      {name}
      <br />
      <ChoreButtonDueDate>{dueDifferenceCopy}</ChoreButtonDueDate>
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
