import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

import { Todo } from "../../models/todo";
import { url } from "./index";
import { queryClient } from "../../App";

type Props = {
  id: string;
};

type FormValues = {
  todo: string;
};

const Modify = ({ id }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormValues>({});

  const { data, error, isLoading, isError } = useQuery<
    Todo,
    AxiosError<{ message: string }>
  >(["todo", id], async () => (await axios.get<Todo>(url + id)).data, {
    placeholderData: () =>
      queryClient
        .getQueryData<Todo[]>(["todos"])
        ?.find((todo) => todo._id === id),
  });

  const {
    isError: updatingError,
    isLoading: updateLoading,
    error: updateError,
    mutate,
  } = useMutation<
    string,
    AxiosError<{ message: string }>,
    Todo,
    () => Todo | undefined
  >((data) => axios.put(url, { ...data }), {
    onSuccess(data, variables, context) {
      queryClient.setQueryData(["todo", variables._id], variables);
      queryClient.invalidateQueries(["todo", variables._id]);
      reset({ todo: "" });
    },
    onMutate(variables) {
      const oldTodo: Todo | undefined = queryClient.getQueryData([
        "todo",
        variables._id,
      ]);
      queryClient.setQueryData<Todo>(["todo", variables._id], variables);

      return () =>
        queryClient.setQueryData<Todo | undefined>(
          ["todo", variables._id],
          oldTodo
        );
    },
    onError(error, variables, rollBack) {
      rollBack?.();
    },
  });

  if (isLoading) return <span>loading..</span>;
  if (isError)
    return <span>{error?.response?.data.message ?? error.message}</span>;

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    mutate({
      _id: data._id,
      todo: formData.todo,
      completed: data.completed,
    });
  };

  return (
    <div>
      <h1>{data?.todo}</h1>

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
        <button type="submit" disabled={updateLoading || !isDirty}>
          {updateLoading ? "saving..." : "Submit"}
        </button>
        {updatingError && (
          <span>
            {updateError.response?.data.message || updateError.message}
          </span>
        )}
      </form>

      <div>
        <button>Toggle Complete</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Modify;
