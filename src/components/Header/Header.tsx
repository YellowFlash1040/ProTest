import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import BurgerMenu from "../BurgerMenu/BurgerMenu"

import Logo from "../../assets/Logo.svg?react"

import s from "./Header.module.css"

const Header = () => {
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState<boolean>(false)

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <header className={s.header}>
      <Link
        to={"/"}
        className={s.logoLink}
        onClick={() => setIsBurgerMenuOpened(false)}
      >
        <Logo />
      </Link>
      {(screenWidth < 768 && (
        <BurgerMenu
          isOpened={isBurgerMenuOpened}
          toggleMenu={menuState => setIsBurgerMenuOpened(menuState)}
        />
      )) || (
        <nav>
          <ul>
            <li className={s.navLinkItem}>
              <Link to={"/contacts"}>Contacts</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
