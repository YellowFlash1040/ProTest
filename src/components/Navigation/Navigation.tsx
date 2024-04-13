import { NavLink } from "react-router-dom"
import clsx from "clsx"

import { useAppContext } from "../../hooks/useAppContext"

import s from "./Navigation.module.css"

const Navigation = () => {
  const { isLoggedIn } = useAppContext()

  return (
    <nav className={s.navigation}>
      <ul className={s.navList}>
        {isLoggedIn && (
          <>
            <li className={s.navLinkItem}>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li className={s.navLinkItem}>
              <NavLink to={"/useful-info"}>Materials</NavLink>
            </li>
          </>
        )}
        <li className={s.navLinkItem}>
          {(isLoggedIn && <NavLink to={"/contacts"}>Contacts</NavLink>) || (
            <a
              href={`${window.location.origin}/contacts`}
              className={clsx({
                active:
                  window.location.toString() ===
                    `${window.location.origin}/contacts` && !isLoggedIn,
              })}
            >
              Contacts
            </a>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
