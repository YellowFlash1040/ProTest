import api from "../axiosConfig"

const tech = async () => {
  try {
    const result = await api.get("qa-test/tech")
    return result.data
  } catch (error) {
    console.log(error)
  }
}

const theory = async () => {
  try {
    const result = await api.get("qa-test/theory")
    return result.data
  } catch (error) {
    console.log(error)
  }
}

export default { tech, theory }
