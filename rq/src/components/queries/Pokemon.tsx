import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getPokemon, pokemon } from "../../services/pokemon"

const Pokemon = () => {
  const [findPokemon, setFindPokemon] = useState("")

  const { data, isLoading, isError, fetchStatus, isFetching } = useQuery(
    [pokemon.key, findPokemon],
    ({ signal }) => getPokemon(findPokemon, signal),
    {
      enabled: !!findPokemon,
    }
  )

  console.log(
    "isFetching, fetchStatus(fetching|paused|idle),\n isLoading(true only first time but in pokemon case there is always a new request)"
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
