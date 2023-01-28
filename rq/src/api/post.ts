import axios from "axios"

export type Post = {
  userId: number
  id: number
  title: string
  message: string
}

export type Page = {
  nextPage: number | undefined
  previousPage: number | undefined
  posts: Post[]
}

const LIMIT = 2

export async function getPostsPaginated(page: number): Promise<Page> {
  const res = await axios.get("http://localhost:3000/posts", {
    params: { _page: page, _sort: "title", _limit: LIMIT },
  })

  const TOTAL_POST = parseInt(res.headers["x-total-count"] as string)
  const hasNext = page * LIMIT <= TOTAL_POST

  return {
    nextPage: hasNext ? page + 1 : undefined,
    previousPage: page > 1 ? page - 1 : undefined,
    posts: res.data,
  }
}
