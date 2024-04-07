import { Link } from "react-router-dom"

import LogoIcon from "../../assets/Logo.svg?react"

import s from "./Logo.module.css"

interface LogoProps {
  onClick: () => void
}

const Logo = ({ onClick }: LogoProps) => {
  return (
    <Link to={"/"} className={s.logoLink} onClick={() => onClick()}>
      <LogoIcon />
    </Link>
  )
}

export default Logo
