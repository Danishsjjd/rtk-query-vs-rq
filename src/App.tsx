import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import DependentQueries from "./components/DependentQueries";
// import GlobalState from "./components/GlobalState";
// import Pokemon from "./components/Pokemon";
import Posts from "./components/posts";
// import StopWatch from "./components/StopWatch";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <GlobalState /> */}
      {/* <StopWatch /> */}
      {/* <Pokemon /> */}
      {/* <DependentQueries /> */}
      <Posts />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
