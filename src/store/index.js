import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

let store = {
  strict: true,
  state: {
    testData: "Test",
    referencedFile: undefined,
  },
  mutations: {
    changeTestData(state, n) {
      state.testData = n;
    },
    openFile(state, n) {
      state.referencedFile = n;
    },
    setActiveBuildingId(state, n) {
      if (state.referenceFile) {
        state.referenceFile.activeBuildingId = n;
      }
    },
    setActivePhaseId(state, n) {
      if (state.referenceFile) {
        state.referenceFile.activePhaseId = n;
      }
    },
  },
  getters: {
    capitalizedTestData(state) {
      return state.testData.toUpperCase();
    },
  },
};

export default new Vuex.Store(store);
