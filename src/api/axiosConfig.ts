import axios from "axios"

const api = axios.create({
  baseURL: "https://protest-backend.goit.global/",
})

export const setAxiosToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

// export const clearToken = () => {
//   api.defaults.headers.common.Authorization = ""
// }

export default api
