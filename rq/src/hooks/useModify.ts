import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { getSingleTodo, updateTodo } from "../api/todo"
import { FormValue, Todo } from "../types/todo"

const useModify = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormValue>({})

  let params = useParams()
  const id = parseInt(params.id || "")

  const queryClient = useQueryClient()

  const getTodo = useQuery<Todo>({
    queryKey: ["todo", id],
    queryFn: getSingleTodo(id),
    placeholderData: () =>
      queryClient
        .getQueryData<Todo[]>(["todos"])
        ?.find((todo) => todo.id === id),
  })

  const updateTodoMutation = useMutation<
    Todo,
    AxiosError<{ message: string }>,
    Todo,
    () => Todo | undefined
  >({
    mutationFn: (data) => updateTodo(id, data),
    onSuccess(data, variables, context) {
      queryClient.setQueryData(["todo", variables.id], variables)
      // queryClient.invalidateQueries(["todo", variables.id])
      reset({ todo: "" })
    },
    onMutate(variables) {
      const oldTodo: Todo | undefined = queryClient.getQueryData([
        "todo",
        variables.id,
      ])
      queryClient.setQueryData<Todo>(["todo", variables.id], variables)

      return () =>
        queryClient.setQueryData<Todo | undefined>(
          ["todo", variables.id],
          oldTodo
        )
    },
    onError(error, variables, rollBack) {
      rollBack?.()
    },
  })

  const onSubmit = (formData: FormValue) => {
    if (!getTodo.data) return null
    updateTodoMutation.mutate({
      id: getTodo.data?.id,
      todo: formData.todo,
      completed: getTodo.data?.completed,
    })
  }

  return {
    register,
    onSubmit,
    handleSubmit,
    getTodo,
    updateTodoMutation,
    errors,
    isDirty,
  }
}

export default useModify
