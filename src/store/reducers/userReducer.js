const INITIAL_STATE = {
   loggedInUser: {
      _id: '',
      name: '',
      coins: 100,
      moves: []
   }
}

export function userReducer(state = INITIAL_STATE, action) {
   var { loggedInUser } = state
   switch (action.type) {
      case 'SPEND_COINS':
         // if (loggedInUser.coins - action.amount < 0) break
         // console.log('loggedInUser.coins - action.amount >= 0 :>>', loggedInUser.coins - action.amount >= 0)
         return {
            ...state,
            loggedInUser: { ...loggedInUser, coins: loggedInUser.coins - action.amount }
         }
      case 'SET_USER':
         // console.log('loggedInUser222222', loggedInUser)
         // console.log('action.user', action.user)
         return {
            ...state,
            loggedInUser: { ...action.user }
         }
      default:
         return state
   }
}
