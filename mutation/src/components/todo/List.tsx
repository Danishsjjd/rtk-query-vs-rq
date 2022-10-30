import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";

import { Todo } from "../../models/todo";
import { url } from "./index";
type Props = {};

const List = (props: Props) => {
  const { data, isLoading, isError } = useQuery(
    ["todos"],
    async () => (await axios.get<Todo[]>(url)).data
  );

  if (isLoading) return <span>Loading</span>;
  if (isError) return <span>Error while fetching...</span>;

  return (
    <ul>
      {data?.map(({ _id, completed, todo }) => (
        <li key={_id}>
          <Link to={`todo/${_id}`}>
            <span>{todo}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default List;
