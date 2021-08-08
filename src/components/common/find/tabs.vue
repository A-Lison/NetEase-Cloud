<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="个性推荐" name="first">
      <!-- 轮播展示 -->
      <lun-bo></lun-bo>
    </el-tab-pane>
    <el-tab-pane label="歌单" name="second">歌单</el-tab-pane>
    <el-tab-pane label="排行榜" name="third">排行榜</el-tab-pane>
    <el-tab-pane label="最新音乐" name="fourth">最新音乐</el-tab-pane>
  </el-tabs>
</template>

<script>
import lunBo from "../lunBo.vue";
export default {
  name: "tabs",
  components: {
    lunBo,
  },
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped>
</style>
<style >
.el-tabs__nav {
  left: 10px;
}
.el-tabs__active-bar {
  background-color: rgb(236, 65, 65) !important;
}
.el-tabs__item.is-active {
  color: black;
  font-size: 20px;
}
.el-tabs__item:hover {
  color: black;
}
</style>