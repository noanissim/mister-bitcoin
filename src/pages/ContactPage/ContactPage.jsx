import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { ContactDetailsPage } from '../ContactDetailsPage/ContactDetailsPage'
import { ContactFilter } from '../../cmps/ContactFilter/ContactFilter'
import { ContactList } from '../../cmps/ContactList/ContactList'
// import { UserMsg } from '../../cmps/UserMsg'
import { contactService } from '../../services/contactService'
import { userService } from '../../services/userService'

import { connect } from 'react-redux'
import { loadContacts, removeContact, setFilterBy } from '../../store/actions/contactActions'
import { spendBalance, loadUser } from '../../store/actions/userActions'
import Button from '@mui/material/Button'

// import Box from '@mui/material/Box'
// import InputLabel from '@mui/material/InputLabel'
// import MenuItem from '@mui/material/MenuItem'
// import FormControl from '@mui/material/FormControl'
// import Select from '@mui/material/Select'

class _ContactPage extends Component {
   // state = {
   //    contacts: null,
   //    filterBy: null
   // }

   async componentDidMount() {
      await this.props.loadContacts()
      await this.props.loadUser()
      if (!this.props.loggedInUser.name) this.props.history.push('/signup')
   }

   // async loadUser() {
   //    // const user = userService.getUser()
   //    // if (!user) console.log('no user')
   //    await this.props.loadUser()
   //    console.log('user', this.state.loggedInUser)
   // }

   // async loadContacts() {
   //    try {
   //       const { filterBy } = this.state
   //       const contacts = await contactService.getContacts(filterBy)
   //       this.setState({ contacts })
   //    } catch (err) {
   //       console.log(err)
   //    }
   // }

   changeFilter = filterBy => {
      // this.setState({ filterBy }, this.loadContacts)
      this.props.setFilterBy(filterBy)
      this.props.loadContacts()
   }

   onSpendBalance = () => {
      this.props.spendBalance(5)
   }

   // handleChange = ev => {
   //    this.setState({ age: ev.target.value })
   // }

   render() {
      const { contacts } = this.props
      if (!contacts) return <div>Loading...</div>
      return (
         <div className="contact-page">
            <ContactFilter changeFilter={this.changeFilter} />
            <Link className="btn" to="/contact/edit">
               <Button variant="outlined"> Add Contact</Button>
            </Link>

            {/* <Button variant="contained">Hello World</Button> */}
            {/* <FormControl fullWidth>
               <InputLabel id="demo-simple-select-label">Age</InputLabel>
               <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={this.handleChange}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
               </Select>
            </FormControl> */}
            <ContactList contacts={contacts} />
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      contacts: state.contactModule.contacts,
      loggedInUser: state.userModule.loggedInUser
   }
}

const mapDispatchToProps = {
   loadContacts,
   removeContact,
   setFilterBy,
   spendBalance,
   loadUser
}

export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage)
