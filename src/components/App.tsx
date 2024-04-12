import { Navigate, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"

import { PrivateRoute, PublicRoute } from "../routes"
import { Layout, LazyPageLoader } from "../components"

const MainPage = lazy(() => import("../pages/MainPage/MainPage"))
const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"))
const ContactsPage = lazy(() => import("../pages/ContactsPage/ContactsPage"))
const Results = lazy(() => import("../pages/Results/Results"))
const Test = lazy(() => import("../pages/Test/Test"))
const UsefulInfo = lazy(() => import("../pages/UsefulInfo/UsefulInfo"))

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<LazyPageLoader />}>
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path='auth'
          element={
            <Suspense fallback={<LazyPageLoader />}>
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path='contacts'
          element={
            <Suspense fallback={<LazyPageLoader />}>
              <ContactsPage />
            </Suspense>
          }
        />
        <Route
          path='results'
          element={
            <Suspense fallback={<LazyPageLoader />}>
              <PrivateRoute>
                <Results />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path='test'
          element={
            <Suspense fallback={<LazyPageLoader />}>
              <PrivateRoute>
                <Test />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path='useful-info'
          element={
            <Suspense fallback={<LazyPageLoader />}>
              <UsefulInfo />
            </Suspense>
          }
        />
      </Route>
      <Route path='*' element={<Navigate to={"/"} />} />
    </Routes>
  )
}

export default App
