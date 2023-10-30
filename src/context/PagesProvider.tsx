import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

interface CurrentPageContext {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const initialValue: CurrentPageContext = {
  currentPage: 1,
  setCurrentPage: () => {},
};
const CurrentPageContext = createContext<CurrentPageContext>(initialValue);

interface CurrentPageProviderProps {
  children: ReactNode;
}

export function CurrentPageProvider({
  children,
}: CurrentPageProviderProps): ReactElement {
  const [currentPage, setCurrentPage] = useState<number>(
    initialValue.currentPage
  );

  return (
    <CurrentPageContext.Provider
      value={{
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </CurrentPageContext.Provider>
  );
}

export default CurrentPageContext;
