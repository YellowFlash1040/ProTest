import { ReactNode } from "react"
import s from "./PageContainer.module.css"

interface PageContainerProps {
  children: ReactNode
}

const PageContainer = ({ children }: PageContainerProps) => {
  return <div className={s.pageContainer}>{children}</div>
}

export default PageContainer
