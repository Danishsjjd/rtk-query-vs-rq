import { useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import { default as Home } from "./components/mutations/todo"
import Modify from "./components/mutations/todo/Modify"
import DependentQueries from "./components/queries/DependentQueries"
import GlobalState from "./components/queries/GlobalState"
import { PostListInfinite } from "./components/queries/InfinitePageList"
import ParallelQueries from "./components/queries/ParallelQueries"
import Pokemon from "./components/queries/Pokemon"
import { PostListPaginated } from "./components/queries/PostListPaginated"
import PreFetchPosts from "./components/queries/posts"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo/:id" element={<Modify />} />
        <Route path="/queries" element={<CurrentQueryPage />} />
      </Routes>
    </>
  )
}

const CurrentQueryPage = () => {
  const [CurrentPage, setCurrentPage] = useState<JSX.Element>(<Queries />)
  return (
    <>
      <Link to={"/"}>go to mutations example</Link>
      <h1>Queries</h1>
      <button onClick={() => setCurrentPage(<Queries />)}>
        queries home page
      </button>
      <button onClick={() => setCurrentPage(<PostListInfinite />)}>
        infinitePageList
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        PostListPaginated
      </button>
      {CurrentPage}
    </>
  )
}

const Queries = () => {
  return (
    <>
      <GlobalState />
      <Pokemon />
      <ParallelQueries />
      <DependentQueries />
      <PreFetchPosts />
    </>
  )
}

export default App
