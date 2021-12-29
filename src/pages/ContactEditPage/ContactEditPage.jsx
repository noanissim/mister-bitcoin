import { Component, createRef } from 'react'
import { Link } from 'react-router-dom'
import { contactService } from '../../services/contactService'

export class ContactEditPage extends Component {
   state = {
      contact: null
   }

   inputRef = createRef()

   async componentDidMount() {
      const contactId = this.props.match.params.id
      const contact = contactId ? await contactService.getContactById(contactId) : contactService.getEmptyContact()
      this.setState({ contact }, () => this.inputRef.current.focus())
   }

   handleChange = ({ target }) => {
      const field = target.name
      const value = target.type === 'number' ? +target.value : target.value
      this.setState(prevState => ({ contact: { ...prevState.contact, [field]: value } }))
   }

   onSaveContact = async ev => {
      ev.preventDefault()
      await contactService.saveContact({ ...this.state.contact })
      this.props.history.push('/contact')
   }

   render() {
      const { contact } = this.state
      if (!contact) return <div>Loading...</div>
      return (
         <div className="contact-edit">
            {contact._id ? <h1>Edit current contact</h1> : <h1>Add contact</h1>}

            <form onSubmit={this.onSaveContact}>
               <label htmlFor="name">Name</label>
               <input ref={this.inputRef} onChange={this.handleChange} value={contact.name} type="text" name="name" id="name" />

               <label htmlFor="phone">Phone</label>
               <input onChange={this.handleChange} value={contact.phone} type="phone" name="phone" id="phone" />

               <label htmlFor="email">Email</label>
               <input onChange={this.handleChange} value={contact.email} type="email" name="email" id="email" />

               <button className="btn-grad">Save</button>
            </form>
            <Link className="btn-grad" to={`/contact`}>
               Back
            </Link>
         </div>
      )
   }
}
