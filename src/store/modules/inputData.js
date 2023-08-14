
const state = {
    username: '',
    password: ''
};

const getters = {
    getUsername(state) {
        return state.username;
    },
    getPassword(state) {
        return state.password;
    }
};

const mutations = {
    SET_USERNAME(state, value) {
        state.username = value;
    },
    SET_PASSWORD(state, value) {
        state.password = value;
    }
};

const actions = {
    deleteUsername({ commit }) {
        commit('SET_USERNAME', '');
    },
    deletePassword({ commit }) {
        commit('SET_PASSWORD', '');
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
