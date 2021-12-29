import React, { Component } from 'react'
import { eventBusService } from '../services/eventBusService'

export class UserMsg extends Component {
   state = {
      message: ''
   }
   removeEventBus

   componentDidMount() {
      this.removeEventBus = eventBusService.on('couponApply', data => this.setState({ message: data.message }))
   }

   componentWillUnmount() {
      this.removeEventBus()
   }

   render() {
      return (
         <div>
            <h1>{this.state.message}</h1>
         </div>
      )
   }
}
