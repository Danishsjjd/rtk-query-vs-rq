import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface User {
  id: number
  name: string
}

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getUser: builder.query<[User], string>({
      query: (email) => ({
        url: "users",
        params: {
          email,
        },
      }),
    }),
    getPostsByUser: builder.query<Post[], number>({
      query: (id) => ({
        url: `posts?${id}`,
      }),
    }),
    getPost: builder.query<Post[], void | number>({
      query: (id) => (id ? `posts/${id}` : `posts`),
    }),
  }),
})

export const { useGetUserQuery, useGetPostsByUserQuery, useGetPostQuery } = api
export default api
