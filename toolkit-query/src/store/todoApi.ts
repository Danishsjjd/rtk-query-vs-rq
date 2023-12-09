import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Todo } from "../type/todo"

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["TODO"],
  endpoints: (builder) => ({
    getTodo: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: [{ type: "TODO" }],
    }),
    addTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: "todos",
        method: "POST",
        body: todo,
      }),
      // invalidatesTags: [{ type: "TODO" }],
    }),
  }),
})

export const { useGetTodoQuery, useAddTodoMutation } = todoApi

export default todoApi
