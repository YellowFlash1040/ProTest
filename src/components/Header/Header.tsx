import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// import clsx from "clsx"

import BurgerMenu from "../BurgerMenu/BurgerMenu"
import Logo from "../Logo/Logo"
import Navigation from "../Navigation/Navigation"
import UserInfo from "../UserInfo/UserInfo"
import SignOutIcon from "../../assets/SignOut.svg?react"
import { useAppContext } from "../../hooks/useAppContext"

import s from "./Header.module.css"

const Header = () => {
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState<boolean>(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const { isLoggedIn, logOut } = useAppContext()

  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleSignOut = async () => {
    await logOut()
    navigate("/auth", { replace: true })
  }

  return (
    <header
      // className={clsx(s.header, {
      //   [s.addHeaderPadding]: !isLoggedIn && screenWidth > 767,
      // })}
      className={s.header}
    >
      <Logo onClick={() => setIsBurgerMenuOpened(false)} />
      <div className={s.navigationAndUserWrapper}>
        {(screenWidth < 768 && (
          <BurgerMenu
            isOpened={isBurgerMenuOpened}
            toggleMenu={menuState => setIsBurgerMenuOpened(menuState)}
          />
        )) || <Navigation />}
        {isLoggedIn && !isBurgerMenuOpened && (
          <>
            <UserInfo />
            {screenWidth > 767 && (
              <div
                className={s.signOutIconContainer}
                onClick={() => handleSignOut()}
              >
                <SignOutIcon width={16} height={16} />
              </div>
            )}
          </>
        )}
      </div>
    </header>
  )
}

export default Header
