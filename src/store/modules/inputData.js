
const state = {
    username: '',
    password: '' 
};

const getters = {
    username: (state) => state.username,
    password: (state) => state.password
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
    setUsername(context, payload) {
        //this.username = payload;
        console.log('arrived at actions')
    },


    deleteUsername({ commit }) {    
        commit('SET_USERNAME', '');
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};



