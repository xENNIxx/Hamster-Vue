
const state = {
  isLoggedIn: false,
};

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
};

const mutations = {
  SET_LOGGED_IN(state, value) {
    state.isLoggedIn = value;
  },
  SET_USERNAME(state, value) {
    state.testv = value;
  },
};
 
const actions = {
  login({ commit }) {
    commit('SET_LOGGED_IN', true);
  },
  logout({ commit }) {
    commit('SET_LOGGED_IN', false);
  },
  register({ commit }) {
    commit('SET_LOGGED_IN', true);
  },

  checkLoginStatus({ commit, state }) {
    if (state.isLoggedIn) {
      commit('SET_LOGGED_IN', true);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
