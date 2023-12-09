import { useState } from "react"
import { useGetPokemonQuery } from "../../store/services/pokemon"

const Pokemon = () => {
  const [findPokemon, setFindPokemon] = useState("")
  const { data, isUninitialized, isFetching, isError } = useGetPokemonQuery(
    findPokemon,
    { skip: !findPokemon }
  )

  return (
    <div>
      <input
        type="text"
        placeholder="Find pokemon"
        onChange={(e) => setFindPokemon(e.target.value)}
        value={findPokemon}
      />
      {isUninitialized && "don't starting fetching"}
      {isFetching
        ? "Loading..."
        : isError
        ? "Not Found 404"
        : !isUninitialized && (
            <div>
              <img src={data?.sprites?.front_default} alt="pokemons" />
            </div>
          )}
    </div>
  )
}

export default Pokemon
