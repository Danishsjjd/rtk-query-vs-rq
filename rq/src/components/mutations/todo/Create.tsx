import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import { createTodo } from "../../../api/todo"
import { FormValue, Todo } from "../../../types/todo"

const Create = () => {
  const queryClient = useQueryClient()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormValue>({})

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess() {
      // ! don't need extra request
      // ! it's depends I already set Data and rollback if there is any error
      queryClient.invalidateQueries(["todos"])
      reset({ todo: "" })
    },
    onMutate(variables) {
      let oldData: Todo[] | undefined
      queryClient.setQueryData<Todo[]>(["todos"], (previousTodo) => {
        oldData = previousTodo
        if (typeof previousTodo !== "undefined")
          return [
            ...previousTodo,
            {
              id: Date.now(),
              completed: false,
              todo: variables.todo,
            },
          ]
      })
      return () => queryClient.setQueryData<Todo[]>(["todos"], oldData)
    },
    onError(error, variables, rollback) {
      rollback?.()
    },
  })

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    createTodoMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("todo", {
          required: "this todo is functional required",
          minLength: { value: 3, message: "min 3" },
        })}
      />
      {errors.todo?.message && (
        <span style={{ color: "red" }}>{errors?.todo?.message.toString()}</span>
      )}
      <button type="submit">
        {createTodoMutation.isLoading ? "saving..." : "Submit"}
      </button>
      {createTodoMutation.isError &&
      createTodoMutation.error instanceof AxiosError
        ? createTodoMutation.error?.response?.data?.message
        : null}
    </form>
  )
}

export default Create
