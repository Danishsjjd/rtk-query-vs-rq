import List from "./List";
import Create from "./Create";

export const url: string = "http://localhost:9001/api/todo/";

const Todo = () => {
  return (
    <>
      <List />
      <Create />
    </>
  );
};

export default Todo;
