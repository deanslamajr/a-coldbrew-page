import React, { useEffect, useState } from 'react';
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
import { Spinner } from '../../components/Spinner';

import {
  getChores as getChoresFromClientCache,
  setChores as updateChoresOnClientCache,
} from '../../helpers/clientCache';

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
  const [chores, setChores] = useState<ChoreInterface[] | null>(null);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showCreateChoreModal, setShowCreateChoreModal] = useState(false);
  const [selectedChore, setSelectedChore] = useState<ChoreInterface | null>(
    null
  );

  // Rehydrate / Initialize Chores
  useEffect(() => {
    const hydratedChores = getChoresFromClientCache();
    setChores(hydratedChores);
  }, []);

  const markTaskCompleted = (id: string): void => {
    const newChoresPayload = [...(chores as ChoreInterface[])];
    const index = newChoresPayload.findIndex(chore => chore.id === id);
    if (index > -1) {
      newChoresPayload.splice(index, 1);
    }
    setChores(newChoresPayload);
    updateChoresOnClientCache(newChoresPayload);
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

    const newChoresPayload = [...(chores as ChoreInterface[]), newChore];

    setChores(newChoresPayload);
    updateChoresOnClientCache(newChoresPayload);
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
        {chores ? (
          chores.map((chore: ChoreInterface) => (
            <Chore
              key={chore.id}
              clickHandler={() => toggleChoreDetailModal(chore)}
              dueDate={chore.due}
              name={chore.name}
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
