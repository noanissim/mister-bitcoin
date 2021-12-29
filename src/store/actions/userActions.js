import { userService } from '../../services/userService'

export function spendBalance(amount, user) {
   console.log('spendBalance -> amount', amount)
   return async (dispatch, getState) => {
      console.log('user', user)
      dispatch({ type: 'SPEND_COINS', amount })
      const { loggedInUser } = getState().userModule
      await userService.saveUser(loggedInUser)
   }
}

export function loadUser() {
   return async (dispatch, getState) => {
      try {
         const user = await userService.getUser()
         dispatch({ type: 'SET_USER', user })
      } catch (err) {
         console.log(err)
      }
   }
}
