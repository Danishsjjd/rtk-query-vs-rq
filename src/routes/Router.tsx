import { Routes, Route, Link } from "react-router-dom";

import Home from "../pages/Home";

type Props = {};

const Router = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/enter"
        element={
          <>
            <span>
              Open query <Link to={"/"}>Home</Link>
            </span>
          </>
        }
      />
    </Routes>
  );
};

export default Router;
