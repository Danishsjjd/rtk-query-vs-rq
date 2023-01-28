import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { Post as PostType } from "../../../types/posts"

type Props = {
  postUrl: string
  setPostId: Function
}

const Post = ({ postUrl, setPostId }: Props) => {
  const queryClient = useQueryClient()

  const allPosts = queryClient.getQueryData<PostType[]>(["posts"])
  const postId: any = postUrl.match(/\d+/g)?.join("")

  const { data, isLoading, isFetching } = useQuery(
    ["post", postUrl],
    async () => (await axios.get<PostType>(postUrl)).data,
    {
      placeholderData: () =>
        allPosts?.find((gPost) => gPost.id === parseInt(postId)),
    }
  )

  if (isLoading) return <span>Loading..</span>

  return (
    <div>
      {isFetching && <span>Updating...</span>}
      <span
        onClick={() => setPostId(0)}
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Go Back
      </span>

      <h2>{data?.title}</h2>
    </div>
  )
}

export default Post
