import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const pokemon = createApi({
  reducerPath: "pokemon",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/pokemon" }),
  endpoints: (builder) => ({
    getPokemon: builder.query<{ sprites: { front_default: string } }, string>({
      query: (id) => ({
        url: id,
      }),
    }),
  }),
})

export const { useGetPokemonQuery } = pokemon
export default pokemon
