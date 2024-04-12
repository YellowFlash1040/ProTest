import api from "../axiosConfig"

export const currentUser = async () => {
  try {
    const result = await api.get("user")
    return result.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default { currentUser }
