import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import store from "./store/store"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApiProvider api={todoApi}> */}
      <App />
      {/* </ApiProvider> */}
    </Provider>
  </React.StrictMode>
)