
const state = {
  isLoggedIn: false,
  userRole: 0,  // 0 -> default; 1-> admin, 2 -> dev, 3-> teacher, 4 -> user
};

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  getUserRole: (state) => state.userRole,
};

const mutations = {
  SET_LOGGED_IN(state, value) {
    state.isLoggedIn = value;
  },
  SET_USERNAME(state, value) {
    state.testv = value;
  },
  SET_USERROLE(state, value) {
    state.userRole = value;
  }
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
  role({commit}, role) {
    commit('SET_USERROLE', role)
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
