import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

let store = {
  strict: true,
  state: {
    testData: "Test",
  },
  mutations: {
    changeTestData(state, n) {
      state.testData = n;
    },
  },
  getters: {
    capitalizedTestData(state) {
      return state.testData.toUpperCase();
    },
  },
};

export default new Vuex.Store(store);
