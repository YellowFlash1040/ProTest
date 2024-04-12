import { AuthForm, PageContainer } from "../../components"

import s from "./AuthPage.module.css"

const AuthPage = () => {
  return (
    <section className={s.section}>
      <PageContainer>
        <div className={s.desktopScreenSizeContainer}>
          <div className={s.textAndTitleWrapper}>
            <h1 className={s.title}>Pro Test</h1>
            <p className={s.text}>
              We will help you find weak points
              <br /> in knowledge so that you can strengthen it. We will show
              you what is relevant to know for a{" "}
              <span className={s.boldText}>QA Engineer</span> and will try to
              make the learning process more diverse_
            </p>
          </div>
          <AuthForm />
        </div>
      </PageContainer>
    </section>
  )
}

export default AuthPage
