import useModify from "../../../hooks/useModify"

const Modify = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    getTodo,
    updateTodoMutation,
    errors,
    isDirty,
  } = useModify()

  if (getTodo.isLoading) return <span>loading..</span>

  if (getTodo.isError) return null

  if (updateTodoMutation.isError) {
    updateTodoMutation.error?.response?.data.message
  }

  return (
    <div>
      <h1>{getTodo.data.todo}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("todo", {
            required: "This todo is functionally required",
            minLength: { value: 3, message: "required with min 3 length" },
          })}
        />
        {errors.todo?.message && (
          <h5 style={{ color: "red" }}>{errors.todo.message.toString()}</h5>
        )}
        <button
          type="submit"
          disabled={updateTodoMutation.isLoading || !isDirty}
        >
          {updateTodoMutation.isLoading ? "saving..." : "Submit"}
        </button>
        {updateTodoMutation.isError && (
          <span>
            {updateTodoMutation.error.response?.data.message ||
              updateTodoMutation.error.message}
          </span>
        )}
      </form>

      <div>
        <button>Toggle Complete</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default Modify
