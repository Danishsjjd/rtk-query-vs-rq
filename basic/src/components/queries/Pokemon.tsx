import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { pokemon } from "../key/pokemon"

// pikachu
// charizard

const Pokemon = () => {
  const [findPokemon, setFindPokemon] = useState<string>("")

  const { data, isLoading, isError, fetchStatus } = useQuery(
    [pokemon.key, findPokemon],
    async ({ signal }) => {
      await new Promise((res) => setTimeout(res, 500))
      return await axios.get<{
        sprites: { front_default: string }
      }>(pokemon.url + "/" + findPokemon, {
        signal,
      })
    },
    {
      enabled: !!findPokemon,
    }
  )

  return (
    <div>
      <input
        type="text"
        placeholder="Find pokemon"
        onChange={(e) => setFindPokemon(e.target.value)}
        value={findPokemon}
      />
      {fetchStatus === "idle" && "don't start fetching"}
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
