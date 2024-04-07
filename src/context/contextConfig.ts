import { createContext } from "react"
import { TestType } from "../types"

export type stringOrNull = string | null

export type userDataType = {
  email: stringOrNull
  id: stringOrNull
}

interface AppContextProps {
  isLoggedIn: boolean
  logIn: (tokenValue: stringOrNull, userData: userDataType) => void
  userData: userDataType
  logOut: () => void
  currentTestType: TestType
  setCurrentTestType: (testType: TestType) => void
}

export const AppContext = createContext<AppContextProps>({
  isLoggedIn: false,
  logIn: () => {},
  userData: { email: null, id: null },
  logOut: () => {},
  currentTestType: "tech",
  setCurrentTestType: () => {},
})
