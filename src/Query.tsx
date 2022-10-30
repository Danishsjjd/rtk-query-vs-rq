import { useState, useEffect } from "react";

// import DependentQueries from "./components/DependentQueries";
// import GlobalState from "./components/GlobalState";
// import Pokemon from "./components/Pokemon";
import Posts, { fetchData } from "./components/posts";
// import StopWatch from "./components/StopWatch";
import { queryClient } from "./Home";

function Home() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    queryClient.prefetchQuery(["posts"], fetchData);
  }, []);

  return (
    <>
      {" "}
      <button onClick={() => setToggle((pre) => !pre)}>toggle</button>
      {/* <GlobalState /> */}
      {/* <>
        <button
          onClick={() =>
            queryClient.invalidateQueries(["StopWatch"], {
              refetchType: "active",
            })
          }
        >
          update
        </button>
        {toggle && <StopWatch />}
      </> */}
      {/* <Pokemon /> */}
      {/* <DependentQueries /> */}
      {toggle && <Posts />}
    </>
  );
}

export default Home;
