import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { App } from "./components"

import "modern-normalize/modern-normalize.css"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
