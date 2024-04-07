import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAppContext } from "../hooks/useAppContext"

interface PublicRouteProps {
  children: ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const location = useLocation()
  const { isLoggedIn } = useAppContext()

  return isLoggedIn ? (
    <Navigate to={location.state?.from || "/"} replace={true} />
  ) : (
    children
  )
}

export default PublicRoute
