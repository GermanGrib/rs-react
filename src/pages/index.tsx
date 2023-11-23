import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { ReactElement } from 'react';

import Layout from '../components/Layout/Layout';
import { DEFAULT_QUERY_CATALOG } from '../const';
import { PokemonGeneralResponse } from '../services/types/interface';
import { POKEMON_URL } from '../services/variables';

export default function Index({
  pokemonData,
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  return <Layout pokemonData={pokemonData} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const limit =
    typeof context.query.limit === 'string'
      ? context.query.limit
      : DEFAULT_QUERY_CATALOG.limit;
  const page =
    typeof context.query.page === 'string'
      ? context.query.page
      : DEFAULT_QUERY_CATALOG.page;
  const offset = (Number(page) - 1) * Number(limit);

  const params = new URLSearchParams();
  params.append('limit', limit);
  params.append('offset', String(offset));
  const urlWithQuery = `${POKEMON_URL}?${params.toString()}`;

  const res = await fetch(urlWithQuery);
  const pokemonData = (await res.json()) as PokemonGeneralResponse;
  return {
    props: { pokemonData },
  };
};
