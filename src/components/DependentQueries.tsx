import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../models/pokemon";
import existingUser from "../store/existingUser";

type Props = {};

interface Products {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const email = "Sincere@april.biz";

const DependentQueries = (props: Props) => {
  const { data, isLoading } = useQuery(
    ["user"],
    async () => {
      await new Promise((res) => setTimeout(res, 2000));
      return await axios
        .get<[User]>(
          `https://jsonplaceholder.typicode.com/users?email=${email}`
        )
        .then((data): { data: [User]; headers?: Object } => ({
          data: data.data,
          headers: data.headers,
        }));
    },
    {
      initialData: { data: [existingUser] },
    }
  );

  const {
    data: postsData,
    isLoading: postLoading,
    fetchStatus,
  } = useQuery(
    ["posts"],
    async () =>
      await axios.get<Products[]>(
        `https://jsonplaceholder.typicode.com/posts?${data?.data[0].id}`
      ),
    { enabled: !!data?.data[0]?.id }
  );

  return (
    <>
      {isLoading ? (
        <span>Loading User....</span>
      ) : (
        <div>
          <h2>
            user full name:{" "}
            <span style={{ color: "red" }}>{data?.data[0].name}</span>
            UserId: <span style={{ color: "red" }}>{data?.data[0].id}</span>
          </h2>
        </div>
      )}
      <div>
        <h2>User Posts</h2>
        {fetchStatus === "idle" && postLoading
          ? null
          : postLoading
          ? "loadingPost...."
          : postsData?.data.map((product) => {
              return (
                <div key={product.id}>
                  <h3>Title: {product.title}</h3>
                  <p>Body: {product.body}</p>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default DependentQueries;
