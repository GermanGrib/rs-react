import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { loadData } from '../Utils';
import { userSearchValue } from '../const';
import { CardProps, QueryOptions } from '../types/interface';

interface PokemonContext {
  pokemonData: CardProps[] | [];
  setPokemonData: Dispatch<SetStateAction<CardProps[] | []>>;
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
  const [pokemonData, setPokemonData] = useState<CardProps[] | []>([]);
  const [isPokemonLoading, setIsPokemonLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchValue = localStorage.getItem(userSearchValue) || undefined;

  let options: QueryOptions | undefined = {
    itemsLimit: searchParams.get('limit'),
    offset: searchParams.get('offset'),
  };
  options =
    options.itemsLimit !== null && options.offset !== null
      ? options
      : undefined;
  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const response = await loadData({
          offset: 0,
          options: options,
          searchValue: searchValue,
        });
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
