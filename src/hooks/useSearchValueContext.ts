import { useContext } from 'react';

import {
  SearchContext,
  SearchState,
  SearchValueAction,
} from '../context/SearchValueProvider';

function useSearchValueContext(): {
  state: SearchState;
  dispatch: React.Dispatch<SearchValueAction<unknown>>;
} {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error(
      'useSearchContext must be used within a SearchContextProvider'
    );
  }
  return context;
}

export default useSearchValueContext;
