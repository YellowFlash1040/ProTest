import { Answer } from "../../types"
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

const techResults = async (answers: Answer[]) => {
  try {
    const response = await api.post("qa-test/tech-results", { answers })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const theoryResults = async (answers: Answer[]) => {
  try {
    const response = await api.post("qa-test/theory-results", { answers })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default { tech, theory, techResults, theoryResults }
