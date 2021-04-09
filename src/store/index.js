import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentIdnumber: localStorage.getItem('currentIdnumber') || null,//存当前客户的idnumber
    currentAccountNum: localStorage.getItem('currentAccountNum') || null,
  },
  mutations: {
    setCurrentIdnumber(state, data) {
      localStorage.setItem('currentIdnumber', data);
      state.currentIdnumber = data;
    },
    setCurrentAccountNum(state, data) {
      localStorage.setItem('currentAccountNum', data);
      state.currentAccountNum = data;
    },
  },
  actions: {}
})
