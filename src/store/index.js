import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentCustomerCode: localStorage.getItem('currentCustomerCode') || null,
    currentAccountNum: localStorage.getItem('currentAccountNum') || null,
    currentIouNum: localStorage.getItem('currentIouNum') || null,
  },
  mutations: {
    setCurrentCustomerCode(state, data) {
      localStorage.setItem('currentCustomerCode', data);
      state.currentCustomerCode = data;
    },
    setCurrentAccountNum(state, data) {
      localStorage.setItem('currentAccountNum', data);
      state.currentAccountNum = data;
    },
    setCurrentIouNum(state, data) {
      localStorage.setItem('currentIouNum', data);
      state.currentIouNum = data;
    },
  },
  actions: {}
})
