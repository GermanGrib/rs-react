import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { ReactElement } from 'react';

import { Catalog } from '../components/Catalog';
import MainLayout from '../components/MainLayout';
import { DEFAULT_QUERY_CATALOG } from '../const';
import { PokemonGeneralResponse } from '../services/types/interface';
import { POKEMON_URL } from '../services/variables';

export default function Index({
  pokemonData,
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  return (
    <MainLayout>
      <Catalog pokemonData={pokemonData} />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const limit =
    typeof context.query.limit === 'string'
      ? context.query.limit
      : DEFAULT_QUERY_CATALOG.limit;
  const offset =
    typeof context.query.offset === 'string'
      ? context.query.offset
      : DEFAULT_QUERY_CATALOG.offset;

  const params = new URLSearchParams();
  params.append('limit', limit);
  params.append('offset', offset);
  const urlWithQuery = `${POKEMON_URL}?${params.toString()}`;

  const res = await fetch(urlWithQuery);
  const pokemonData = (await res.json()) as PokemonGeneralResponse;
  return {
    props: { pokemonData },
  };
};
