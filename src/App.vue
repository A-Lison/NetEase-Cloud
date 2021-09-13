<template>
  <div id="app">
    <!-- <index-show v-if="isShow" :isShow.sync="isShow"></index-show> -->
    <!-- <index-show v-if="isShow" @change-type="changeIsShow"></index-show> -->
    <router-view></router-view>
    <el-backtop :visibility-height="60">
      <i class="el-icon-caret-top"></i>
    </el-backtop>
    <!-- <router-view name="index"></router-view> -->
    <!-- <index></index> -->
    <!-- <button @click="route">跳转</button> -->
    <!-- <test></test> -->
    <!-- <router-link to="/test">点击</router-link> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import index from "./components/index";
import test from "../src/components/common/test.vue";
import indexShow from "./components/index/indexShow.vue";

// new Vue().$mount("#app");
export default {
  name: "App",
  components: {
    index,
    test,
    indexShow,
  },
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    changeIsShow(val) {
      this.isShow = val;
      console.log("parent；" + val);
    },
    route() {
      this.$router.push("/test");
    },
  },
};
</script>

<style>
@import "assets/CSS/base.css";
/* 隐藏页面滚动条 */
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.el-backtop {
  bottom: 150px !important;
}
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
