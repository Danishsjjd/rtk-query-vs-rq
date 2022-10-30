import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

import { queryClient } from "../../App";
import { Todo } from "../../models/todo";
import { url } from "./index";

type FormValue = {
  todo: string;
};

const Create = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormValue>({});

  const { mutate, isLoading, isError, error } = useMutation<
    Todo,
    AxiosError<{ message: string }>,
    FormValue,
    () => Todo[] | undefined
  >((data) => axios.post(url, { todo: data.todo }), {
    onSuccess() {
      queryClient.invalidateQueries(["todos"]);
      reset({ todo: "" });
    },
    onMutate(variables) {
      let oldData: Todo[] | undefined;
      queryClient.setQueryData<Todo[]>(["todos"], (previousTodo) => {
        oldData = previousTodo;
        if (typeof previousTodo !== "undefined")
          return [
            ...previousTodo,
            {
              _id: Date.now().toString(),
              completed: false,
              todo: variables.todo,
            },
          ];
      });
      return () => queryClient.setQueryData<Todo[]>(["todos"], oldData);
    },
    onError(error, variables, rollback) {
      rollback?.();
    },
  });

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    mutate(data);
  };

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
      <button type="submit">{isLoading ? "saving..." : "Submit"}</button>
      {isError ? error?.response?.data?.message : null}
    </form>
  );
};

export default Create;
