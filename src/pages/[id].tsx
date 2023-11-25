import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import React, { ReactElement } from 'react';

import { PokemonResponses } from '../services/types/interface';

interface TestDetailedProps {
  pokemonId: string;
  pokemonData: PokemonResponses | null;
  error?: string;
}

export default function TestDetailed({
  pokemonId,
  pokemonData,
}: TestDetailedProps): ReactElement {
  console.log(pokemonId, 'IDPOKEMONA', pokemonData, 'DATA');
  return <div>LOL?</div>;
}

export const getServerSideProps: GetServerSideProps<TestDetailedProps> = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<TestDetailedProps>> => {
  const pokemonId = context.params?.id as string;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    console.log(response, 'FCK IT');

    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${pokemonId}`);
    }

    const data = await response.json();

    return {
      props: {
        pokemonId,
        pokemonData: data,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        error: 'Failed to fetch data',
        pokemonId: '',
        pokemonData: null,
      },
    };
  }
};
