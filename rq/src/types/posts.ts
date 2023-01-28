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
