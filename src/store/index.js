import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentIdnumber: localStorage.getItem('currentIdnumber') || null,//存当前客户的idnumber
    currentIouNum: localStorage.getItem('currentIouNum') || null,
  },
  mutations: {
    setCurrentIdnumber(state, data) {
      localStorage.setItem('currentIdnumber', data);
      state.currentIdnumber = data;
    },
    setCurrentIouNum(state, data) {
      localStorage.setItem('currentIouNum', data);
      state.currentIouNum = data;
    },
  },
  actions: {}
})
