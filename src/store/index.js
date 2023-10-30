// index.js
import { createStore as CreateStoreVuex } from 'vuex';
import auth from './modules/auth.js';
import inputData from './modules/inputData.js';
import createdPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

const MIN_INACTIVITY = 3600000;

export const createStore = (app) => {
  return CreateStoreVuex({
    state: {
      lastInteraction: Date.now(),
      isInactive: false,
      exercise: null,
      code: null
    },
    getters: {
      lastInteraction(state) {
        return new Date(state.lastInteraction).toLocaleString();
      },
      getCurrentExercise(state){
        return state.exercise;
      },
      getCodeFromEditor(state){
        return state.code;
      }

    },
    mutations: {
      updateInteraction(state) {
        if (Date.now() - state.lastInteraction > MIN_INACTIVITY) {
          let res = fetch(app.config.globalProperties.hostname + 'login');
          res.then((response) => {
            if (response.status !== 200) {
              app.$store.dispatch('auth/logout'); // Use 'app.$store' to access the store in a Vue 3 app
            }
          });
        }
        state.lastInteraction = Date.now();
        state.isInactive = false;
      },
      setInactivity(state) {
        state.isInactive = true;
      },
      setExercise(state, ex){
        state.exercise = ex;
      },
      setCodeFromEditor(state, c) {
        state.code = c
        console.log(`code: ${this.code}`);
      }
    },
    actions: {
      checkInactivity({ commit, state }) {
        setInterval(() => {
          if (Date.now() - state.lastInteraction > MIN_INACTIVITY) {
            commit('setInactivity');
          }
        }, 1000);
      },
    },
    modules: {
      auth,
      inputData
    },
    plugins: [
      createdPersistedState({
        key: 'hamster-key-cookie',
        getState: (key) => {
          const value = Cookies.get(key);
          try {
            return JSON.parse(value); // Deserialize the state data from JSON
          } catch (error) {
            console.error('Error parsing state data from cookie:', error);
            return null;
          }
        },
        setState: (key, state) => {
          const serializedState = JSON.stringify(state); // Serialize the state data to JSON
          Cookies.set(key, serializedState, { expires: 3, secure: true });
        },
        rehydrated: (store) => {
          store.dispatch('auth/checkLoginStatus');
        },
      }),
    ],
  });
};
