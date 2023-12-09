import type { Post } from "../../../store/services/api"

type Props = {
  posts: Post[]
  setPostId: Function
}

const Posts = ({ posts, setPostId }: Props) => {
  return (
    <ul>
      {posts.map(({ id, title }) => {
        return (
          <li key={id}>
            <span
              onClick={() => setPostId(id)}
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {title}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default Posts
