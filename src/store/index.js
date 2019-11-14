import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    name: 'Otto',
    weathers: [],
}

const getters = {
    nameLowerCase: () => {
        return state.name.toLowerCase();
    }
}

const actions = {
    setName({commit}, value) {
        commit('SET_NAME', value);
    },

    setWeather({commit}, payload) {
        commit('SET_WEATHER', payload);
    }
}

const mutations = {
    SET_NAME(state, value) {
        state.name = value;
    },

    SET_WEATHER(state, payload) {
        state.weathers = payload;
    }
}

export default new Vuex.Store({
    state, getters, actions, mutations
});