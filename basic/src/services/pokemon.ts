import axios, { GenericAbortSignal } from "axios"

type Key = {
  url: string
  key: string
}

export const pokemon: Key = {
  key: "pokemon",
  url: "https://pokeapi.co/api/v2/pokemon",
}

export const getPokemon = async (
  uri: string,
  signal?: GenericAbortSignal | undefined
) => {
  await new Promise((res) => setTimeout(res, 500))
  return await axios.get<{
    sprites: { front_default: string }
  }>(pokemon.url + "/" + uri, {
    signal,
  })
}
