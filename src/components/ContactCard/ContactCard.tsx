import s from "./ContactCard.module.css"

interface ContactCardProps {
  photo?: string
  name: string
  position: string
  description?: string
}

const ContactCard = ({
  name,
  photo,
  position,
  description,
}: ContactCardProps) => {
  return (
    <div className={s.card}>
      <img
        className={s.photo}
        src={photo}
        alt={name}
        width={280}
        height={244}
      />
      <div className={s.contactInfoCard}>
        <h2 className={s.name}>{name}</h2>
        <p className={s.position}>{position}</p>
        <p className={s.description}>{description}</p>
      </div>
    </div>
  )
}

export default ContactCard
