import { useContext } from "react"

import { AppContext } from "../context/contextConfig"

export const useAppContext = () => useContext(AppContext)
