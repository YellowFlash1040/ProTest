import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import api from "../../api"
import { useAppContext } from "../../hooks"
import { ANSWERS_KEY } from "../../constants"
import { Answer, IResults } from "../../types"
import { Diagram, PageContainer } from "../../components"

import s from "./Results.module.css"

const Results = () => {
  const [results, setResults] = useState<IResults>()

  const { currentTestType, refresh } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchResults = async (answers: Answer[]) => {
      let data
      if (currentTestType === "tech") {
        data = await api.qaTest.techResults(answers)
      } else if (currentTestType === "theory") {
        data = await api.qaTest.theoryResults(answers)
      }

      const percentageFromApi = Number.parseFloat(data.result)

      const editedData: IResults = {
        countOfQuestion: answers.length,
        rightAnswerPercentage: percentageFromApi,
        mainMessage: data.mainMessage,
        secondaryMessage: data.secondaryMessage,
      }
      setResults(editedData)
    }

    const fetchData = async () => {
      const savedAnswers = localStorage.getItem(ANSWERS_KEY)
      if (savedAnswers) {
        const answers = JSON.parse(savedAnswers)
        try {
          await fetchResults(answers)
        } catch (error) {
          try {
            await refresh()
            await fetchResults(answers)
          } catch (error) {
            navigate("/auth", { replace: true })
          }
        }
      }
    }

    fetchData()
  }, [currentTestType, navigate, refresh])

  const handleTryAgainOnClick = () => {
    localStorage.setItem(ANSWERS_KEY, "")
    navigate("/test")
  }

  return (
    <PageContainer>
      <section className={s.section}>
        <div className={s.decorativeContainer}>
          <h1 className={s.resultsLabel}>Results</h1>
          <h2 className={s.testTypeLabel}>
            {(currentTestType === "theory" && <> Testing theory_</>) || (
              <> QA technical training_</>
            )}
          </h2>
        </div>

        <Diagram
          data={{
            countOfQuestions: results ? results.countOfQuestion : 12,
            rightAnswerPercentage: results ? results.rightAnswerPercentage : 50,
          }}
        />

        <div className={s.catImage} />

        <h3 className={s.resultInTextForm}>{results?.mainMessage}</h3>
        <p className={s.resultsComment}>{results?.secondaryMessage}</p>
        <button className={s.tryAgainButton} onClick={handleTryAgainOnClick}>
          Try again
        </button>
      </section>
    </PageContainer>
  )
}

export default Results
