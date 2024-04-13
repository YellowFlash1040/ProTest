import { useEffect } from "react"
import { nanoid } from "nanoid"

import { ContactCard, PageContainer } from "../../components"
import { CONTACTS as contacts } from "../../constants"

import s from "./ContactsPage.module.css"

const ContactsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className={s.section}>
      <PageContainer>
        <h1 className={s.sectionHeader}>Our team</h1>
        <ul className={s.contactsList}>
          {contacts.map(contact => (
            <li key={nanoid()}>
              <ContactCard
                name={contact.name}
                photo={contact.photo}
                position={contact.position}
                description={contact.description}
              />
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  )
}

export default ContactsPage
