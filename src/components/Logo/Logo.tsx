import { Link, useLocation } from "react-router-dom"
import { MouseEvent } from "react"

import LogoIcon from "../../assets/Logo.svg?react"

import s from "./Logo.module.css"

interface LogoProps {
  onClick: () => void
}

const Logo = ({ onClick }: LogoProps) => {
  const location = useLocation()

  const handleOnClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/auth") {
      event.preventDefault()
    }

    onClick()
  }

  return (
    <Link to={"/"} className={s.logoLink} onClick={handleOnClick}>
      <LogoIcon />
    </Link>
  )
}

export default Logo
