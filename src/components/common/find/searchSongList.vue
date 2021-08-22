<template id="list">
  <div class="findsong">
    <!-- <search-music></search-music> -->
    <!-- <button @click="test">test</button> -->

    <h1 class="number">找到{{ songNum }}首单曲</h1>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="单曲" name="first">
        <!-- 歌曲列表 -->
        <song-result></song-result>
      </el-tab-pane>
      <el-tab-pane label="视频" name="second">
        <search-videos></search-videos>
      </el-tab-pane>
      <!-- <el-tab-pane label="视频" name="third">视频</el-tab-pane> -->
      <!-- <el-tab-pane label="最新音乐" name="fourth">最新音乐</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import axios from "../../../network/axios";
import songResult from "./songResult.vue";
import searchMusic from ".././header/searchMusic.vue";
import searchVideos from "./searchVideos.vue";
export default {
  name: "searchSongList",
  components: {
    songResult,
    searchMusic,
    searchVideos,
  },
  data() {
    return {
      activeName: "first",
      songNum: this.$store.state.songCnt,
    };
  },

  methods: {
    test() {
      console.log(this.$store.state.songCnt);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style >
.findsong {
  padding: 5px;
}
.findsong .number {
  /* float: left; */
  font-size: 20px !important;
  font-weight: 700;
  text-align: left !important;
  padding-left: 5px;
  margin-bottom: 10px;
}
.el-tabs__nav {
  left: 10px;
}
.el-tabs__active-bar {
  background-color: rgb(236, 65, 65) !important;
}
.el-tabs__item.is-active {
  color: black;
  font-size: 16px;
  font-weight: 700;
}
.el-tabs__item:hover {
  color: black;
}
</style>
