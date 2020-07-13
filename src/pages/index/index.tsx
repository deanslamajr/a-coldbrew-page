import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import shortid from 'shortid';
import { RiAddLine } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';

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
import { ChoreDetailsModal } from '../../components/ChoreDetailsModal';
import { Spinner } from '../../components/Spinner';

import {
  getChores as getChoresFromClientCache,
  setChores as updateChoresOnClientCache,
} from '../../helpers/clientCache';
import {
  DurationTypes,
  getDiffFromNow,
  sortDueDatesFn,
  isDue,
  transformDateToDueDate,
} from '../../helpers/dueDates';
import { choreVersion, cssTheme } from '../../helpers/constants';

import { ChoreInterface, DueDateInterface } from '../../types';

import { withApollo } from '../../graphql-client/with-apollo';

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

    let typeCopy: string;

    switch (overdueData.type) {
      case DurationTypes.Year:
        typeCopy = Math.abs(overdueData.amount) > 1 ? 'years' : 'year';
        break;
      case DurationTypes.Month:
        typeCopy = Math.abs(overdueData.amount) > 1 ? 'months' : 'month';
        break;
      case DurationTypes.Day:
        typeCopy = 'days';
        break;
    }

    if (isDue(dueDate)) {
      if (overdueData.amount) {
        if (
          overdueData.amount === -1 &&
          overdueData.type === DurationTypes.Day
        ) {
          return {
            status: DueStatusEnum.OverDue,
            dueDifferenceCopy: '(due yesterday)',
          };
        }

        return {
          status: DueStatusEnum.OverDue,
          dueDifferenceCopy: `(due ${Math.abs(
            overdueData.amount
          )} ${typeCopy} ago)`,
        };
      } else {
        return {
          status: DueStatusEnum.DueToday,
          dueDifferenceCopy: '(due today)',
        };
      }
    } else {
      if (overdueData.amount === 1 && overdueData.type === DurationTypes.Day) {
        return {
          status: DueStatusEnum.NotYetDue,
          dueDifferenceCopy: '(due tomorrow)',
        };
      }

      return {
        status: DueStatusEnum.NotYetDue,
        dueDifferenceCopy: `(due in ${Math.abs(
          overdueData.amount
        )} ${typeCopy})`,
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
    return sortDueDatesFn(a, b);
  });
};

const Home: NextPage = () => {
  const [chores, setChores] = useState<ChoreInterface[] | null>(null);
  const [showCreateChoreModal, setShowCreateChoreModal] = useState(false);
  const [selectedChore, setSelectedChore] = useState<ChoreInterface | null>(
    null
  );

  const router = useRouter();

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
          handleSubmit={handleSubmit}
        />
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
