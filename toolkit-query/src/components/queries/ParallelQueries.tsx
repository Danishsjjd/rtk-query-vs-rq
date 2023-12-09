import { useGetPokemonQuery } from "../../store/services/pokemon"

const ParallelQueries = () => {
  const { data: pikachu, isLoading: pLoading } = useGetPokemonQuery("pikachu")

  const { data: charizard, isLoading: cLoading } =
    useGetPokemonQuery("charizard")

  console.log("By Default Every Call Is Parallel 🔥")

  return null
}

export default ParallelQueries
