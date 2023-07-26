import { createStore as CreateStoreVuex } from 'vuex'
import auth from './modules/auth.js'


const MIN_INACTIVITY = 5000;
export const createStore = (app) => {
  return CreateStoreVuex({
    state: {
      lastInteraction: Date.now(),
      isInactive: false
    },
    getters: {
      lastInteraction(state){
        return new Date(state.lastInteraction).toLocaleString()
      }
    },
    mutations: {
      updateInteraction(state) {
        if(Date.now() - state.lastInteraction > MIN_INACTIVITY){
          let res = fetch(app.config.globalProperties.hostname + "login")
          res.then(response => {
            if(response.status != 200){
              console.log("Logout (Timeout)")
              this.dispatch("auth/logout")
            }
          })
        }
        state.lastInteraction = Date.now()
        state.isInactive = false
      },
      setInactivity(state) {
        state.isInactive = true
      }
    },
    actions: {
      checkInactivity({ commit, state }) {
        setInterval(() => {
          if (Date.now() - state.lastInteraction > MIN_INACTIVITY) {
            commit('setInactivity')
          }
        }, 1000)
      }
    },
    modules: {
      auth
    }
  })
} 
