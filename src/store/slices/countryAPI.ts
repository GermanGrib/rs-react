import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getCountries = createApi({
  reducerPath: 'getCountries',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1/' }),
  endpoints: (build) => ({
    getCounty: build.query({
      query: () => 'all',
      transformResponse: (response: { name: { common: string } }[]) =>
        response.map((country) => {
          return { name: country.name.common };
        }),
    }),
  }),
});

export const { useGetCountyQuery } = getCountries;
