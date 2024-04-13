import { useEffect, useState } from "react"

import { PieChartData } from "../../types"
import PieChart from "./PieChart/PieChart"

import s from "./Diagram.module.css"

interface DiagramData {
  rightAnswerPercentage: number
  countOfQuestions: number
}

interface DiagramProps {
  data: DiagramData
}

const Diagram = ({ data }: DiagramProps) => {
  const [pieChartData, setPieChartData] = useState<PieChartData>([
    { id: "Correct", value: 50 },
    { id: "Incorrect", value: 50 },
  ])
  const [countOfRightAnswers, setCountOfRightAnswers] = useState<number>()

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const countOfQuestions = data.countOfQuestions
    const rightAnswerPercentage = data.rightAnswerPercentage
    const count = Math.round((rightAnswerPercentage * countOfQuestions) / 100)
    setCountOfRightAnswers(count)

    setPieChartData([
      { id: "Correct", value: rightAnswerPercentage },
      { id: "Incorrect", value: 100 - rightAnswerPercentage },
    ])
  }, [data])

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <PieChart
        data={pieChartData}
        containerClassName={s.pieChartContainer}
        shortInfoLines={screenWidth < 768}
      />

      <ul className={s.resultsList}>
        <li className={s.correctAnswersLabel}>
          <p>
            Correct answers -{" "}
            <span className={s.boldNumbers}>{countOfRightAnswers}</span>
          </p>
        </li>
        <li>
          <p>
            Total questions -{" "}
            <span className={s.boldNumbers}>
              {data.countOfQuestions || " "}
            </span>
          </p>
        </li>
      </ul>
    </>
  )
}

export default Diagram
