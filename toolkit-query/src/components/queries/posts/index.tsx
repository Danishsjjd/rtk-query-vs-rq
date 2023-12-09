import { useEffect, useState } from "react"
import { Post as PostType, useGetPostQuery } from "../../../store/services/api"
import Post from "./Post"
import Posts from "./Posts"

const Main = () => {
  const [postId, setPostId] = useState<number>(0)

  const { data: posts, isLoading } = useGetPostQuery()

  const { post, refetch } = useGetPostQuery(undefined, {
    selectFromResult: ({ data }) => ({
      post: data?.find((post) => post.id === postId),
    }),
  })

  if (isLoading) return <span>Loading...</span>

  useEffect(() => {
    if (post) refetch()
  }, [post])

  return (
    <>
      <span style={{ color: "red", fontWeight: "bold" }}>
        {" if you go back check scrollbar it will be in it's initial state"}
      </span>
      {posts && (
        <div>
          {postId ? (
            <Post post={post as PostType} setPostId={setPostId} />
          ) : (
            <Posts posts={posts as PostType[]} setPostId={setPostId} />
          )}
        </div>
      )}
    </>
  )
}

const PreFetchPosts = () => {
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <button onClick={() => setToggle((pre) => !pre)}>Toggle Posts</button>
      {toggle && <Main />}
    </>
  )
}

export default PreFetchPosts
