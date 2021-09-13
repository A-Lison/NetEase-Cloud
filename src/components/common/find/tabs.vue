<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="个性推荐" name="first">
      <!-- 轮播展示 -->
      <lun-bo></lun-bo>
      <!-- 推荐歌单 -->
      <tui-jian-list></tui-jian-list>
    </el-tab-pane>
    <el-tab-pane label="Mikutap" name="second">
      <!-- <search-videos></search-videos> -->
      <mikutap></mikutap>
    </el-tab-pane>
    <!-- <el-tab-pane label="对光绘轴" name="third"> -->
    <!-- <search-videos></search-videos> -->
    <!-- <weavesilk></weavesilk> -->
    <!-- </el-tab-pane> -->
    <!-- <el-tab-pane label="排行榜" name="third">排行榜</el-tab-pane>
    <el-tab-pane label="最新音乐" name="fourth">最新音乐</el-tab-pane> -->
  </el-tabs>
</template>

<script>
import lunBo from "./lunBo.vue";
import tuiJianList from "./tuiJianList.vue";
import searchVideos from "./searchVideos.vue";
import mikutap from "./mikutap.vue";
import weavesilk from "./weavesilk.vue";
export default {
  name: "tabs",
  components: {
    lunBo,
    tuiJianList,
    searchVideos,
    mikutap,
    weavesilk,
  },
  data() {
    return {
      activeName: "first",
    };
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    tabFixed() {
      // 监听事件
      window.addEventListener("scroll", function () {
        console.log("456131");
        let t = $("body, html").scrollTop(); // 目前监听的是整个body的滚动条距离
        if (t > 0) {
          $(".el-tabs__header").addClass("box-active");
        } else {
          $(".el-tabs__header").removeClass("box-active");
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
<style >
/* 监听到滚动条开始滚动后的样式 */
.box-active {
  position: fixed;
  top: 0;
}

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