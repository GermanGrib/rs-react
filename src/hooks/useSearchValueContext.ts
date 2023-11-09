import { useContext } from 'react';

import {
  SearchState,
  SearchValueAction,
  SearchValueContext,
} from '../context/SearchValueProvider';

function useSearchValueContext(): {
  state: SearchState;
  dispatch: React.Dispatch<SearchValueAction<unknown>>;
} {
  const context = useContext(SearchValueContext);
  if (context === undefined) {
    throw new Error(
      'useSearchContext must be used within a SearchContextProvider'
    );
  }
  return context;
}

export default useSearchValueContext;
