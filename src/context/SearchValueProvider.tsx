import React, {
  ReactElement,
  ReactNode,
  createContext,
  useReducer,
} from 'react';

const initialState: SearchState = { searchValue: '' };

export interface SearchState {
  searchValue: string;
}

export interface SearchValueAction<T> {
  type: string;
  payload: T;
}

interface SearchContextProviderProps {
  children: ReactNode;
}

export const SearchValueContext = createContext<
  | {
      state: SearchState;
      dispatch: React.Dispatch<SearchValueAction<unknown>>;
    }
  | undefined
>(undefined);
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';

function searchReducer(
  state: SearchState,
  action: SearchValueAction<unknown>
): SearchState {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      if (typeof action.payload === 'string') {
        return {
          ...state,
          searchValue: action.payload,
        };
      }
      return state;
    default:
      return state;
  }
}

export function SearchContextProvider({
  children,
}: SearchContextProviderProps): ReactElement {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchValueContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchValueContext.Provider>
  );
}
