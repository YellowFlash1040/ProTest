// import { useEffect, useState } from "react"
// // import { ChangeEvent } from "react"

// // import { nanoid } from "nanoid"

// import ArrowIcon from "../../assets/ArrowRight.svg?react"
// import api from "../../api"
// import { Answer, Question } from "../../types"
// // import { Question } from "../../types"

// import s from "./Questions.module.css"
// import { useAppContext } from "../../hooks/useAppContext"
// import { useNavigate } from "react-router-dom"
// import clsx from "clsx"
// import RadioButtonsGroup from "./RadioButton/RadioButtonsGroup"

// type pageChangeDirection = "previous" | "next"

// interface QuestionsProps {
//   className: string
// }

// const Questions = ({ className }: QuestionsProps) => {
//   const [questions, setQuestions] = useState([])
//   const [answers, setAnswers] = useState<Answer[]>([])

//   const [activeQuestion, setActiveQuestion] = useState<Question>()
//   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

//   const [screenWidth, setScreenWidth] = useState(window.innerWidth)
//   const { currentTestType } = useAppContext()

//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchData = async () => {
//       let data
//       try {
//         if (currentTestType === "tech") {
//           data = await api.qaTest.tech()
//         } else if (currentTestType === "theory") {
//           data = await api.qaTest.theory()
//         }
//         setQuestions(data)
//         setActiveQuestion(data[0])
//       } catch (error) {
//         navigate("/auth", { replace: true })
//       }
//     }
//     fetchData()
//   }, [currentTestType, navigate])

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth)
//     }

//     window.addEventListener("resize", handleResize)

//     return () => {
//       window.removeEventListener("resize", handleResize)
//     }
//   }, [])

//   // useEffect(() => {
//   //   console.log("Answers: ", answers)
//   // }, [answers])

//   console.log("haha")

//   useEffect(() => {
//     console.log(answers[activeQuestionIndex])
//   }, [activeQuestionIndex, answers])

//   const handleQuestionChange = (direction: pageChangeDirection) => {
//     if (direction === "next") {
//       if (activeQuestionIndex <= questions.length - 2) {
//         setActiveQuestion(questions[activeQuestionIndex + 1])
//         setActiveQuestionIndex(prev => prev + 1)
//       }
//     } else if (direction === "previous") {
//       if (activeQuestionIndex >= 1) {
//         setActiveQuestion(questions[activeQuestionIndex - 1])
//         setActiveQuestionIndex(prev => prev - 1)
//       }
//     }
//   }

//   // const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
//   const handleAnswerChange = (answer: string) => {
//     // const answer = value
//     // setCurrentAnswer(answer)
//     // console.log(answer)

//     const newAnswers = [...answers]

//     newAnswers[activeQuestionIndex] = {
//       questionId: activeQuestion?.questionId,
//       answer,
//     }

//     // console.log(newAnswers)
//     setAnswers(newAnswers)

//     // const localAnswers = localStorage.getItem("answers")
//     // if (localAnswers) {
//     //   const Nanswers: string[] = JSON.parse(localAnswers)
//     //   Nanswers[activeQuestionIndex] = answer
//     //   localStorage.setItem("answers", JSON.stringify(Nanswers))
//     // } else {
//     //   const Nanswers: string[] = []
//     //   Nanswers[activeQuestionIndex] = answer
//     //   localStorage.setItem("answers", JSON.stringify(Nanswers))
//     // }
//   }

//   return (
//     <div className={clsx(className, s.questionsComponent)}>
//       <div className={s.questionnaireCard}>
//         <p className={s.questionNumberInfo}>
//           Question{" "}
//           <span className={s.questionNumber}>{activeQuestionIndex + 1}</span> /{" "}
//           {questions?.length}
//         </p>
//         <p className={s.question}>{activeQuestion?.question}</p>
//         <form className={s.testForm}>
//           {/* <ul className={s.answerOptionsList}>
//             {activeQuestion?.answers.map(answer => (
//               <li key={nanoid()}>
//                 <label className={s.answerOption}>
//                   <input
//                     className={s.hiddenRadiobutton}
//                     type='radio'
//                     name='answer'
//                     value={answer}
//                     hidden
//                     checked={answer === currentAnswer}
//                     onChange={event =>
//                       handleAnswerChange(event.currentTarget.value)
//                     }
//                   />
//                   <span className={s.customRadiobutton}></span>
//                   <p style={{ flex: 1, overflowWrap: "anywhere" }}>{answer}</p>
//                 </label>
//               </li>
//             ))}
//           </ul> */}
//           <RadioButtonsGroup
//             answers={activeQuestion?.answers}
//             selectedAnswer={answers[activeQuestionIndex]?.answer}
//             onChange={handleAnswerChange}
//           />
//         </form>
//       </div>
//       <div className={s.nextPreviousButtonsContainer}>
//         <button
//           className={s.nextPreviousButton}
//           onClick={event => {
//             event.currentTarget.blur()
//             handleQuestionChange("previous")
//           }}
//         >
//           <ArrowIcon
//             width={24}
//             height={24}
//             className={s.previousButtonArrowIcon}
//           />
//           {screenWidth > 767 && <>Previous question</>}
//         </button>
//         <button
//           className={s.nextPreviousButton}
//           onClick={event => {
//             event.currentTarget.blur()
//             handleQuestionChange("next")
//           }}
//         >
//           <ArrowIcon width={24} height={24} />
//           {screenWidth > 767 && <>Next question</>}
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Questions

