import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { ReactElement } from 'react';

import { DetailedCard } from '../components/Catalog/DetailedCard';
import MainLayout from '../components/MainLayout';
import { PokemonResponses } from '../services/types/interface';
import { POKEMON_URL } from '../services/variables';

export default function SearchResult({
  pokemonData,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  return (
    <MainLayout>
      <DetailedCard data={pokemonData} errorMessage={error} />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchValue =
    typeof context.query.searchValue === 'string'
      ? context.query.searchValue
      : null;

  try {
    const res = await fetch(`${POKEMON_URL}/${searchValue}`);
    const pokemonData = (await res.json()) as PokemonResponses;

    return {
      props: {
        pokemonData,
      },
    };
  } catch (error) {
    return {
      props: {
        error: 'Failed to fetch data',
      },
    };
  }
};
