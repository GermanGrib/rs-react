import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1/' }),
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => 'all',
      transformResponse: (response: { name: { common: string } }[]) =>
        response.map((country) => ({ name: country.name.common })),
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
