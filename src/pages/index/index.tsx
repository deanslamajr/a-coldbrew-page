import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import getConfig from 'next/config';
import { DateSingleInput, OnDateChangeProps } from '@datepicker-react/styled';
import moment from 'moment';
import shortid from 'shortid';

import {
  ChoreButton,
  FlexContainer,
  FloatingMenu,
  ModalOverlay,
} from '../../components/styles/index.styles';

import { withApollo } from '../../graphql/with-apollo';
// import { useFetchHomeQuery } from '../../graphql/queries/fetchHome.graphql';

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
    name: 'Mop those floors',
    due: new Date(),
  },
  {
    id: shortid.generate(),
    name: 'Teach that pup "high 5" trick',
    due: new Date(),
  },
];

interface ChoreInterface {
  id: string;
  name: string;
  due: Date;
}

interface ChoreProps {
  dueDate?: Date;
  name: string;
  clickHandler: () => void;
}

interface DatePickerModalProps {
  onHideDatePicker: () => void;
}

export enum DueStatusEnum {
  OverDue = 'OVER_DUE',
  DueToday = 'DUE_TODAY',
  NotYetDue = 'NOT_YET_DUE',
}

const Chore: React.FunctionComponent<ChoreProps> = ({
  clickHandler,
  dueDate,
  name,
}) => {
  const getDueStatus = (dueDate?: Date): DueStatusEnum | null => {
    // remove this case after proper navbar has been implemented
    // and Chore components are no longer abused for navbar purposes!
    if (!dueDate) {
      return null;
    }

    const todayMoment = moment();
    const dueDateMoment = moment(dueDate);

    if (todayMoment.isSame(dueDateMoment, 'day')) {
      return DueStatusEnum.DueToday;
    } else if (todayMoment.isAfter(dueDateMoment, 'day')) {
      return DueStatusEnum.OverDue;
    } else {
      return DueStatusEnum.NotYetDue;
    }
  };
  return (
    <ChoreButton dueStatus={getDueStatus(dueDate)} onClick={clickHandler}>
      {name}
    </ChoreButton>
  );
};

const DatePickerModal: React.FunctionComponent<DatePickerModalProps> = ({
  onHideDatePicker,
}) => {
  const [choreDate, setChoreDate] = useState(new Date());
  const handleDateChange = (data: OnDateChangeProps) => {
    setChoreDate(data.date || new Date());
  };

  return (
    <ModalOverlay>
      {/* Add a fullscreen trasparent mask to block interactions with the main view */}

      <DateSingleInput
        onDateChange={handleDateChange}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onFocusChange={() => {}}
        onClose={onHideDatePicker}
        date={choreDate}
        showDatepicker={true}
        showCalendarIcon={false}
      />
      {/* Also need a dropdown input that can select a recurring  */}
      {/* None, daily, weekly, monthly, yearly */}
      {/* every setting but 'None' should create an additional input defaulted to 1 */}
      {/* but can set higher numbers e.g. every 1 day OR 2 days OR 3 days etc.*/}

      {/* CREATE BUTTON */}
    </ModalOverlay>
  );
};

const Home: NextPage = () => {
  const [chores, setChores] = useState(mockedChores);
  const [showDatePicker, setShowDatePicker] = useState(false);

  //const { data, loading, error } = useFetchHomeQuery();

  const markTaskCompleted = (id: string): void => {
    const choresClone = [...chores];
    const index = choresClone.findIndex(chore => chore.id === id);
    if (index > -1) {
      choresClone.splice(index, 1);
    }
    setChores(choresClone);
  };

  const toggleChoreModal = (show = !showDatePicker): void => {
    setShowDatePicker(show);
  };

  const showShowUpcomingChores = (): void => {
    console.log('show upcoming chores clicked!');
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
      <FloatingMenu>
        <Chore
          clickHandler={() => toggleChoreModal(true)}
          name="Add New Chore"
        />
        <Chore
          clickHandler={() => showShowUpcomingChores()}
          name="Show Upcoming Chores"
        />
      </FloatingMenu>
      {showDatePicker && (
        <DatePickerModal onHideDatePicker={() => toggleChoreModal(false)} />
      )}
    </>
  );
};

export default withApollo(Home);
