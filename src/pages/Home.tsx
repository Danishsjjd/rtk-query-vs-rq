import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import DependentQueries from "../components/DependentQueries";
// import GlobalState from "../components/GlobalState";
import Pokemon from "../components/Pokemon";
import { pokemon } from "../key/pokemon";
// import StopWatch from "../components/StopWatch";

type Props = {};

const Home = (props: Props) => {
  const [findPokemon, setFindPokemon] = useState<string>("");
  return (
    <Fragment>
      <Link to={"/enter"}>Enter</Link>
      <DependentQueries />
      <input
        type="text"
        placeholder="Find pokemon"
        onChange={(e) => setFindPokemon(e.target.value)}
        value={findPokemon}
      />
      <Pokemon
        queryKey={pokemon.key}
        queryUrl={pokemon.url}
        findPokemon={findPokemon}
      />
      {/* <StopWatch /> */}
      {/* <GlobalState /> */}
    </Fragment>
  );
};

export default Home;
