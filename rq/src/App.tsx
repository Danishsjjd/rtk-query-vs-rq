import { Link, Route, Routes } from "react-router-dom"
import { default as Home } from "./components/mutations/todo"
import Modify from "./components/mutations/todo/Modify"
import DependentQueries from "./components/queries/DependentQueries"
import GlobalState from "./components/queries/GlobalState"
import ParallelQueries from "./components/queries/ParallelQueries"
import Pokemon from "./components/queries/Pokemon"
import PreFetchPosts from "./components/queries/posts"

function App() {
  return (
    <>
      <h3>Mutations</h3>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo/:id" element={<Modify />} />
        <Route path="/queries" element={<Queries />} />
      </Routes>
    </>
  )
}

const Queries = () => {
  return (
    <>
      <Link to={"/"}>go to mutations example</Link>
      <h3>Queries</h3>
      <GlobalState />
      <Pokemon />
      <ParallelQueries />
      <DependentQueries />
      <PreFetchPosts />
    </>
  )
}

export default App
