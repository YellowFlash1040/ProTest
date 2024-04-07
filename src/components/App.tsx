import { Navigate, Route, Routes } from "react-router-dom"

import { Layout } from "../components"
import {
  AuthPage,
  ContactsPage,
  MainPage,
  Results,
  Test,
  UsefulInfo,
} from "../pages"
import { PrivateRoute, PublicRoute } from "../routes"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route
          path='auth'
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route path='contacts' element={<ContactsPage />} />
        <Route
          path='results'
          element={
            <PrivateRoute>
              <Results />
            </PrivateRoute>
          }
        />
        <Route
          path='test'
          element={
            <PrivateRoute>
              <Test />
            </PrivateRoute>
          }
        />
        <Route path='useful-info' element={<UsefulInfo />} />
      </Route>
      <Route path='*' element={<Navigate to={"/"} />} />
    </Routes>
  )
}

export default App
