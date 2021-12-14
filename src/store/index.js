import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import * as d3 from "d3";

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
      if (state.referencedFile) {
        state.referencedFile.activeBuildingId = n;
      }
    },
    setActivePhaseId(state, n) {
      if (state.referencedFile) {
        state.referencedFile.activePhaseId = n;
      }
    },
  },
  getters: {
    capitalizedTestData(state) {
      return state.testData.toUpperCase();
    },
    activeBuilding: (state) => {
      if (!state.referencedFile) {
        return undefined;
      }
      let ref = state.referencedFile;
      let buildingDataKey = "building " + ref.activeBuildingId;
      return ref.buildingData[buildingDataKey];
    },
    activeProgramUnsorted: (state) => {
      // this function is important for d3 visualizations
      // because d3 bases update, merge and exit transformations on array indices
      // data must always remain in a relatively similar position with an
      // array to create meaningful visual transitions
      if (!state.referencedFile) {
        return undefined;
      }
      let ref = state.referencedFile;
      let programDataKey =
        "phase " + ref.activePhaseId + " | building " + ref.activeBuildingId;

      let unsortedProgramData = JSON.parse(
        JSON.stringify(ref.allProgramData[programDataKey])
      );
      unsortedProgramData.sort(function (a, b) {
        return a.id - b.id;
      });
      return unsortedProgramData;
    },
    getColorScale: (state) => {
      if (!state.referencedFile) {
        return undefined;
      }
      let ref = state.referencedFile;
      let extraColors = d3.schemeCategory10;
      let departmentNames = [];
      let departmentColors = [];

      for (let d of ref.colorKey) {
        if (!departmentNames.includes(d.department)) {
          departmentNames.push(d.Department);
          departmentColors.push(d.HexColor);
        }
      }
      for (let c of extraColors) {
        departmentColors.push(c);
      }
      let uniqueDepartments = [];
      let programDataKey =
        "phase " + ref.activePhaseId + " | building " + ref.activeBuildingId;
      let activeProgram = ref.allProgramData[programDataKey];
      for (let d of activeProgram) {
        if (!uniqueDepartments.includes(d.department)) {
          uniqueDepartments.push(d.department);
        }
      }
      uniqueDepartments.sort();
      for (let d of uniqueDepartments) {
        departmentNames.push(d);
      }
      let color = d3
        .scaleOrdinal()
        .domain(departmentNames)
        .range(departmentColors);
      return color;
    },
  },
};

export default new Vuex.Store(store);
