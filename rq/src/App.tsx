import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter } from "react-router-dom"

import Query from "./Query"

type Props = {}

export const queryClient = new QueryClient()

const Home = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Query />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Home
