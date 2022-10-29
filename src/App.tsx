import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

import DependentQueries from "./components/DependentQueries";
import GlobalState from "./components/GlobalState";
import Pokemon from "./components/Pokemon";
import Posts from "./components/posts";
import StopWatch from "./components/StopWatch";
import { pokemon } from "./key/pokemon";

export const queryClient = new QueryClient();

function App() {
  const [findPokemon, setFindPokemon] = useState<string>("");
  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
      <input
        type="text"
        placeholder="Find pokemon"
        onChange={(e) => setFindPokemon(e.target.value)}
        value={findPokemon}
      />
      <Pokemon
        queryKey={pokemon.key}
        queryUrl={pokemon.url}
        findPokemon={findPokemon}
      />
      <StopWatch />
      <GlobalState />
      <DependentQueries />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
