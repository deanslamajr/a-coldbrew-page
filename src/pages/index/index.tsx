import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import getConfig from 'next/config';
import moment from 'moment';
import shortid from 'shortid';
import { RiAddLine, RiCalendarLine } from 'react-icons/ri';

import {
  ChoreButton,
  FlexContainer,
  FloatingMenu,
  Modal,
  ModalOverlay,
} from '../../components/styles/index.styles';
import { NavButton, NavButtonPositions } from '../../components/NavButton';
import {
  ChoreForm,
  ChoreFormValuesInterface,
} from '../../components/ChoreForm';

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

interface CreateChoreModalProps {
  handleHideCreateChoreModal: () => void;
  handleSubmit: (values: ChoreFormValuesInterface) => void;
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

const CreateChoreModal: React.FC<CreateChoreModalProps> = ({
  handleHideCreateChoreModal,
  handleSubmit,
}) => {
  return (
    <ModalOverlay>
      <Modal>
        <ChoreForm
          handleHideCreateChoreModal={handleHideCreateChoreModal}
          handleSubmit={handleSubmit}
        />
      </Modal>
    </ModalOverlay>
  );
};

const Home: NextPage = () => {
  //const { data, loading, error } = useFetchHomeQuery();
  const [chores, setChores] = useState(mockedChores);
  const [showCreateChoreModal, setShowCreateChoreModal] = useState(false);

  const markTaskCompleted = (id: string): void => {
    const choresClone = [...chores];
    const index = choresClone.findIndex(chore => chore.id === id);
    if (index > -1) {
      choresClone.splice(index, 1);
    }
    setChores(choresClone);
  };

  const toggleChoreModal = (show = !showCreateChoreModal): void => {
    setShowCreateChoreModal(show);
  };

  const showShowUpcomingChores = (): void => {
    console.log('show upcoming chores clicked!');
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
      {!showCreateChoreModal && (
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
      {/* <NavButton
          position={NavButtonPositions.BottomLeft}
          clickHandler={() => showShowUpcomingChores()}
          icon={
            <RiCalendarLine
              color={theme.colors.blue}
              size={theme.sizes.navbarButtonIconSize}
            />
          }
        /> */}
      {showCreateChoreModal && (
        <CreateChoreModal
          handleHideCreateChoreModal={() => toggleChoreModal(false)}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default withApollo(Home);
