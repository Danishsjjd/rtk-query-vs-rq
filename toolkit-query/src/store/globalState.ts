import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

const initialState = {
  sharedText: "",
}

const globalState = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    updateText: (state, { payload }: PayloadAction<string>) => {
      state.sharedText = payload
    },
  },
})

export const { updateText } = globalState.actions

export const getText = (state: RootState) => state.globalState.sharedText

export default globalState.reducer
