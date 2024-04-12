import { useEffect, useState } from "react"

import PieChart from "./PieChart/PieChart"
import { PieChartData } from "../../types"

import s from "./Diagram.module.css"

interface DiagramData {
  correct: number
  incorrect: number
}

interface DiagramProps {
  data: DiagramData
}

const Diagram = ({ data }: DiagramProps) => {
  const [pieChartData, setPieChartData] = useState<PieChartData>([
    { id: "Correct", value: data.correct },
    { id: "Incorrect", value: data.incorrect },
  ])

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    setPieChartData([
      { id: "Correct", value: data.correct },
      { id: "Incorrect", value: data.incorrect },
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
    <PieChart
      data={pieChartData}
      containerClassName={s.pieChartContainer}
      shortInfoLines={screenWidth < 768}
    />
  )
}

export default Diagram
