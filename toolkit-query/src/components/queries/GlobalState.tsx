import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { getText, updateText } from "../../store/globalState"

const TextInput = () => {
  const sharedText = useAppSelector(getText)
  const dispatch = useAppDispatch()

  return (
    <input
      value={sharedText}
      placeholder="Enter Something"
      type={"text"}
      onChange={(e) => {
        dispatch(updateText(e.target.value))
      }}
    />
  )
}

const Text = () => {
  const sharedText = useAppSelector(getText)
  return <h3>{sharedText}</h3>
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
