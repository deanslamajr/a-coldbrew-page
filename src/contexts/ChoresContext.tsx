// Pattern from https://kentcdodds.com/blog/how-to-use-react-context-effectively
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { ChoreInterface } from '../types';

export type Chores = ChoreInterface[] | null;
type ChoresProviderProps = { children: ReactNode };
type SetChores = Dispatch<SetStateAction<Chores>>;

const ChoresStateContext = createContext<Chores | undefined>(undefined);
const SetChoresContext = createContext<SetChores | undefined>(undefined);

const useChores = (): [Chores, SetChores] => {
  const chores = useContext(ChoresStateContext);
  const setChores = useContext(SetChoresContext);
  if (chores === undefined || !setChores) {
    throw new Error(`useChores must be used within a ChoresProvider`);
  }
  return [chores, setChores];
};

const ChoresProvider = ({ children }: ChoresProviderProps) => {
  const [chores, setChores] = useState<Chores>(null);

  return (
    <ChoresStateContext.Provider value={chores}>
      <SetChoresContext.Provider value={setChores}>
        {children}
      </SetChoresContext.Provider>
    </ChoresStateContext.Provider>
  );
};

export { ChoresProvider, useChores };
