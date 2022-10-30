import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Mutations from "./Mutations";
// import Query from "./Query";

type Props = {};

export const queryClient = new QueryClient();

const Home = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Mutations />
      {/* <Query /> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Home;
