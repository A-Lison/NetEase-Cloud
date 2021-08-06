<template>
  <div id="app">
    <!-- 顶部导航 -->
    <top-nav></top-nav>
    <!-- 轮播展示 -->
    <lun-bo></lun-bo>
    <!-- 总体布局容器 -->
    <!-- <div class="top">top</div>
    <div class="main">
      <div class="gedan">歌单</div>
      推荐
    </div>
    <div class="footer">footer</div> -->
    <!-- <test></test> -->
    <!-- <router-view /> -->
  </div>
</template>

<script>
import test from "./components/test.vue";
import topNav from "./components/topNav.vue";
import lunBo from "./components/lunBo.vue";

// new Vue().$mount("#app");
export default {
  name: "App",
  components: {
    test,
    topNav,
    lunBo,
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
