import { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { eventBusService } from '../../services/eventBusService'
import { userService } from '../../services/userService'
import { connect } from 'react-redux'
import { spendBalance, loadUser } from '../../store/actions/userActions'

class _AppHeader extends Component {
   state = { message: '', isShown: false }

   async componentDidMount() {
      // this.loadUser()
      await this.props.loadUser()
      eventBusService.on('delete', contactId => {
         this.setState({ message: 'Contact deleted', isShown: true })
         this.renderUserMsg()
         // this.setMsg()
      })
   }
   // loadUser() {
   //    const user = userService.getUser()
   //    if (user) this.setState({ user })
   // }
   renderUserMsg() {
      setTimeout(() => {
         this.setState({ isShown: false })
      }, 2000)
   }

   render() {
      const { isShown } = this.state
      const { loggedInUser } = this.props
      return (
         <header className="app-header">
            {isShown && <div className="user-msg">{this.state.message}</div>}
            <section className="container app-header-content">
               <h1 className="logo">Mister BITCoin</h1>
               {loggedInUser && (
                  <p>
                     {loggedInUser.name},{loggedInUser.coins}
                  </p>
               )}
               <nav className="pages-routing-links">
                  <NavLink activeClassName="my-active" exact to="/">
                     Home
                  </NavLink>
                  <NavLink activeClassName="my-active" to="/contact">
                     Contacts
                  </NavLink>
                  <NavLink activeClassName="my-active" to="/statistic">
                     Statistics
                  </NavLink>
                  <NavLink activeClassName="my-active" to="/signup">
                     Signup
                  </NavLink>
               </nav>
            </section>
         </header>
      )
   }
}

const mapStateToProps = state => {
   return {
      loggedInUser: state.userModule.loggedInUser
   }
}

const mapDispatchToProps = {
   loadUser
}
export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader))
