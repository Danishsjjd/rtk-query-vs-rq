import { useParams } from "react-router-dom";
import Modify from "../components/todo/Modify";

const Todo = () => {
  const { _id } = useParams();

  return <Modify id={typeof _id === "string" ? _id : "notFound"} />;
};

export default Todo;
