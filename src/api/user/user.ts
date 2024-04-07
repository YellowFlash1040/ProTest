import api from "../axiosConfig"

export const currentUser = async () => {
  try {
    const result = await api.get("user")
    return result.data
  } catch (error) {
    console.log(error)
  }
}

export default { currentUser }
