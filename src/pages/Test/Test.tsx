import { Link } from "react-router-dom"

import { Questions } from "../../components"

import s from "./Test.module.css"
import { useAppContext } from "../../hooks/useAppContext"

const Test = () => {
  const { currentTestType } = useAppContext()

  return (
    <>
      <div className={s.wrapper}>
        <p className={s.testingTheoryLabel}>
          {currentTestType === "tech" && (
            <>
              QA technical
              <br />
              training_
            </>
          )}
          {currentTestType === "theory" && (
            <>
              Testing
              <br />
              theory_
            </>
          )}
        </p>
        <Link to={"/"} className={s.finishTest}>
          Finish test
        </Link>
      </div>
      <Questions className={s.questionsComponent} />
    </>
  )
}

export default Test
