import { Route, Routes } from "react-router-dom"
import Todo from "./pages/Todo"
import DependentQueries from "./components/queries/DependentQueries"
import GlobalState from "./components/queries/GlobalState"
import ParallelQueries from "./components/queries/ParallelQueries"
import Pokemon from "./components/queries/Pokemon"
import PreFetchPosts from "./components/queries/posts"
import { default as Home } from "./components/mutations/todo"

function Query() {
  return (
    <>
      {/* <div>
        <h3>Queries</h3>
        <GlobalState />
        <Pokemon />
        <ParallelQueries />
        <DependentQueries />
        <PreFetchPosts />
      </div> */}
      <div>
        <h3>Mutations</h3>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo/:_id" element={<Todo />} />
        </Routes>
      </div>
    </>
  )
}

export default Query
