import { Link } from "react-router-dom"
import List from "./List"
import Create from "./Create"

const Todo = () => {
  return (
    <>
      <Link to={"/queries"}>go to queries example</Link>
      <h1>Mutations</h1>
      <List />
      <Create />
    </>
  )
}

export default Todo
