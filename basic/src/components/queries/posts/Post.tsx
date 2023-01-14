import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { Post as PostType } from "../../../models/posts"
// import { queryClient } from "../../Home";

type Props = {
  postUrl: string
  setPostId: Function
}

const Post = ({ postUrl, setPostId }: Props) => {
  // const allPosts = queryClient.getQueriesData<PostType[]>(["posts"]);
  // const postId: any = postUrl.match(/\d+/g)?.join("");

  // const allPostData = allPosts?.[0]?.[1];

  const { data, isLoading, isFetching } = useQuery(
    ["post", postUrl],
    async () => (await axios.get<PostType>(postUrl)).data,
    {
      // placeholderData: () =>
      //   allPostData?.find((gPost) => gPost.id === parseInt(postId)),
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
