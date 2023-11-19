import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { QueryPokemonOptions } from '../../types/interface';
import { PokemonResponses } from '../types/interface';
import { POKEMON_URL } from '../variables';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: POKEMON_URL }),
  endpoints: (builder) => ({
    getPokemons: builder.query<PokemonResponses, QueryPokemonOptions>({
      query: (args: QueryPokemonOptions) => ({
        url: `/${args.name ? args.name : ''}`,
        params: args.query,
      }),
    }),
    getEachPokemon: builder.query<PokemonResponses, QueryPokemonOptions>({
      query: (args: QueryPokemonOptions) => ({
        url: `/${args.name ? args.name : ''}`,
        params: args.query,
      }),
    }),
  }),
});

export const { useGetPokemonsQuery } = pokemonApi;
