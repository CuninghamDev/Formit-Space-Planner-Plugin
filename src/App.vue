<template>
  <v-app>
    <v-app-bar app color="grey darken-2" dark dense>
      <div class="d-flex align-center my-0 py-0">
        <h2 class="roboto-mono my-0 py-0">Planning Blocks</h2>
      </div>

      <template v-slot:extension>
        <v-tabs v-model="selectedTab" show-arrows>
          <v-tab v-for="(tab, i) in tabs" :key="i"> {{ tab }}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <plan-select-tab v-if="selectedTab == 0" />
      <block-creation-tab v-if="selectedTab == 1" />
      <block-validation-tab v-if="selectedTab == 2" />
    </v-main>
  </v-app>
</template>

<script>
import BlockCreationTab from "./components/blockCreation/blockCreationTab.vue";
import BlockValidationTab from "./components/blockValidation/blockValidationTab.vue";
import PlanSelectTab from "./components/planSelect/planSelectTab.vue";

export default {
  name: "App",

  components: {
    BlockCreationTab,
    BlockValidationTab,
    PlanSelectTab,
  },

  data: () => ({
    tabs: ["Select Plan", "Create", "validate"],
    selectedTab: 0,
  }),
};
</script>

<style>
.pointer {
  cursor: pointer;
}
.roboto-mono {
  font-family: roboto mono;
}
.roboto {
  font-family: roboto;
}
</style>
