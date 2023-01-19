import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { getAllTodo } from "../../../api/todo"

const List = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodo,
  })

  if (isLoading) return <span>Loading...</span>
  if (isError) return <span>Error while fetching...</span>

  return (
    <ul>
      {data?.map(({ id, completed, todo }) => (
        <li key={id}>
          <Link
            to={`todo/${id}`}
            style={{ textDecorationLine: completed ? "line-through" : "none" }}
          >
            <span>{todo}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default List
