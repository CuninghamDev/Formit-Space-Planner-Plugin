<template>
  <v-app>
    <v-app-bar app color="grey darken-2" dark>
      <div class="d-flex align-center">
        <h2 class="roboto-mono">Hello Vue + FormIt</h2>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <HelloVue />
    </v-main>
  </v-app>
</template>

<script>
import HelloVue from "./components/HelloVue";

export default {
  name: "App",

  components: {
    HelloVue,
  },

  data: () => ({
    //
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
