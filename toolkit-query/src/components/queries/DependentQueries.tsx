import {
  useGetPostsByUserQuery,
  useGetUserQuery,
  User,
} from "../../store/services/api"
import { useGetPokemonQuery } from "../../store/services/pokemon"

const existingUser: User = {
  id: 1,
  name: "Sajjad Ahmed",
}

const email = "Sincere@april.biz"

const DependentQueries = () => {
  const { data = [existingUser] } = useGetUserQuery(email)
  const {
    data: postsData,
    isLoading: postLoading,
    isUninitialized,
  } = useGetPostsByUserQuery(data[0].id, {
    skip: !data,
  })

  return (
    <>
      <div>
        <h2>
          user full name: <span style={{ color: "red" }}>{data?.[0].name}</span>
          UserId: <span style={{ color: "red" }}>{data?.[0].id}</span>
        </h2>
      </div>
      <div>
        <h2>User Posts</h2>
        {postLoading ? (
          "loadingPost...."
        ) : isUninitialized ? (
          "fetching is not started yet!"
        ) : (
          <ul>
            {postsData?.map((product) => {
              return <li key={product.id}>{product.title}</li>
            })}
          </ul>
        )}
      </div>
    </>
  )
}

export default DependentQueries
