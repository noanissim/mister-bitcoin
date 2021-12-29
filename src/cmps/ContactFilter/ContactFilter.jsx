import { TextField } from '@mui/material'
import React, { Component } from 'react'

export class ContactFilter extends Component {
   state = {
      name: '',
      phone: '',
      email: '',
      term: ''
   }

   handleChange = ({ target }) => {
      const field = target.name
      const value = target.type === 'number' ? +target.value : target.value
      this.setState({ [field]: value }, () => {
         this.props.changeFilter(this.state)
      })
   }

   render() {
      const { name, phone, email, term } = this.state
      return (
         <form className="contact-filter">
            {/* <section className="input-container">
               <label htmlFor="name">Name</label>
               <input onChange={this.handleChange} value={name} type="text" name="name" id="name" />
            </section>
            <section className="input-container">
               <label htmlFor="phone">Phone</label>
               <input onChange={this.handleChange} value={phone} type="number" name="phone" id="phone" />
            </section>
            <section className="input-container">
               <label htmlFor="email">Email</label>
               <input onChange={this.handleChange} value={email} type="email" name="email" id="email" />
            </section> */}
            <section className="input-container">
               <label htmlFor="term">Name / Phone / Email</label>
               <TextField onChange={this.handleChange} value={term} type="text" name="term" id="term" label="Enter filter" variant="outlined" />
            </section>
         </form>
      )
   }
}