// import { FieldValues, useForm } from "react-hook-form"

// import s from "../../components/Questions/RadioButton/RadioButtonsGroup.module.css" //old working
// import styles from "../../components/Questions/Questions.module.css" //old working
import { ChangeEvent, useEffect, useState } from "react"
import clsx from "clsx"

import api from "../../api"
import { useAppContext } from "../../hooks/useAppContext"
import { Question } from "../../types"
import ArrowIcon from "../../assets/ArrowRight.svg?react"

import s from "./Questions.module.css"
import { ANSWERS } from "../../constants/localStorage/localStorage"
import { useNavigate } from "react-router-dom"
import { Hourglass } from "react-loader-spinner"

interface QuestionsProps {
  className?: string
}

type pageChangeDirection = "previous" | "next"

const Questions = ({ className }: QuestionsProps) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])

  const [question, setQuestion] = useState<Question>()
  const [answerOptions, setAnswerOptions] = useState<string[]>([])

  const [index, setIndex] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState<string>()

  const [previousIndex, setPreviousIndex] = useState(0)

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
  const { currentTestType } = useAppContext()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    setCurrentAnswer(answers[index])
  }, [index, answers])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        let data
        if (currentTestType === "tech") {
          data = await api.qaTest.tech()
        } else if (currentTestType === "theory") {
          data = await api.qaTest.theory()
        }

        setQuestions(data)
        setQuestion(data[0])
        setAnswerOptions(data[0].answers)
      } catch (error) {
        console.log(error)
        navigate("/auth", { replace: true })
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [currentTestType, navigate])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const answer = event.currentTarget.value
    const newAnswers = [...answers]
    newAnswers[index] = answer
    setCurrentAnswer(answer)
    setAnswers(newAnswers)
  }

  const handleQuestionChange = (direction: pageChangeDirection) => {
    // It is used to add smooth animation of radiobutton change when you stay on the same page,
    // and to remove animation when you switch between the pages
    setPreviousIndex(index)
    //

    if (direction === "previous") {
      if (index >= 1) {
        setIndex(index - 1)
        setQuestion(questions[index - 1])
        setAnswerOptions(questions[index - 1].answers)
      }
    } else if (direction === "next") {
      if (index <= questions.length - 2) {
        setIndex(index + 1)
        setQuestion(questions[index + 1])
        setAnswerOptions(questions[index + 1].answers)
      }
    }
  }

  const finishTest = () => {
    const data = []

    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === undefined) {
        data[i] = { answer: " ", questionId: questions[i].questionId }
      } else {
        data[i] = { answer: answers[i], questionId: questions[i].questionId }
      }
    }

    console.log(data)
    localStorage.setItem(ANSWERS, JSON.stringify(data))
    navigate("/results")
  }

  return (
    <div className={clsx(className, s.questionsComponent)}>
      <div
        className={clsx(s.questionnaireCard, {
          [s.questionnaireCardMinHeight]: isLoading,
        })}
      >
        {(isLoading && <Hourglass wrapperClass={s.loader} />) || (
          <>
            <p className={s.questionNumberInfo}>
              Question <span className={s.questionNumber}>{index + 1}</span> /{" "}
              {questions?.length}
            </p>
            <p className={s.question}>{question?.question}</p>
            <form
              className={s.testForm}
              onClick={() => {
                setPreviousIndex(index)
              }}
            >
              <ul className={s.answerOptionsList}>
                {answerOptions.map(answerOption => (
                  <li key={answerOption}>
                    <label className={s.answerOption}>
                      <input
                        className={s.hiddenRadiobutton}
                        type='radio'
                        name='answer'
                        hidden
                        value={answerOption}
                        checked={answerOption === currentAnswer}
                        onChange={handleOnChange}
                      />
                      <span
                        className={clsx(s.customRadiobutton, {
                          [s.customRadiobuttonTransition]:
                            previousIndex === index,
                        })}
                      ></span>
                      <p style={{ flex: 1, overflowWrap: "anywhere" }}>
                        {answerOption}
                      </p>
                    </label>
                  </li>
                ))}
              </ul>
            </form>
          </>
        )}
      </div>
      <div className={s.nextPreviousButtonsContainer}>
        {!isLoading && (
          <>
            <button
              className={s.nextPreviousButton}
              onClick={event => {
                event.currentTarget.blur()
                handleQuestionChange("previous")
              }}
            >
              <ArrowIcon
                width={24}
                height={24}
                className={s.previousButtonArrowIcon}
              />
              {screenWidth > 767 && <>Previous question</>}
            </button>
            {(index === questions.length - 1 && (
              <button
                className={s.checkResultsButton}
                onClick={() => {
                  finishTest()
                }}
              >
                Check results
              </button>
            )) || (
              <button
                className={s.nextPreviousButton}
                onClick={event => {
                  event.currentTarget.blur()
                  handleQuestionChange("next")
                }}
              >
                <ArrowIcon width={24} height={24} />
                {screenWidth > 767 && <>Next question</>}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Questions
