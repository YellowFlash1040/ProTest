import { isAxiosError } from "axios"

import api, { setAxiosToken } from "../axiosConfig"

interface UserCredentials {
  email: string
  password: string
}

export const register = async (credentials: UserCredentials) => {
  try {
    const result = await api.post("auth/register", credentials)
    return result.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error
    } else {
      console.log(error)
    }
  }
}

export const login = async (credentials: UserCredentials) => {
  try {
    const result = await api.post("auth/login", credentials)
    const { accessToken } = result.data
    setAxiosToken(accessToken)
    return result.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error
    } else {
      console.log(error)
    }
  }
}

export const logout = async () => {
  try {
    await api.post("auth/logout")
    setAxiosToken("")
  } catch (error) {
    if (isAxiosError(error)) {
      throw error
    } else {
      console.log(error)
    }
  }
}

export const refresh = async (sid: string) => {
  try {
    const result = await api.post("auth/refresh", { sid })
    return result.data
  } catch (error) {
    console.log(error)
  }
}

export const loginWithGoogle = async () => {
  try {
    await api.post("auth/google")
  } catch (error) {
    console.log(error)
  }
}

export default {
  register,
  login,
  logout,
  refresh,
}
