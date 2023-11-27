import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import React, { ReactElement } from 'react';

import { DetailedCard } from '../../components/Catalog/DetailedCard';
import Layout from '../../components/Layout/Layout';
import { DEFAULT_QUERY_CATALOG } from '../../const';
import { PokemonGeneralResponse } from '../../services/types/interface';
import { POKEMON_URL } from '../../services/variables';
import { DetailedCardFields } from '../../types/interface';

interface TestDetailedProps {
  pokemonData: PokemonGeneralResponse;
  pokemonDetailedData: DetailedCardFields;
}

export default function TestDetailed({
  pokemonData,
  pokemonDetailedData,
}: TestDetailedProps): ReactElement {
  return (
    <Layout pokemonData={pokemonData} isDetailed>
      <DetailedCard data={pokemonDetailedData} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<TestDetailedProps> = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<TestDetailedProps>> => {
  const pokemonId = context.params?.id as string;
  const limit =
    typeof context.query.limit === 'string'
      ? context.query.limit
      : DEFAULT_QUERY_CATALOG.limit;
  const page =
    typeof context.query.page === 'string'
      ? context.query.page
      : DEFAULT_QUERY_CATALOG.page;
  const offset = (Number(page) - 1) * Number(limit);

  try {
    const detailedResponse = await fetch(`${POKEMON_URL}/${pokemonId}`);
    const params = new URLSearchParams();
    params.append('limit', limit);
    params.append('offset', String(offset));
    const urlWithQuery = `${POKEMON_URL}?${params.toString()}`;

    const res = await fetch(urlWithQuery);
    const pokemonData = (await res.json()) as PokemonGeneralResponse;

    if (!detailedResponse.ok) {
      throw new Error(`Failed to fetch data for ${pokemonId}`);
    }

    const data = await detailedResponse.json();

    return {
      props: {
        pokemonData,
        pokemonDetailedData: data,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        pokemonData: {
          results: [],
          count: 0,
        },
        pokemonDetailedData: {
          name: '',
          weight: '',
          height: '',
          base_experience: '',
          id: '',
          sprites: {
            front_default: '',
          },
          types: [],
        },
      },
    };
  }
};
