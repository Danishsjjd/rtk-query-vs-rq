import { useState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

import DependentQueries from "./components/queries/DependentQueries"
import GlobalState from "./components/queries/GlobalState"
import Pokemon from "./components/queries/Pokemon"
import Posts, { fetchData } from "./components/queries/posts"

function Home() {
  const [toggle, setToggle] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.prefetchQuery(["posts"], fetchData)
  }, [])

  return (
    <>
      <button onClick={() => setToggle((pre) => !pre)}>Toggle Posts</button>
      {/* <GlobalState />
      <Pokemon />
      <DependentQueries /> */}
      {toggle && <Posts />}
    </>
  )
}

export default Home
