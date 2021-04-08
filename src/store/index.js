import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUsername: localStorage.getItem('currentUsername') || null,//存当前用户的userName
  },
  mutations: {
    setCurrentUsername(state, data) {
      localStorage.setItem('currentUsername', data.username);
      state.currentUsername = data.username;
    },
    logout(state) {
      localStorage.removeItem('currentUsername');
      state.currentUsername = null;
    },
  },
  actions: {}
})
