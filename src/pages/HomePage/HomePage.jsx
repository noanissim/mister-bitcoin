import React, { Component } from 'react'
import { userService } from '../../services/userService'
import { bitcoinService } from '../../services/bitcoinService'
import { MovesList } from '../../cmps/MovesList'

export class HomePage extends Component {
   state = {
      user: null,
      btc: '',
      moves: []
   }

   componentDidMount() {
      this.loadUser()
   }

   loadUser() {
      const user = userService.getUser()
      if (!user) this.props.history.push('/signup')
      this.setState({ user, moves: user.moves }, async () => await this.loadBtc())
   }

   async loadBtc() {
      const { user } = this.state
      const btc = await bitcoinService.getRate(user.coins)
      this.setState({ btc })
   }

   render() {
      const { user, btc, moves } = this.state
      if (!user || !btc) return <div>Loading...</div>
      return (
         <div className="homepage-app">
            <img src={`./img/profile.png`} alt="" />
            <h1>Welcome {user.name}!</h1>
            <h2>Coins: {user.coins}</h2>
            <h2>BTC: {btc}</h2>
            <MovesList moves={moves} />
         </div>
      )
   }
}
