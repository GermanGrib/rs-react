import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

import { loadData } from '../Utils';
import { ICard } from '../types/interface';

interface PokemonContext {
  pokemonData: ICard[] | [];
  setPokemonData: Dispatch<SetStateAction<ICard[] | []>>;
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
  const currentPage = Number(sessionStorage.getItem('currentPage'));
  const [pokemonData, setPokemonData] = useState<ICard[] | []>([]);
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
