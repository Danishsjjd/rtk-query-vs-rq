import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { User } from "../../models/pokemon"
import existingUser from "../../store/existingUser"

interface Products {
  userId: number
  id: number
  title: string
  body: string
}

const email = "Sincere@april.biz"

const DependentQueries = () => {
  const { data, isLoading } = useQuery(
    ["user"],
    async () => {
      await new Promise((res) => setTimeout(res, 2000))
      return (
        await axios.get<[User]>(
          `https://jsonplaceholder.typicode.com/users?email=${email}`
        )
      ).data
    },
    {
      // placeholderData: [existingUser],
      initialData: [existingUser],
      staleTime: 1000,
      // staleTime: Infinity,
    }
  )

  const {
    data: postsData,
    isLoading: postLoading,
    fetchStatus,
  } = useQuery(
    ["posts"],
    async () =>
      await axios.get<Products[]>(
        `https://jsonplaceholder.typicode.com/posts?${data?.[0].id}`
      ),
    { enabled: !!data?.[0]?.id }
  )

  return (
    <>
      {isLoading ? (
        <span>Loading User....</span>
      ) : (
        <div>
          <h2>
            user full name:{" "}
            <span style={{ color: "red" }}>{data?.[0].name}</span>
            UserId: <span style={{ color: "red" }}>{data?.[0].id}</span>
          </h2>
        </div>
      )}
      <div>
        <h2>User Posts</h2>
        {fetchStatus === "idle" && postLoading ? null : postLoading ? (
          "loadingPost...."
        ) : (
          <ul>
            {postsData?.data.map((product) => {
              return <li key={product.id}>{product.title}</li>
            })}
          </ul>
        )}
      </div>
    </>
  )
}

export default DependentQueries
