import { Button, TextField } from '@mui/material'
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { userService } from '../services/userService'
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contactActions'
import { spendBalance, loadUser } from '../store/actions/userActions'
import { MovesList } from './MovesList'

class _TransferFund extends Component {
   state = {
      amount: 0,
      moves: []
   }

   async componentDidMount() {
      await this.props.loadUser()
      if (!this.props.loggedInUser.name) this.props.history.push('/signup')
      let movesToShow = this.props.loggedInUser.moves.filter(move => move.to === this.props.contact.name)
      this.setState({ moves: movesToShow })
   }

   onSpendBalance = (amount, user) => {
      this.props.spendBalance(amount, user)
   }
   handleChange = ({ target }) => {
      const value = +target.value
      this.setState({ amount: value })
   }
   onSaveAmount = async ev => {
      // ev.preventDefault()
      console.log(this.state.amount)
      if (this.props.loggedInUser.coins - this.state.amount < 0) {
         console.log('you dont have enough miney')
         return
      }
      this.onSpendBalance(this.state.amount, this.props.loggedInUser)
      var move = {
         to: this.props.contact.name,
         at: new Date().toLocaleString('en') + '',
         amount: this.state.amount
      }
      userService.addMove({ ...move })
      // this.setState({ moves: [...this.state.moves, move] })
      this.setState(prevState => {
         //  console.log(move)
         //  console.log('prevState.moves :>>', prevState.moves)
         return { moves: [...prevState.moves, move] }
      })
   }

   // onSaveRobot = async (ev) => {
   //     ev.preventDefault()
   //     await robotService.save({ ...this.state.robot })
   //     this.props.history.push('/')
   // }

   render() {
      const { contact, loggedInUser } = this.props
      const { amount, moves } = this.state
      if (!loggedInUser) return <div>Loading...</div>
      return (
         <div className="transfer-fund">
            <h2>Transfer coins to: {contact.name}</h2>
            {/* <h2>from {loggedInUser.name}</h2> */}
            <form>
               <label htmlFor="amount">Amount:</label>
               {/* <input onChange={this.handleChange} value={amount} type="number" name="amount" /> */}
               <TextField onChange={this.handleChange} value={amount} type="number" label="Enter amount" variant="outlined" />
               <Button onClick={this.onSaveAmount} variant="outlined">
                  Save
               </Button>
            </form>
            <MovesList moves={moves} />
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      loggedInUser: state.userModule.loggedInUser
   }
}

const mapDispatchToProps = {
   spendBalance,
   loadUser
}

export const TransferFund = connect(mapStateToProps, mapDispatchToProps)(_TransferFund)
