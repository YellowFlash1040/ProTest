import clsx from "clsx"

import BurgerMenuIcon from "../../assets/BurgerMenu.svg?react"
import CrossIcon from "../../assets/Cross.svg?react"

import s from "./BurgerMenu.module.css"
import { Link } from "react-router-dom"

interface BurgerMenuProps {
  isOpened: boolean
  toggleMenu: (menuState: boolean) => void
}

const BurgerMenu = ({ isOpened, toggleMenu }: BurgerMenuProps) => {
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
          <ul>
            <li className={s.navLinkItem}>
              <Link
                to={"/contacts"}
                onClick={() => toggleMenu(false)}
                className={s.Link}
              >
                <span className={s.navLinkItemText}>Contacts</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default BurgerMenu
