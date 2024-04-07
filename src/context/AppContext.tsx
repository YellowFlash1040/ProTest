import { ReactNode, useState, useEffect } from "react"
import { TOKEN_KEY } from "../constants/localStorage/localStorage"
import api from "../api"
import { setAxiosToken } from "../api/axiosConfig"
import { AppContext, stringOrNull, userDataType } from "./contextConfig"
import { TestType } from "../types"

interface AppContextProviderProps {
  children: ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<userDataType>({
    email: null,
    id: null,
  })
  const [currentTestType, setCurrentTestType] = useState<TestType>("tech")

  useEffect(() => {
    const loadDataFromLocalStorage = () => {
      const savedToken = localStorage.getItem(TOKEN_KEY)
      if (savedToken) {
        const tokenValue = JSON.parse(savedToken)
        if (tokenValue !== null) {
          setAxiosToken(tokenValue)
          const fetchData = async () => {
            const data = await api.user.currentUser()
            if (data !== null && data !== undefined) {
              setIsLoggedIn(true)
              setUserData(data)
            }
          }
          fetchData()
        }
      }
    }

    loadDataFromLocalStorage()
  }, [])

  const logIn = (token: stringOrNull, userData: userDataType) => {
    if (token) {
      setIsLoggedIn(true)
      localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
      setAxiosToken(token)
    }
    setUserData(userData)
  }

  const logOut = () => {
    setIsLoggedIn(false)
    setAxiosToken("")
    localStorage.setItem(TOKEN_KEY, JSON.stringify(null))
    setUserData({ email: null, id: null })
  }

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        logIn,
        userData,
        logOut,
        currentTestType,
        setCurrentTestType,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
