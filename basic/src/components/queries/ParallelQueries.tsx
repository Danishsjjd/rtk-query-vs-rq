import { useQuery } from "@tanstack/react-query"
import { getPokemon } from "./Pokemon"

const ParallelQueries = () => {
  const { data: pikachu, isLoading: pLoading } = useQuery(
    ["pokemon", "pikachu"],
    () => getPokemon("pikachu")
  )

  const { data: charizard, isLoading: cLoading } = useQuery(
    ["pokemon", "charizard"],
    () => getPokemon("charizard")
  )

  console.log("By Default Every Call Is Parallel 🔥")

  return null
}

export default ParallelQueries
