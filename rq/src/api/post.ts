import { QueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Page, Post } from "../types/posts"

const URL = "http://localhost:3000/posts"
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

export const preFetchAllPosts = (queryClient: QueryClient) => async () => {
  const data = await axios.get<Post[]>(URL)

  data.data.forEach((post) => {
    queryClient.setQueryData(["post", URL + "/" + post.id], post)
  })

  return data.data
}
