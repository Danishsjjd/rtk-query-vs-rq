import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

type Props = {};

const StopWatch = (props: Props) => {
  const createWatch = () => {
    const startTime = Date.now();
    return (): number => {
      return Math.round((Date.now() - startTime) / 1000);
    };
  };

  const watch = useRef(createWatch());

  const { data } = useQuery(["StopWatch"], watch.current, {
    refetchInterval: 1000,
  });

  return (
    <div>
      <h1>StopWatch</h1>
      <span>{data}</span>
    </div>
  );
};

export default StopWatch;
