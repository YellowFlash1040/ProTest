import { ReactNode, useState, useEffect } from "react"

import {
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  SID_KEY,
  TEST_TYPE_KEY,
} from "../constants"
import api from "../api"
import { setAxiosToken } from "../api/axiosConfig"
import { Answer, TestType, UserCredentials } from "../types"

import { AppContext, userDataType } from "./contextConfig"

interface AppContextProviderProps {
  children: ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<userDataType>({
    email: null,
    id: null,
  })
  const [currentTestType, setCurrentTestType] = useState<TestType>(
    JSON.parse(localStorage.getItem(TEST_TYPE_KEY) || `"tech"`),
  )
  const [answers, setAnswers] = useState<Answer[]>([])

  useEffect(() => {
    const loginOnApplicationStart = async () => {
      const savedToken = localStorage.getItem(TOKEN_KEY)
      if (savedToken) {
        const tokenValue = JSON.parse(savedToken)
        if (tokenValue !== null) {
          setAxiosToken(tokenValue)

          const fetchUsersData = async () => {
            const data = await api.user.currentUser()
            setUserData(data)
            setIsLoggedIn(true)
          }

          const tryLogin = async () => {
            try {
              await fetchUsersData()
            } catch (error) {
              await refresh()
              await fetchUsersData()
            }
          }

          await tryLogin()
        }
      }
    }

    loginOnApplicationStart()
  }, [])

  useEffect(() => {
    const testType = JSON.stringify(currentTestType)
    localStorage.setItem(TEST_TYPE_KEY, testType)
  }, [currentTestType])

  // const logIn = (
  //   token: stringOrNull,
  //   refreshToken: stringOrNull,
  //   sid: stringOrNull,
  //   userData: userDataType,
  // ) => {
  //   if (token) {
  //     setIsLoggedIn(true)
  //     localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
  //     localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(refreshToken))
  //     localStorage.setItem(SID_KEY, JSON.stringify(sid))
  //     setAxiosToken(token)
  //     setUserData(userData)
  //   }
  // }

  const logIn = async (data: UserCredentials) => {
    const result = await api.auth.login(data)
    const { accessToken: token, refreshToken, sid, userData } = result
    if (token) {
      setIsLoggedIn(true)
      localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
      localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(refreshToken))
      localStorage.setItem(SID_KEY, JSON.stringify(sid))
      setAxiosToken(token)
      setUserData(userData)
    }
  }

  const logOut = async () => {
    const clearSessionData = () => {
      setAxiosToken("")
      localStorage.setItem(TOKEN_KEY, JSON.stringify(null))
      localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(null))
      localStorage.setItem(SID_KEY, JSON.stringify(null))
      setUserData({ email: null, id: null })
    }

    const logOutUser = async () => {
      await api.auth.logout()
      clearSessionData()
    }

    setIsLoggedIn(false)
    try {
      await logOutUser()
    } catch (error) {
      await refresh()
      await api.auth.logout()
      clearSessionData()
    }
  }

  const refresh = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
    if (refreshToken) {
      const refreshTokenValue = JSON.parse(refreshToken)
      setAxiosToken(refreshTokenValue)

      const refreshUser = async (sid: string) => {
        const result = await api.auth.refresh(sid)
        if (result) {
          const { newAccessToken, newRefreshToken, newSid } = result
          localStorage.setItem(TOKEN_KEY, JSON.stringify(newAccessToken))
          localStorage.setItem(
            REFRESH_TOKEN_KEY,
            JSON.stringify(newRefreshToken),
          )
          localStorage.setItem(SID_KEY, JSON.stringify(newSid))

          setAxiosToken(newAccessToken)
        }
      }

      const savedSid = localStorage.getItem(SID_KEY)
      if (savedSid) {
        const sid = JSON.parse(savedSid)
        refreshUser(sid)
      }
    }
  }

  // const saveAnswers(answers: Answer[]) => {
  //   setAnswers(answers)
  //   localStorage.setItem()
  // }

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        logIn,
        userData,
        logOut,
        currentTestType,
        setCurrentTestType,
        answers,
        setAnswers,
        refresh,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
