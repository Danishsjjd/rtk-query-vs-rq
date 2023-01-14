import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import Query from "./Query"

type Props = {}

export const queryClient = new QueryClient()

const Home = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Query />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Home
