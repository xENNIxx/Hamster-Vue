
const state = {
    username: 'herbert',
    //password: ''
};

const getters = {
    username: (state) => state.username,
    //password: (state) => state.password
};

const mutations = {
    SET_USERNAME(state, value) {
        state.username = value;
    },
};

const actions = {
    deleteUsername({ commit }) {    
        commit('SET_USERNAME', '');
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};



