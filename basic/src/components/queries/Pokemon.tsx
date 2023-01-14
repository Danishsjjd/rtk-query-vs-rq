import { useQuery } from "@tanstack/react-query"
import axios, { GenericAbortSignal } from "axios"
import { useState } from "react"
import { pokemon } from "../../key/pokemon"

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
const Pokemon = () => {
  const [findPokemon, setFindPokemon] = useState<string>("")

  const { data, isLoading, isError, fetchStatus, isFetching } = useQuery(
    [pokemon.key, findPokemon],
    ({ signal }) => getPokemon(findPokemon, signal),
    {
      enabled: !!findPokemon,
    }
  )

  console.log(
    "isFetching, fetchStatus(fetching|paused|idle),\n isLoading(true only first time)"
  )
  console.log(isFetching, fetchStatus, isLoading)

  return (
    <div>
      <input
        type="text"
        placeholder="Find pokemon"
        onChange={(e) => setFindPokemon(e.target.value)}
        value={findPokemon}
      />
      {fetchStatus === "idle" && isLoading ? null : isLoading ? (
        "Loading..."
      ) : isError ? (
        "Not Found 404"
      ) : (
        <div>
          <img src={data.data.sprites?.front_default} alt="pokemons" />
        </div>
      )}
    </div>
  )
}

export default Pokemon
