import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CardProps, DetailedCardProps } from '../../types/interface';

type PokemonDataItem = CardProps[] | DetailedCardProps[];

interface PokemonDataState {
  pokemonData: PokemonDataItem;
}

const pokemonDataSlice = createSlice({
  name: 'pokemonData',
  initialState: {
    pokemonData: [] as PokemonDataItem,
  } as PokemonDataState,
  reducers: {
    setPokemonData(state, action: PayloadAction<PokemonDataItem | []>) {
      state.pokemonData = action.payload || [];
    },
  },
});

export const { setPokemonData } = pokemonDataSlice.actions;
export default pokemonDataSlice.reducer;
