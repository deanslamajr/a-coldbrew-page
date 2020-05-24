import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import getConfig from 'next/config';
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
import {
  getDiffFromNow,
  isBefore,
  isDue,
  transformDateToDueDate,
} from '../../helpers/dueDates';
import { choreVersion, cssTheme } from '../../helpers/constants';

import { ChoreInterface, DueDateInterface } from '../../types';

import { withApollo } from '../../graphql/with-apollo';
// import { useFetchHomeQuery } from '../../graphql/queries/fetchHome.graphql';

interface ChoreProps {
  dueDate: DueDateInterface;
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

export const Chore: React.FC<ChoreProps> = ({
  clickHandler,
  dueDate,
  name,
}) => {
  const computeStatus = (): StatusInterface => {
    const overdueData = getDiffFromNow(dueDate);
    console.log('overdueData', overdueData);

    if (isDue(dueDate)) {
      let overDueCount =
        overdueData.years || overdueData.months || overdueData.days;
      if (overDueCount) {
        overDueCount = overDueCount * -1;
      }

      if (overDueCount) {
        const typeCopy = overdueData.years
          ? overdueData.years < 1
            ? 'years'
            : 'year'
          : overdueData.months
          ? overdueData.months < 1
            ? 'months'
            : 'month'
          : overdueData.days && overdueData.days < 1
          ? 'days'
          : 'day';

        return {
          status: DueStatusEnum.OverDue,
          dueDifferenceCopy: `(${overDueCount} ${typeCopy} overdue)`,
        };
      } else {
        return {
          status: DueStatusEnum.DueToday,
          dueDifferenceCopy: 'Due Today',
        };
      }
    } else {
      const dueInCount =
        overdueData.years || overdueData.months || overdueData.days;

      const typeCopy = overdueData.years
        ? overdueData.years > 1
          ? 'years'
          : 'year'
        : overdueData.months
        ? overdueData.months > 1
          ? 'months'
          : 'month'
        : overdueData.days && overdueData.days > 1
        ? 'days'
        : 'day';

      return {
        status: DueStatusEnum.NotYetDue,
        dueDifferenceCopy: `(Due in ${dueInCount} ${typeCopy})`,
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

const sortChores = (chores: ChoreInterface[]): ChoreInterface[] => {
  return chores.slice().sort(({ due: a }, { due: b }) => {
    return isBefore(a, b) ? 1 : 0;
  });
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
    const sortedChores = sortChores(hydratedChores);
    setChores(sortedChores);
  }, []);

  const markTaskCompleted = (id: string): void => {
    const newChoresPayload = [...(chores as ChoreInterface[])];
    const index = newChoresPayload.findIndex(chore => chore.id === id);
    if (index > -1) {
      newChoresPayload.splice(index, 1);
    }
    const sortedChores = sortChores(newChoresPayload);
    setChores(sortedChores);
    updateChoresOnClientCache(sortedChores);
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
      due: transformDateToDueDate(values.dueDate),
      version: choreVersion,
    };

    const newChoresPayload = [...(chores as ChoreInterface[]), newChore];

    const sortedChores = sortChores(newChoresPayload);
    setChores(sortedChores);
    updateChoresOnClientCache(sortedChores);
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
              color={cssTheme.colors.green}
              size={cssTheme.sizes.navbarButtonIconSize}
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
              color={cssTheme.colors.blue}
              size={cssTheme.sizes.navbarButtonIconSize}
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
