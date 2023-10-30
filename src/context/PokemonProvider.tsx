import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { loadData } from '../Utils';
import { ICardProps } from '../types/interface';
import CurrentPageContext from './PagesProvider';

interface PokemonContext {
  pokemonData: ICardProps[] | [];
  setPokemonData: Dispatch<SetStateAction<ICardProps[] | []>>;
  isPokemonLoading: boolean;
  setIsPokemonLoading: Dispatch<SetStateAction<boolean>>;
}

const initialValue: PokemonContext = {
  pokemonData: [],
  setPokemonData: () => {},
  isPokemonLoading: true,
  setIsPokemonLoading: () => {},
};

const PokemonDataContext = createContext<PokemonContext>(initialValue);

interface PokemonProviderProps {
  children: ReactNode;
}

export function PokemonProvider({
  children,
}: PokemonProviderProps): ReactElement {
  const { currentPage } = useContext(CurrentPageContext);
  const [pokemonData, setPokemonData] = useState<ICardProps[] | []>([]);
  const [isPokemonLoading, setIsPokemonLoading] = useState(true);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const response = await loadData({ pageNumber: currentPage });
        setPokemonData(response);
        setIsPokemonLoading(false);
      } catch (error) {
        console.error('Error during fetch:', error);
        setIsPokemonLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <PokemonDataContext.Provider
      value={{
        pokemonData,
        setPokemonData,
        isPokemonLoading,
        setIsPokemonLoading,
      }}
    >
      {children}
    </PokemonDataContext.Provider>
  );
}

export default PokemonDataContext;
