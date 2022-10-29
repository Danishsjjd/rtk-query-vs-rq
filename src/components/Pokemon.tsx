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
  const { data, isLoading, isError, isFetching, status, error, fetchStatus } =
    useQuery(
      [queryKey, findPokemon],
      async ({ signal }) => {
        await new Promise((res) => setTimeout(res, 500));
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

  if (fetchStatus === "idle" && isLoading) return null;
  if (isLoading) return <span>Loading</span>;
  if (isError) return <span>Not Found 404</span>;

  return (
    <div>
      <img src={data.data.sprites?.front_default} alt="pokemons" />
    </div>
  );
};

export default Pokemon;
