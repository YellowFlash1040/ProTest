import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAppContext } from "../hooks/useAppContext"

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation()
  const { isLoggedIn } = useAppContext()

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to={"/auth"} replace={true} state={{ from: location }} />
  )
}

export default PrivateRoute
