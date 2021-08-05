<template>
  <div class="top-nav">
    <div class="top">
      <div class="mtop">
        <h1 class="logo">
          <a href="#">网易云音乐</a>
        </h1>
        <div class="top-main">
          <div class="item item-1">发现音乐<slot slot="find"></slot></div>
          <div class="item item-2">我的音乐<slot slot="my">2</slot></div>
          <div class="item item-3">最近播放<slot slot="last">3</slot></div>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import findMusic from "./findMusic.vue";
export default {
  name: "topNav",
  components: {
    findMusic,
  },
};
</script>

<style scoped>
* {
  color: #fff;
}
.top-nav .top {
  position: relative;
  width: 100%;
  height: 70px;
  background-color: rgb(33, 33, 36);
}
.bottom {
  width: 100%;
  height: 20px;
  background-color: rgb(194, 12, 12);
}
.mtop {
  width: 1100px;
  height: 100%;
  margin: 0 auto;
}
.logo {
  float: left;
  width: 176px;
  height: 69px;
  background-position: 0 0;
  background: url(https://s2.music.126.net/style/web2/img/frame/topbar.png?e9bedca67b5a348d1dd253ffb0b46bd2)
    no-repeat;
}
.logo a {
  float: left;
  width: 157px;
  height: 100%;
  padding-right: 20px;
  text-indent: -9999px;
}
.top-main {
  margin-left: 170px;
  height: 100%;
  width: 333px;
  /* background-color: #fff; */
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: auto;
}
.item {
  padding-top: 23px;
  flex-grow: 1;
  text-align: center;
  color: #fff;
  font-size: 14px;
  height: 70px;
}
</style>
