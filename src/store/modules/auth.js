
const state = {
  isLoggedIn: false,
  oasch: false
};

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  oasch: (state) => state.oasch
};

const mutations = {
  SET_LOGGED_IN(state, value) {
    state.isLoggedIn = value;
  },
  SET_USERNAME(state, value) {
    state.oasch = value;
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

  eini({ commit }) {
    commit('SET_USERNAME', true);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
