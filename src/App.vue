<template>
  <div id="app">
    <index></index>
    <!-- <router-view /> -->
  </div>
</template>

<script>
import index from "./components/index";

// new Vue().$mount("#app");
export default {
  name: "App",
  components: {
    index,
  },
};
</script>

<style>
@import "assets/CSS/base.css";

/* .top,
.footer {
  background-color: rgb(241, 128, 128);


  width: 100%;
  height: 60px;
}
.footer {
  position: fixed;
  bottom: 0;
}
.main {
  background-color: rgb(230, 175, 175);
  height: 660px;

}
.main .gedan {

  float: left;
  background-color: rgb(219, 89, 89);
  width: 250px;
  height: 100%;
} */
</style>
