import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name,
    userInfo: {
      name: '',
      eId: '',
    },
  },
  mutations: {
    UPDATE_USER_INFO(state, payload) {
      state.userInfo = Object.assign({}, state.userInfo, payload);
    },
    UPDATE_NAME(state, payload) {
      state.name = payload;
    }
  },
  actions: {
  },
});
