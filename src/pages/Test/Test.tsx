import { useEffect } from "react"
import { Link } from "react-router-dom"

import { PageContainer, Questions } from "../../components"
import { useAppContext } from "../../hooks"

import s from "./Test.module.css"

const Test = () => {
  const { currentTestType } = useAppContext()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className={s.section}>
      <PageContainer>
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
      </PageContainer>
    </section>
  )
}

export default Test
