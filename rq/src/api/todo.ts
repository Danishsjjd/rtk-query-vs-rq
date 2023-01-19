import axios from "axios"
import { FormValue, Todo } from "../types/todo"

const url = "http://localhost:3000/todo"

export const getAllTodo = async () => (await axios.get<Todo[]>(url)).data
export const createTodo = (data: FormValue) =>
  axios.post(url, { todo: data.todo })

export const getSingleTodo = (id: number) => async () =>
  (await axios.get<Todo>(url + `/${id}`)).data

export const updateTodo = async (id: number, data: Todo) =>
  (await axios.put<Todo>(`${url}/${id}`, { ...data })).data
