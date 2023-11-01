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
import { ICard, QueryOptions } from '../types/interface';

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
  const [pokemonData, setPokemonData] = useState<ICard[] | []>([]);
  const [isPokemonLoading, setIsPokemonLoading] = useState(true);
  const [searchParams] = useSearchParams();
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
