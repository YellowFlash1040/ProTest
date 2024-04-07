import { Outlet } from "react-router-dom"

import { Footer, Header, PageContainer } from "../../components"

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </main>
      <Footer />
    </>
  )
}

export default Layout
