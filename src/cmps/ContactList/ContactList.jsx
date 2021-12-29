import { ContactPreview } from '../ContactPreview/ContactPreview'

export function ContactList({ contacts }) {
   return (
      <div className="contact-list">
         {contacts.map(contact => (
            <ContactPreview contact={contact} key={contact._id} />
         ))}
      </div>
   )
}
