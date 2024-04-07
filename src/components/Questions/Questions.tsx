import { useEffect, useState } from "react"
import { nanoid } from "nanoid"

import ArrowIcon from "../../assets/ArrowRight.svg?react"
import api from "../../api"
import { Question } from "../../types"

import s from "./Questions.module.css"
import { useAppContext } from "../../hooks/useAppContext"

type pageChangeDirection = "previous" | "next"

interface QuestionsProps {
  className: string
}

const Questions = ({ className }: QuestionsProps) => {
  const [questions, setQuestions] = useState([])
  const [activeQuestion, setActiveQuestion] = useState<Question>()
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

  const { currentTestType } = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      let data
      if (currentTestType === "tech") {
        data = await api.qaTest.tech()
      } else if (currentTestType === "theory") {
        data = await api.qaTest.theory()
      }
      setQuestions(data)
      setActiveQuestion(data[0])
    }
    fetchData()
  }, [currentTestType])

  const handleQuestionChange = (direction: pageChangeDirection) => {
    if (direction === "next") {
      if (activeQuestionIndex <= questions.length - 2) {
        setActiveQuestion(questions[activeQuestionIndex + 1])
        setActiveQuestionIndex(prev => prev + 1)
      }
    } else if (direction === "previous") {
      if (activeQuestionIndex >= 1) {
        setActiveQuestion(questions[activeQuestionIndex - 1])
        setActiveQuestionIndex(prev => prev - 1)
      }
    }
  }

  return (
    <div className={className}>
      <div className={s.questionnaireCard}>
        <p className={s.questionNumberInfo}>
          Question{" "}
          <span className={s.questionNumber}>{activeQuestionIndex + 1}</span> /{" "}
          {questions.length}
        </p>
        <p className={s.question}>{activeQuestion?.question}</p>
        <form className={s.testForm}>
          <ul className={s.answerOptionsList}>
            {activeQuestion?.answers.map(answer => (
              <li key={nanoid()}>
                <label className={s.answerOption}>
                  <input
                    className={s.hiddenRadiobutton}
                    type='radio'
                    name='answer'
                    value={answer}
                    hidden
                  />
                  <span className={s.customRadiobutton}></span>
                  <p style={{ flex: 1, overflowWrap: "anywhere" }}>{answer}</p>
                </label>
              </li>
            ))}
          </ul>
        </form>
      </div>
      <div className={s.nextPreviousButtonsContainer}>
        <button
          className={s.nextPreviousButton}
          onClick={() => handleQuestionChange("previous")}
        >
          <ArrowIcon
            width={24}
            height={24}
            className={s.previousButtonArrowIcon}
          />
        </button>
        <button
          className={s.nextPreviousButton}
          onClick={() => handleQuestionChange("next")}
        >
          <ArrowIcon width={24} height={24} />
        </button>
      </div>
    </div>
  )
}

export default Questions
