<template>
  <div id="app">
    <top-nav></top-nav>
    <!-- <test></test> -->
    <!-- <router-view /> -->
  </div>
</template>

<script>
import test from "./components/test.vue";
import topNav from "./components/topNav.vue";

export default {
  name: "App",
  components: {
    test,
    topNav,
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "sm":
          return 400;
        case "md":
          return 500;
        case "lg":
          return 600;
        case "xl":
          return 800;
      }
    },
  },
};
</script>

<style>
</style>
