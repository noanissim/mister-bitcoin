function on(eventName, listener) {
   const callListener = ({ detail }) => {
      listener(detail)
   }

   window.addEventListener(eventName, callListener)

   return () => {
      window.removeEventListener(eventName, callListener)
   }
}

// function remove(eventName, listener) {
//    document.removeEventListener(eventName, listener)
// }

function emit(eventName, data) {
   window.dispatchEvent(new CustomEvent(eventName, { detail: data }))
}

export const eventBusService = { on, emit }

window.myBus = eventBusService
