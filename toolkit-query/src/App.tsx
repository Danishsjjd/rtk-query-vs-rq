import DependentQueries from "./components/queries/DependentQueries"
import GlobalState from "./components/queries/GlobalState"
import ParallelQueries from "./components/queries/ParallelQueries"
import Pokemon from "./components/queries/Pokemon"
import PreFetchPosts from "./components/queries/posts"

function App() {
  return (
    <>
      <h1>Queries</h1>
      <GlobalState />
      <Pokemon />
      <ParallelQueries />
      <DependentQueries />
      <PreFetchPosts />
    </>
  )
}

export default App
