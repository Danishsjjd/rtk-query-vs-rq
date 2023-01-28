import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useReducer, useState } from "react"
import { preFetchAllPosts } from "../../../api/post"
import Post from "./Post"
import Posts from "./Posts"

const Main = () => {
  const [count, increment] = useReducer((d) => d + 1, 0)
  const [postId, setPostId] = useState<number>(0)

  const queryClient = useQueryClient()

  const { data, isLoading, isError, isFetching } = useQuery(
    ["posts"],
    preFetchAllPosts(queryClient),
    {
      onSuccess() {
        increment()
      },
    }
  )

  if (isLoading) return <span>Loading...</span>
  if (isError) return <span>404 not found</span>

  return (
    <>
      <h1>{count}</h1>
      <span style={{ color: "red", fontWeight: "bold" }}>
        {" if you go back check scrollbar it will be in it's initial state"}
      </span>
      {data && (
        <div>
          {isFetching && <span>Updating...</span>}
          {postId ? (
            <Post
              postUrl={`https://jsonplaceholder.typicode.com/posts/${postId}`}
              setPostId={setPostId}
            />
          ) : (
            <Posts posts={data} setPostId={setPostId} />
          )}
        </div>
      )}
    </>
  )
}

const PreFetchPosts = () => {
  const queryClient = useQueryClient()
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    queryClient.prefetchQuery(["posts"], preFetchAllPosts(queryClient))
  }, [])
  return (
    <>
      <button onClick={() => setToggle((pre) => !pre)}>Toggle Posts</button>
      {toggle && <Main />}
    </>
  )
}

export default PreFetchPosts
