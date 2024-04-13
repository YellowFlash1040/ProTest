import { useEffect } from "react"
import { Link } from "react-router-dom"

import { useAppContext } from "../../hooks"
import { PageContainer } from "../../components"
import ArrowIcon from "../../assets/ArrowRight.svg?react"

import s from "./MainPage.module.css"

const MainPage = () => {
  const { setCurrentTestType } = useAppContext()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className={s.section}>
      <PageContainer>
        <p className={s.quote}>
          Regression testing. What is it?
          <br />
          If the system compiles, that's good, if it boots, that's great!
        </p>
        <div className={s.authorInfoContainer}>
          <p className={s.authorName}>Linus Torvalds</p>
          <p className={s.additionalAuthorInfo}>
            Linux kernel creator, hacker, 1969
          </p>
        </div>
        <ul className={s.testPageLinksList}>
          <li className={s.testPageLinkItem}>
            <Link
              to={"/test"}
              className={s.testPageLink}
              onClick={() => setCurrentTestType("tech")}
            >
              <p>QA technical training</p>
              <ArrowIcon width={24} height={24} className={s.arrowIcon} />
            </Link>
          </li>
          <li className={s.testPageLinkItem}>
            <Link
              to={"/test"}
              className={s.testPageLink}
              onClick={() => setCurrentTestType("theory")}
            >
              <p>Testing theory</p>
              <ArrowIcon width={24} height={24} className={s.arrowIcon} />
            </Link>
          </li>
        </ul>
      </PageContainer>
    </section>
  )
}

export default MainPage
