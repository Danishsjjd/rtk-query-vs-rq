import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { url } from "./index";
import { queryClient } from "../../../basic/src/App";
type Props = {};

type FormValue = {
  todo: string;
};

const Create = (props: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValue>({});

  const { mutate, isLoading, isError, error } = useMutation<
    null,
    AxiosError<{ message: string }>,
    FormValue,
    { id: string }
  >((data) => axios.post(url, { todo: data.todo }), {
    onSettled() {
      queryClient.invalidateQueries(["todos"]);
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
