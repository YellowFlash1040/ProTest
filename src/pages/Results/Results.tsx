import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import api from "../../api"
import { useAppContext } from "../../hooks/useAppContext"
import { ANSWERS } from "../../constants/localStorage/localStorage"
import { IResults } from "../../types"
import { Diagram, PageContainer } from "../../components"

import s from "./Results.module.css"

const Results = () => {
  const [results, setResults] = useState<IResults>()

  const { currentTestType } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const savedAnswers = localStorage.getItem(ANSWERS)
      if (savedAnswers) {
        const answers = JSON.parse(savedAnswers)

        let data
        if (currentTestType === "tech") {
          data = await api.qaTest.techResults(answers)
        } else if (currentTestType === "theory") {
          data = await api.qaTest.theoryResults(answers)
        }

        const countOfQuestions = 12
        const percentageFromApi = Number.parseFloat(data.result)
        const countOfRightAnswers = Math.round(
          (percentageFromApi * countOfQuestions) / 100,
        )
        const editedData: IResults = {
          countOfQuestion: countOfQuestions,
          countOfRightAnswers: countOfRightAnswers,
          rightAnswerPercentage: percentageFromApi,
          mainMessage: data.mainMessage,
          secondaryMessage: data.secondaryMessage,
        }
        setResults(editedData)
      }
    }

    fetchData()
  }, [currentTestType])

  const handleTryAgainOnClick = () => {
    localStorage.setItem(ANSWERS, "")
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
            correct: results ? results.rightAnswerPercentage : 50,
            incorrect: results ? 100 - results.rightAnswerPercentage : 50,
          }}
        />

        <ul className={s.resultsList}>
          <li className={s.correctAnswersLabel}>
            <p>
              Correct answers -{" "}
              <span className={s.boldNumbers}>
                {results?.countOfRightAnswers}
              </span>
            </p>
          </li>
          <li>
            <p>
              Total questions -{" "}
              <span className={s.boldNumbers}>{results?.countOfQuestion}</span>
            </p>
          </li>
        </ul>

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
