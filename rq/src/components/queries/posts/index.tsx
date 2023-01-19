import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useReducer, useState } from "react"
import { Post as PostType } from "../../../types/posts"
import Post from "./Post"
import Posts from "./Posts"

const url = "https://jsonplaceholder.typicode.com/posts"

export const fetchData = (queryClient: QueryClient) => async () => {
  const data = await axios.get<PostType[]>(url)

  data.data.forEach((post) => {
    queryClient.setQueryData(["post", url + "/" + post.id], post)
  })

  return data.data
}

const Main = () => {
  const [count, increment] = useReducer((d) => d + 1, 0)
  const [postId, setPostId] = useState<number>(0)

  const queryClient = useQueryClient()

  const { data, isLoading, isError, isFetching } = useQuery(
    ["posts"],
    fetchData(queryClient),
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
    queryClient.prefetchQuery(["posts"], fetchData(queryClient))
  }, [])
  return (
    <>
      <button onClick={() => setToggle((pre) => !pre)}>Toggle Posts</button>
      {toggle && <Main />}
    </>
  )
}

export default PreFetchPosts
