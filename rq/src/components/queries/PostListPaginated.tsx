import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getPostsPaginated, Page } from "../../api/post"

export function PostListPaginated() {
  const [page, setPage] = useState<number>(1)

  const { status, error, data, isPreviousData } = useQuery<
    unknown,
    unknown,
    Page
  >({
    queryKey: ["posts", { page }],
    keepPreviousData: true,
    queryFn: () => getPostsPaginated(page),
  })

  if (status === "loading") return <h1>Loading...</h1>
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>

  return (
    <>
      <h1>
        Post List Paginated
        <br />
        <small>{isPreviousData && "Previous Data"}</small>
      </h1>
      {data.posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      {data.previousPage && (
        <button onClick={() => setPage(data.previousPage as number)}>
          Previous
        </button>
      )}{" "}
      {data.nextPage && (
        <button onClick={() => setPage(data.nextPage as number)}>Next</button>
      )}
    </>
  )
}
