import { Link } from 'react-router-dom'

export function ContactPreview({ contact }) {
   return (
      <article className="contact-preview">
         <Link to={`/contact/${contact._id}`} className="info">
            <img src={`./img/user.png`} alt="" />
            <h2>{contact.name}</h2>
         </Link>
      </article>
   )
}
