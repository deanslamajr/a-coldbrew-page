import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import getConfig from 'next/config';
import moment from 'moment';
import shortid from 'shortid';
import { RiAddLine, RiFilter3Line } from 'react-icons/ri';

import {
  ChoreButton,
  FlexContainer,
} from '../../components/styles/index.styles';
import { NavButton, NavButtonPositions } from '../../components/NavButton';
import {
  CreateChoreModal,
  ChoreFormValuesInterface,
} from '../../components/CreateChoreModal';
import { FiltersModal } from '../../components/FiltersModal';

import { theme } from '../../theme';

import { withApollo } from '../../graphql/with-apollo';
// import { useFetchHomeQuery } from '../../graphql/queries/fetchHome.graphql';

interface ChoreInterface {
  id: string;
  name: string;
  due: Date;
}

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
    due: getDateForYesterday(),
  },
  {
    id: shortid.generate(),
    name: 'Wash the doge',
    due: getDateForYesterday(),
  },
  // Due today
  {
    id: shortid.generate(),
    name: 'Mop those flos',
    due: new Date(),
  },
  {
    id: shortid.generate(),
    name: 'Teach that pup "high 5" trick',
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
    } else if (todayMoment.isAfter(dueDateMoment, 'day')) {
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
      {name} {computeOverdueText()}
    </ChoreButton>
  );
};

const Home: NextPage = () => {
  //const { data, loading, error } = useFetchHomeQuery();
  const [chores, setChores] = useState(mockedChores);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showCreateChoreModal, setShowCreateChoreModal] = useState(false);

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

  const handleSubmit = (values: ChoreFormValuesInterface) => {
    const newChore: ChoreInterface = {
      id: shortid.generate(),
      name: values.summary,
      due: values.dueDate,
      // description: values.description
    };

    setChores([...chores, newChore]);
    setShowCreateChoreModal(false);
  };

  const showMainNavButtons = (): boolean =>
    !showCreateChoreModal && !showFiltersModal;

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
              clickHandler={() => markTaskCompleted(chore.id)}
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
      {/* {showMainNavButtons() && (
        <NavButton
          position={NavButtonPositions.BottomLeft}
          clickHandler={() => toggleFiltersModal(true)}
          icon={
            <RiFilter3Line
              color={theme.colors.blue}
              size={theme.sizes.navbarButtonIconSize}
            />
          }
        />
      )} */}
      {showCreateChoreModal && (
        <CreateChoreModal
          handleHideCreateChoreModal={() => toggleChoreModal(false)}
          handleSubmit={handleSubmit}
        />
      )}
      {showFiltersModal && (
        <FiltersModal closeFiltersModal={() => toggleFiltersModal(false)} />
      )}
    </>
  );
};

export default withApollo(Home);
