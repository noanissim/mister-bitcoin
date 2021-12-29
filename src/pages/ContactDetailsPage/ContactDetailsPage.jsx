import { Component } from 'react'
import { Link } from 'react-router-dom'
import { TransferFund } from '../../cmps/TransferFund'
import { contactService } from '../../services/contactService'
import { eventBusService } from '../../services/eventBusService'
import { userService } from '../../services/userService'

export class ContactDetailsPage extends Component {
   state = {
      contact: null,
      user: null
   }

   componentDidMount() {
      this.loadContact()
      this.loadUser()
   }

   async loadContact() {
      const contact = await contactService.getContactById(this.props.match.params.id)
      this.setState({ contact })
   }

   componentDidUpdate(prevProps, prevState) {
      if (prevProps.match.params.id !== this.props.match.params.id) {
         this.loadContact()
      }
   }

   loadUser() {
      const user = userService.getUser()
      if (!user) this.props.history.push('/signup')
      this.setState({ user })
   }

   onGoBack = () => {
      this.props.history.push('/contact')
   }

   onRemoveContact = async () => {
      const { contact } = this.state
      await contactService.deleteContact(contact._id)
      eventBusService.emit('delete', contact._id)
      this.onGoBack()
   }

   render() {
      const { contact } = this.state
      if (!contact) return <div>Loading..</div>
      return (
         <div className="contact-details">
            <div className="info">
               {/* <img src={`./img/user.png`} alt="" /> */}
               {/* <img src="https://picsum.photos/200/200?random=1" alt="" /> */}
               <img src={`https://robohash.org/${contact._id}`} alt="" />

               <h1>{contact.name}</h1>
               <h3>{contact.phone}</h3>
               <h3>{contact.email}</h3>

               <div className="btn-grad" onClick={this.onRemoveContact}>
                  Delete
               </div>
               <Link className="btn-grad" to={`/contact/edit/${contact._id}`}>
                  Edit
               </Link>
               <div className="btn-grad" onClick={this.onGoBack}>
                  Back
               </div>
            </div>
            <TransferFund contact={contact} />
         </div>
      )
   }
}
