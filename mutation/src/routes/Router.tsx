import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Todo from "../pages/Todo";

type Props = {};

const Router = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo/:_id" element={<Todo />} />
    </Routes>
  );
};

export default Router;
