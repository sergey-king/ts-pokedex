import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EvolutionChain, Pokemon } from 'pokenode-ts';

// Pokemon API slice
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getEvolutionById: builder.query<EvolutionChain, number>({
      query: (id) => `evolution-chain/${id}`,
    }),
  }),
})

export const { useGetPokemonByNameQuery, useLazyGetPokemonByNameQuery, useGetEvolutionByIdQuery, useLazyGetEvolutionByIdQuery } = pokemonApi