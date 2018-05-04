import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      name: '',
      eId: '',
    },
  },
  mutations: {
    UPDATE_USER_INFO(state, payload) {
      state.userInfo = Object.assign({}, state.userInfo, payload);
    },
  },
  actions: {
  },
});
