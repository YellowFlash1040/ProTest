import { Hourglass } from "react-loader-spinner"

import s from "./LazyPageLoader.module.css"

const LazyPageLoader = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className={s.loaderContainer}>
        <Hourglass width={100} height={100} />
      </div>
    </div>
  )
}

export default LazyPageLoader
