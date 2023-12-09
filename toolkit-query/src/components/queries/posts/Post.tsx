import type { Post as PostType } from "../../../store/services/api"

type Props = {
  post: PostType
  setPostId: Function
}

const Post = ({ post, setPostId }: Props) => {
  return (
    <div>
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

      <h2>{post.title}</h2>
    </div>
  )
}

export default Post
