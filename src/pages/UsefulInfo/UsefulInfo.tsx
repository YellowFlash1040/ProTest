import s from "./UsefulInfo.module.css"

const UserfulInfo = () => {
  return (
    <section className={s.section}>
      <div className={s.infoBlockContainer}>
        <h2 className={s.usefulLiteratureLabel}>Useful literature</h2>
        <ol className={s.usefulLiteratureList}>
          <li>Testing dot.com Savin.</li>
          <li>A mental hospital in the hands of patients.</li>
          <li>Scrum. J. Sutherland.</li>
        </ol>
      </div>

      <div className={s.infoBlockContainer}>
        <h2 className={s.usefulResourcesLabel}>Useful literature</h2>
        <ol className={s.usefulResourcesList}>
          <li>
            &#160;
            <a className={s.resourceLink} href='https://dou.ua' target='_blank'>
              dou.ua
            </a>
          </li>
          <li>
            &#160;
            <a
              className={s.resourceLink}
              href='https://habr.com'
              target='_blank'
            >
              Habr
            </a>
          </li>
          <li>
            &#160;
            <a
              className={s.resourceLink}
              href='https://facebook.com/QA'
              target='_blank'
            >
              facebook.com/QA
            </a>
          </li>
          <li>
            &#160;
            <a
              className={s.resourceLink}
              href='https://goit.ua'
              target='_blank'
            >
              goit.ua
            </a>
          </li>
        </ol>
      </div>
    </section>
  )
}

export default UserfulInfo
