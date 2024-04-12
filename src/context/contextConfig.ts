import { createContext } from "react"
import { Answer, TestType, UserCredentials } from "../types"

export type stringOrNull = string | null

export type userDataType = {
  email: stringOrNull
  id: stringOrNull
}

interface AppContextProps {
  isLoggedIn: boolean
  logIn: (data: UserCredentials) => void
  userData: userDataType
  logOut: () => void
  currentTestType: TestType
  setCurrentTestType: (testType: TestType) => void
  answers: Answer[]
  setAnswers: (answers: Answer[]) => void
  refresh: () => void
}

export const AppContext = createContext<AppContextProps>({
  isLoggedIn: false,
  logIn: () => {},
  userData: { email: null, id: null },
  logOut: () => {},
  currentTestType: "tech",
  setCurrentTestType: () => {},
  answers: [],
  setAnswers: () => {},
  refresh: () => {},
})
