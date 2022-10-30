import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "../../../basic/src/models/todo";
import { url } from "./index";
type Props = {};

const List = (props: Props) => {
  const { data, isLoading, isError } = useQuery(["todos"], async () =>
    axios.get<Todo[]>(url)
  );

  if (isLoading) return <span>Loading</span>;
  if (isError) return <span>Error while fetching...</span>;

  return (
    <ul>
      {data.data?.map(({ _id, completed, todo }) => (
        <li key={_id}>
          <span>{todo}</span>
          <button>Update</button>
          <button>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default List;
