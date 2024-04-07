import { useAppContext } from "../../hooks/useAppContext"

import s from "./UserInfo.module.css"

const UserInfo = () => {
  const { userData: { email } = { email: null } } = useAppContext()
  const letter = (email && email[0].toUpperCase()) || "?"

  return (
    <div className={s.profileCard}>
      <div className={s.profileImageWrapper}>{letter}</div>
      <span className={s.userName}>{email}</span>
    </div>
  )
}

export default UserInfo
