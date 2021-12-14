<template>
  <v-container fluid>
    <v-row
      ><v-col>
        <h3>Select Existing Space Planner .json File</h3>
      </v-col></v-row
    >
    <v-row
      ><v-col>
        <v-btn dark v-blur @click="openFile()" class="mb-3" color="#988600"
          >Open JSON File</v-btn
        >
      </v-col></v-row
    >
    <div v-if="referencedFile">
      <v-row>
        <v-col class="mt-0 pt-0">
          <h5 class="mt-0 pt-0" style="color: #988600">
            File Imported Successfully!
          </h5>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h1 class="roboto-mono">{{ projectName }}</h1>
        </v-col>
      </v-row>
      <hr class="mb-6" />
      <v-row>
        <v-col>
          <h3>Select Building and Phase as Basis for Planning Blocks</h3>
        </v-col>
      </v-row>

      <v-row class="">
        <v-col>
          <v-select
            color="#988600"
            item-color="#988600"
            class="ma-0 pa-0 mt-3"
            label="Select Building"
            :items="buildingSelectOptions"
            :value="activeBuildingId"
            @input="setActiveBuildingId($event)"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          ><v-select
            color="#988600"
            item-color="#988600"
            class="ma-0 pa-0"
            label="Select Phase"
            :items="phaseSelectOptions"
            :value="activePhaseId"
            @input="setActivePhaseId($event)"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <circle-packing-diagram></circle-packing-diagram>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col> </v-col>
    </v-row>

    <input id="file-input" type="file" name="name" style="display: none" />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import circlePackingDiagram from "./circlePackingDiagram.vue";
export default {
  components: { circlePackingDiagram },
  name: "PlanSelectTab",
  mounted() {
    let inputElement = document.getElementById("file-input");
    inputElement.addEventListener("change", handleFiles, false);
    let self = this;
    function handleFiles() {
      const fileList = this.files;
      self.activateOpenedFile(fileList);
    }
  },
  beforeDestroy() {
    let inputElement = document.getElementById("file-input");
    inputElement.removeEventListener("change", handleFiles, false);
    let self = this;
    function handleFiles() {
      const fileList = this.files;
      self.activateOpenedFile(fileList);
    }
  },
  computed: {
    ...mapState(["referencedFile"]),
    activeBuildingId() {
      if (this.referencedFile) {
        return this.referencedFile.activeBuildingId;
      } else {
        return undefined;
      }
    },
    activePhaseId() {
      if (this.referencedFile) {
        return this.referencedFile.activePhaseId;
      } else {
        return undefined;
      }
    },
    projectName() {
      if (this.referencedFile) {
        return this.referencedFile.projectName;
      } else {
        return undefined;
      }
    },
    buildingSelectOptions() {
      let buildingSelectOptions = [];
      let buildingData = this.referencedFile.buildingData;
      if (this.referencedFile) {
        for (let k in buildingData) {
          let d = buildingData[k];
          let selectOption = {
            text: d.name,
            value: d.id,
          };
          buildingSelectOptions.push(selectOption);
        }
      }
      return buildingSelectOptions;
    },
    phaseSelectOptions() {
      let phaseSelectOptions = [];
      let phaseData = this.referencedFile.phaseData;
      if (this.referencedFile) {
        for (let k in phaseData) {
          let d = phaseData[k];
          let selectOption = {
            text: d.name,
            value: d.id,
          };
          phaseSelectOptions.push(selectOption);
        }
      }
      console.log("phase select options", phaseSelectOptions);
      return phaseSelectOptions;
    },
  },
  data: () => ({}),
  methods: {
    openFile: function () {
      console.log("open file method was called");
      document.getElementById("file-input").click();
    },
    activateOpenedFile: function (fileList) {
      let self = this;
      console.log("activate opened file called", fileList[0]);
      let reader = new FileReader();
      reader.addEventListener("load", function () {
        let loadedData = JSON.parse(reader.result);
        self.$store.commit("openFile", loadedData);
      });
      reader.readAsText(fileList[0]);
    },
    setActiveBuildingId(id) {
      this.$store.commit("setActiveBuildingId", id);
    },
    setActivePhaseId(id) {
      this.$store.commit("setActivePhaseId", id);
    },
  },
};
</script>

<style></style>
