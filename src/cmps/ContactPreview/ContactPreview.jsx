import { Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import { green, pink, red, purple, indigo } from '@mui/material/colors'
export function ContactPreview({ contact }) {
   return (
      <article className="contact-preview">
         <Link to={`/contact/${contact._id}`} className="info">
            {/* <img src={`./img/user.png`} alt="" /> */}
            <Avatar sx={{ bgcolor: indigo[200] }}>{contact.name.slice(0, 1)}</Avatar>
            <h2>{contact.name}</h2>
         </Link>
      </article>
   )
}
