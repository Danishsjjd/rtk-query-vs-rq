import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  queryKey: string;
  queryUrl: string;
  findPokemon: string;
};

// pikachu
// charizard

const Pokemon = ({ queryKey, queryUrl, findPokemon }: Props) => {
  const { data, isLoading, isError, isFetching, status, error } = useQuery(
    [queryKey, findPokemon],
    async ({ signal }) => {
      await new Promise((res) => setTimeout(res, 1000));
      return await axios.get<{
        sprites: { front_default: string };
      }>(queryUrl + "/" + findPokemon, {
        signal,
      });
    },
    {
      enabled: !!findPokemon,
    }
  );
  console.log("status", status);
  console.log("isError", isError);
  console.log("error", error);

  if (isLoading) return <span>Loading</span>;
  if (isError) return <span>Error occur</span>;

  return (
    <div>
      <img src={data.data.sprites?.front_default} alt="pokemons" />
      {isFetching && "Fetching pokemon"}
      {/* <ul>
        {data.data.results.map(({ name, url }) => {
          return (
            <li key={name}>
              <h5>Name: {name}</h5>
              <h5>Details: {url}</h5>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};

export default Pokemon;
