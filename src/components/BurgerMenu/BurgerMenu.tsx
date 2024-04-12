import { useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import clsx from "clsx"

import BurgerMenuIcon from "../../assets/BurgerMenu.svg?react"
import CrossIcon from "../../assets/Cross.svg?react"
import SignOutIcon from "../../assets/SignOut.svg?react"
import { useAppContext } from "../../hooks/useAppContext"

import s from "./BurgerMenu.module.css"

interface BurgerMenuProps {
  isOpened: boolean
  toggleMenu: (menuState: boolean) => void
}

const BurgerMenu = ({ isOpened, toggleMenu }: BurgerMenuProps) => {
  const { isLoggedIn, logOut } = useAppContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isOpened])

  const handleSignOut = async () => {
    await logOut()
    navigate("/auth", { replace: true })
  }

  return (
    <>
      <button
        className={s.burgerMenuButton}
        onClick={() => {
          toggleMenu(!isOpened)
        }}
      >
        {(isOpened && <CrossIcon width={20} height={20} />) || (
          <BurgerMenuIcon width={20} height={20} className={s.burgerMenuIcon} />
        )}
      </button>
      <div
        className={clsx(s.burgerMenuContainer, {
          [s.openedBurgerMenu]: isOpened,
        })}
      >
        <nav>
          <ul className={s.navList}>
            {isLoggedIn && (
              <>
                <li className={s.navLinkItem}>
                  <NavLink
                    to={"/"}
                    onClick={() => toggleMenu(false)}
                    className={s.Link}
                  >
                    <span className={s.navLinkItemText}>Home</span>
                  </NavLink>
                </li>
                <li className={s.navLinkItem}>
                  <NavLink
                    to={"/useful-info"}
                    onClick={() => toggleMenu(false)}
                    className={s.Link}
                  >
                    <span className={s.navLinkItemText}>Materials</span>
                  </NavLink>
                </li>
              </>
            )}
            <li className={s.navLinkItem}>
              <NavLink
                to={"/contacts"}
                onClick={() => toggleMenu(false)}
                className={s.Link}
              >
                <span className={s.navLinkItemText}>Contacts</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        {isLoggedIn && (
          <div
            className={s.signOutIconContainer}
            onClick={() => {
              handleSignOut()
              toggleMenu(false)
            }}
          >
            <SignOutIcon width={16} height={16} />
          </div>
        )}
      </div>
    </>
  )
}

export default BurgerMenu
