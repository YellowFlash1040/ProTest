import { NavLink } from "react-router-dom"

import s from "./Navigation.module.css"
import { useAppContext } from "../../hooks/useAppContext"

const Navigation = () => {
  const { isLoggedIn } = useAppContext()

  return (
    <nav>
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
          <NavLink to={"/contacts"}>Contacts</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
