import { nanoid } from "nanoid"
import { ContactCard, PageContainer } from "../../components"

import s from "./ContactsPage.module.css"

const ContactsPage = () => {
  const contacts = [
    {
      name: "Andrii Kovtunets",
      photo: "../images/jpg/Me.jpg",
      position: "Front-End Developer",
      description: `Lorem Ipsum has been the standard "fish" for Latin texts since the early 16th century.`,
    },
    {
      name: "Name",
      photo: "../images/png/contact-photo.png",
      position: "Front-End Developer",
      description: `Lorem Ipsum has been the standard "fish" for Latin texts since the early 16th century.`,
    },
    {
      name: "Name",
      photo: "../images/png/contact-photo.png",
      position: "Front-End Developer",
      description: `Lorem Ipsum has been the standard "fish" for Latin texts since the early 16th century.`,
    },
    {
      name: "Name",
      photo: "../images/png/contact-photo.png",
      position: "Front-End Developer",
      description: `Lorem Ipsum has been the standard "fish" for Latin texts since the early 16th century.`,
    },
    {
      name: "Name",
      photo: "../images/png/contact-photo.png",
      position: "Front-End Developer",
      description: `Lorem Ipsum has been the standard "fish" for Latin texts since the early 16th century.`,
    },
    {
      name: "Name",
      photo: "../images/png/contact-photo.png",
      position: "Front-End Developer",
      description: `Lorem Ipsum has been the standard "fish" for Latin texts since the early 16th century.`,
    },
  ]

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
