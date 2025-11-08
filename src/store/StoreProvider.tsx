import {
  createContext,
  type FunctionComponent,
  useContext,
  type ProviderProps,
} from 'react';
import { observer } from 'mobx-react-lite';
import Store from './store.ts';

const StoreContext = createContext<Store | null>(null);

export const StoreProvider: FunctionComponent<ProviderProps<Store>> = observer(
  ({ children, value }) => {
    return (
      <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    );
  },
);

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store)
    throw new Error('Root component is not wrapped with StoreProvider');
  return store;
};
