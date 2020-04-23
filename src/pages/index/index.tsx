import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import getConfig from 'next/config';

import { ChoreButton, FlexContainer } from '../../components/styles/index.styles';

import { withApollo } from '../../graphql/with-apollo';
import { useFetchHomeQuery } from '../../graphql/queries/fetchHome.graphql';

const { publicRuntimeConfig } = getConfig();

const mockedChores: ChoreInterface[] = [
  {
    id: '1234',
    name: 'Sweep them floors',
  },
  {
    id: '5678',
    name: 'Mop those floors',
  },
  {
    id: '9843',
    name: 'Wash the doge',
  },
];

interface ChoreInterface {
  id: string;
  name: string;
}

interface ChoreProps {
  name: string;
  clickHandler: () => void;
}

const Chore: React.FunctionComponent<ChoreProps> = ({ clickHandler, name }) => {
  return <ChoreButton onClick={clickHandler}>{name}</ChoreButton>;
}

const Home: NextPage = () => {
  const [chores, setChores] = useState(mockedChores);

  //const { data, loading, error } = useFetchHomeQuery();

  const markTaskCompleted = (id: string): void => {
    const choresClone = [...chores];
    const index = choresClone.findIndex(chore => chore.id === id);
    if (index > -1) {
      choresClone.splice(index, 1);
    }
    setChores(choresClone);
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
              name={chore.name}
            />
          ))}
      </FlexContainer>
    </>
  );
};

export default withApollo(Home);
