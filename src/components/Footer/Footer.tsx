import Heart from "../../assets/Heart.svg?react"
import CopyRight from "../../assets/CopyRight.svg?react"

import s from "./Footer.module.css"
import clsx from "clsx"

const Footer = () => {
  return (
    <footer className={s.footer}>
      <ul className={s.infoList}>
        <li className={clsx(s.infoListItem, s.addAfter)}>
          <CopyRight width={18} height={18} className={s.copyRightIcon} />
          2021
        </li>
        <li className={clsx(s.infoListItem, s.addAfter)}>
          All Rights Reserved
        </li>
        <li className={s.infoListItem}>Developed with</li>
        <li className={s.infoListItem}>
          <Heart width={16} height={16} className={s.heartIcon} />
        </li>
        <li className={s.infoListItem}>
          by&nbsp;
          <a href='https://goit.global/ua/' target='_blank'>
            GoIT Students
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
