<template>
  <v-container fluid>
    <div v-if="referencedFile">
      <v-row
        ><v-col>
          <h3>Create a Block for Each Program Element in Plan</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>
            This operation will create {{ numberOfBlocks }} program blocks,
            distributed across {{ numberOfGroups }} groups and
            {{ numberOfTypes }} types of program.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn
            v-blur
            elevation="4"
            outlined
            rounded
            large
            dark
            color="#A80051"
            @click="createButtonClicked()"
            >Build Blocks</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col> </v-col>
      </v-row>
      <v-row>
        <v-col> </v-col>
      </v-row>
      <v-row>
        <v-col> </v-col>
      </v-row>
      <v-row>
        <v-col> </v-col>
      </v-row>
      <v-row>
        <v-col> </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row
        ><v-col>
          <h2 class="red--text">
            Use the "Select Plan" Tab to Load Programming Data
          </h2>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";

let WSM = window.WSM;
let FormIt = window.FormIt;

export default {
  name: "BlockCreationTab",
  beforeMount() {},
  beforeDestroy() {},
  computed: {
    ...mapState(["referencedFile"]),
    ...mapGetters([
      "getActiveLevelsByElevation",
      "activeProgram",
      "getColorKey",
    ]),
    numberOfBlocks() {
      let numberOfBlocks = 0;
      for (let p of this.activeProgram) {
        numberOfBlocks += p.quantity;
      }
      return numberOfBlocks;
    },
    numberOfGroups() {
      let numberOfGroups = 0;
      let countedGroups = [];
      for (let p of this.activeProgram) {
        if (!countedGroups.includes(p.group)) {
          countedGroups.push(p.group);
          numberOfGroups += 1;
        }
      }
      return numberOfGroups;
    },
    numberOfTypes() {
      let numberOfTypes = 0;
      let countedTypes = [];
      for (let p of this.activeProgram) {
        if (!countedTypes.includes(p.department)) {
          countedTypes.push(p.department);
          numberOfTypes += 1;
        }
      }
      return numberOfTypes;
    },
    structuredProgramData() {
      let typesObj = {};
      for (let p of this.activeProgram) {
        if (!(p.department in typesObj)) {
          typesObj[p.department] = [];
        }
      }
      let groupsObj = {};
      for (let p of this.activeProgram) {
        if (!(p.group in groupsObj)) {
          groupsObj[p.group] = JSON.parse(JSON.stringify(typesObj));
        }
      }
      for (let p of this.activeProgram) {
        groupsObj[p.group][p.department].push(p);
      }

      return groupsObj;
    },
  },
  data: () => ({}),
  methods: {
    createButtonClicked() {
      let self = this;
      // self.getInSketchMaterials().then((materialData) => {
      //   self.makeMissingMaterials(self, materialData);
      // });
      self
        .addMaterialsAndGetUpdatedMaterialList(self)
        .then((updatedMaterialData) => {
          console.log("updated material data", updatedMaterialData);
        });
    },
    addMaterialsAndGetUpdatedMaterialList: async (self) => {
      self.getInSketchMaterials().then((materialData) => {
        self.makeMissingMaterials(self, materialData).then(() => {
          self.getInSketchMaterials().then((updatedMaterialData) => {
            return updatedMaterialData;
          });
        });
      });
    },
    getInSketchMaterials: async () => {
      //functions interacting with FormIt need to take place asynchronously
      let materialData = {};
      let materialIds = await FormIt.MaterialProvider.GetMaterials(
        FormIt.LibraryType.SKETCH
      );
      for (let m of materialIds) {
        let name = await FormIt.MaterialProvider.GetMaterialName(
          FormIt.LibraryType.SKETCH,
          m
        );
        console.log("name", name, "material", m);
        if (name.Result == true) {
          let material = { name, id: m };
          materialData[name] = material;
        }
      }
      // console.log(materialIds);
      return materialData;
    },
    makeMissingMaterials: async (self, materialData) => {
      for (let colorKey of self.getColorKey) {
        let colorName = colorKey.Department;
        let colorHex = colorKey.HexColor;
        let colorRgb = self.hexToRgb(colorHex);
        console.log("rgb conversion results", colorRgb, colorName);
        if (colorRgb && !(colorName in materialData)) {
          console.log("running material creation loop", colorKey);
          let wsmColor = await WSM.Color(
            colorRgb.r,
            colorRgb.g,
            colorRgb.b,
            255
          );
          console.log("wsm color", wsmColor);
          let newFormItMaterial = await FormIt.MaterialProvider.MaterialData(
            wsmColor
          );
          newFormItMaterial.MaterialName = colorName;
          console.log("new formit material", newFormItMaterial);
          await FormIt.MaterialProvider.CreateMaterial(
            FormIt.LibraryType.SKETCH,
            newFormItMaterial
          );
        }
      }
    },
    hexToRgb(hex) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    },
  },
};
</script>

<style></style>
