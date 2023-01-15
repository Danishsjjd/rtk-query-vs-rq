import { useQuery, useQueryClient } from "@tanstack/react-query"

const TextInput = () => {
  const queryClient = useQueryClient()
  const { data } = useQuery(["sharedText"], () => "", {
    enabled: false,
  })
  return (
    <input
      value={data}
      placeholder="Enter Something"
      type={"text"}
      onChange={(e) => {
        queryClient.setQueryData(["sharedText"], e.target.value)
      }}
    />
  )
}

const Text = () => {
  const { data } = useQuery(["sharedText"], () => "", {
    enabled: false,
  })
  return <h3>{data}</h3>
}

const GlobalState = () => {
  return (
    <div>
      <h1>GlobalState</h1>
      <TextInput />
      <Text />
    </div>
  )
}

export default GlobalState
