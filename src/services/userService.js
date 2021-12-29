import { storageService } from './storageService.js'
import { makeId } from './utilService.js'

export const userService = {
   getEmptyUser,
   getUser,
   signup,
   addMove,
   saveUser
}

const STORAGE_KEY = 'user'

// _loadCurrUser()
getUser()

// function getUser() {
//    return {
//       _id: 'u001',
//       name: 'Ochoa Hyde',
//       coins: 100,
//       moves: []
//    }
// }

// function _loadCurrUser() {
//    let user = storageService.load(STORAGE_KEY)
//    if (!user || !user.length) user = getUser()
//    storageService.store(STORAGE_KEY, user)
//    return user
// }

function getUser() {
   let user = storageService.load(STORAGE_KEY)
   if (!user) return ''
   return user
}

function getEmptyUser() {
   return {
      _id: makeId(),
      name: '',
      coins: 100,
      moves: []
   }
}

function signup(name) {
   const user = getEmptyUser()
   user.name = name
   storageService.store(STORAGE_KEY, user)
   return user
}

function addMove(move) {
   console.log(move)
   const user = getUser()
   user.moves.push(move)
   storageService.store(STORAGE_KEY, user)
   console.log('user.moves :>>', user.moves)
}

async function saveUser(user) {
   console.log(user)
   if (user._id) {
      storageService.store(STORAGE_KEY, user)
   } else {
      getEmptyUser()
   }

   return Promise.resolve(user)
}
