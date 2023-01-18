import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import axios from "axios"

import { Todo } from "../../../types/todo"
import { url } from "./index"

const List = () => {
  const { data, isLoading, isError } = useQuery(
    ["todos"],
    async () => (await axios.get<Todo[]>(url)).data
  )

  if (isLoading) return <span>Loading</span>
  if (isError) return <span>Error while fetching...</span>

  return (
    <ul>
      {data?.map(({ id, completed, todo }) => (
        <li key={id}>
          <Link to={`todo/${id}`}>
            <span>{todo}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default List
