import { useQuery } from "@tanstack/react-query";

import { queryClient } from "../App";

type Props = {};

const TextInput = () => {
  const { data } = useQuery(["sharedText"], () => "", {
    enabled: false,
  });
  return (
    <input
      value={data}
      placeholder="Enter Something"
      type={"text"}
      onChange={(e) => {
        queryClient.setQueryData(["sharedText"], e.target.value);
      }}
    />
  );
};

const Text = () => {
  const { data } = useQuery(["sharedText"], () => "", {
    enabled: false,
  });
  return <h3>{data}</h3>;
};

const GlobalState = (props: Props) => {
  return (
    <div>
      <h1>GlobalState</h1>
      <TextInput />
      <Text />
    </div>
  );
};

export default GlobalState;
