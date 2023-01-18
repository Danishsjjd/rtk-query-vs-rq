import List from "./List"
import Create from "./Create"

export const url: string = "http://localhost:3000/todo"

const Todo = () => {
  return (
    <>
      <List />
      <Create />
    </>
  )
}

export default Todo
