import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

import { Post as PostType } from "../../models/posts";
import Post from "./Post";
import Posts from "./Posts";

type Props = {};

const Main = (props: Props) => {
  const [postId, setPostId] = useState<number>(0);

  const { data, isLoading, isError, error, isFetching } = useQuery(
    ["posts"],
    async () =>
      (
        await axios.get<PostType[]>(
          "https://jsonplaceholder.typicode.com/posts"
        )
      ).data
  );

  console.log("error", error);

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>404 not found</span>;

  return (
    data && (
      <div>
        {isFetching && <span>Updating...</span>}
        {postId ? (
          <Post
            postUrl={`https://jsonplaceholder.typicode.com/posts/${postId}`}
            setPostId={setPostId}
          />
        ) : (
          <Posts posts={data} setPostId={setPostId} />
        )}
      </div>
    )
  );
};

export default Main;
