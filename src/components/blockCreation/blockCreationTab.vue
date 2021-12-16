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

      let levelObj = {};
      for (let i in this.getActiveLevelsByElevation) {
        let lvl = this.getActiveLevelsByElevation[i];
        levelObj[lvl.id] = {
          name: lvl.name,
          id: lvl.id,
          elevation: lvl.elevation,
          groups: undefined,
          nextElev: undefined,
        };
        if (i < this.getActiveLevelsByElevation - 1) {
          levelObj[lvl.id].nextElev = this.getActiveLevelsByElevation[i + 1];
        } else {
          levelObj[lvl.id].nextElev = levelObj[lvl.id].elevation + 12;
        }
        levelObj[lvl.id].groups = JSON.parse(JSON.stringify(groupsObj));
      }

      for (let p of this.activeProgram) {
        levelObj[p.level]["groups"][p.group][p.department].push(p);
      }

      return levelObj;
    },
  },
  data: () => ({}),
  methods: {
    createButtonClicked() {
      async function asyncOperations(self) {
        console.log("this", self);
        let currentMaterialData = await self.getInSketchMaterials();
        await self.makeMissingMaterials(self, currentMaterialData);
        let updatedMaterialData = await self.getInSketchMaterials();

        let currentLevelData = await self.getInSketchLevels();
        await self.makeMissingLevels(self, currentLevelData);
        let updatedLevelData = await self.getInSketchLevels();

        self.createProgrammingBlocks(
          self,
          updatedMaterialData,
          updatedLevelData
        );
      }
      asyncOperations(this);
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
          let material = { name: name.Name, id: m };
          materialData[name.Name] = material;
        }
      }
      // console.log(materialIds);
      return materialData;
    },
    makeMissingMaterials: async (self, materialData) => {
      let addedMaterials = [];
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
          let newMaterial = await FormIt.MaterialProvider.CreateMaterial(
            FormIt.LibraryType.SKETCH,
            newFormItMaterial
          );
          addedMaterials.push(newMaterial);
        }
      }
      return addedMaterials;
    },
    addMissingLevelsAndGetUpdatedLevelList: async (self) => {
      console.log("adding missing levels", self);
      return "some data";
    },
    getInSketchLevels: async () => {
      let mainHistID = await FormIt.Model.GetHistoryID();
      let currentLevelData = await FormIt.Levels.GetLevelsData(
        mainHistID,
        true
      );
      console.log("current level data", currentLevelData);
      return currentLevelData;
    },
    makeMissingLevels: async (self, inSketchLevels) => {
      console.log("making missing levels", self, inSketchLevels);
      let existingLevelNames = [];
      for (let lvl of inSketchLevels) {
        existingLevelNames.push(lvl.Name);
      }
      console.log("existing level names", existingLevelNames);
      for (let lvl of self.getActiveLevelsByElevation) {
        if (!existingLevelNames.includes(lvl.name)) {
          let mainHistID = await FormIt.Model.GetHistoryID();
          let newLevelList = await FormIt.Levels.AddLevels(
            mainHistID,
            1,
            lvl.elevation,
            12
          );
          console.log("new levels list", newLevelList);
          let newLevelId = newLevelList.LevelIds[0];
          await FormIt.Levels.ChangeLevelName(newLevelId, lvl.name);
        }
      }
    },
    createProgrammingBlocks: async (
      self,
      updatedMaterialData,
      updatedLevelData
    ) => {
      console.log(
        "creating programming blocks",
        self,
        updatedMaterialData,
        updatedLevelData
      );
      let cursor = { x: 0, y: 0 };
      let topLevelGroups = [];
      for (let lk in self.structuredProgramData) {
        let levelData = self.structuredProgramData[lk];
        let tallestTypes = -15;
        let levelGroups = [];

        let levelId = undefined;
          for (let lvl of updatedLevelData) {
            if (
              lvl.Name == levelData.name &&
              lvl.Elevation == levelData.elevation
            ) {
              levelId = lvl.Id.Object;
            }
          }

        for (let gk in levelData.groups) {
          let groupData = levelData.groups[gk];
          let typeReset = tallestTypes + 15;
          let groupBlocks = [];
          cursor.y = typeReset;
          for (let tk in groupData) {
            let typeData = groupData[tk];

            for (let p of typeData) {
              if (p.quantity > 0 && p.area > 0) {
                // console.log('program identified and meets critera',p)
                let dim = Math.sqrt(p.area);
                let half = dim / 2;
                cursor.x += half;
                for (let i = 0; i < p.quantity; i++) {
                  // console.log('inside of quantity loop')

                  let pt1 = await WSM.Geom.Point3d(
                    cursor.x - half,
                    cursor.y,
                    levelData.elevation
                  );
                  let pt2 = await WSM.Geom.Point3d(
                    cursor.x + half,
                    cursor.y + dim,
                    levelData.nextElev
                  );
                  let blockCreateHid = await FormIt.Model.GetHistoryID();
                  let programBlock = await WSM.APICreateBlock(
                    blockCreateHid,
                    pt1,
                    pt2
                  );
                  let blockGroupCreateHid = await FormIt.Model.GetHistoryID();
                  let programBlockGroup = await WSM.APICreateGroup(
                    blockGroupCreateHid,
                    [programBlock]
                  );
                  groupBlocks.push(programBlockGroup);
                  cursor.y += dim;
                }
                cursor.x += half;
              } else {
                console.log("program failed to meet criteria", p);
              }
              if (cursor.y > tallestTypes) {
                tallestTypes = cursor.y;
              }
              cursor.y = typeReset;
            }
          }
          if (groupBlocks.length > 0) {
            let groupGroupCreateHid = await FormIt.Model.GetHistoryID();
            let groupGroup = await WSM.APICreateGroup(
              groupGroupCreateHid,
              groupBlocks
            );
            levelGroups.push(groupGroup);
          }
          cursor.x = 0;
        }
        if (levelGroups.length > 0) {
          let levelGroupCreateHid = await FormIt.Model.GetHistoryID();
          let levelGroup = await WSM.APICreateGroup(
            levelGroupCreateHid,
            levelGroups
          );
          if (levelId) {
            let setLevelGroupPropertiesHid = await FormIt.Model.GetHistoryID()
            await WSM.APISetObjectProperties(
              setLevelGroupPropertiesHid,//history
              levelGroup,//object id
              levelData.name,//object name
              true,//report area by level bool
              [levelId]//default level ids
            )
          }
          // if (levelId) {
          //   console.log('setting object levels',levelGroupCreateHid,levelGroup,levelId)
          //   let assignLevelsHid = await FormIt.Model.GetHistoryID()
          //   let results = await WSM.APISetObjectsLevels(
          //     assignLevelsHid,
          //     [levelGroup],
          //     [levelId]
          //   );
          //   console.log('result',results)
          // }

          topLevelGroups.push(levelGroup);
        }
        cursor.x = 0;
        cursor.y = 0;
      }
      console.log(topLevelGroups);
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
