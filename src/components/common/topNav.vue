<template>
  <div class="top-nav">
    <h1 class="logo">
      <a href="#">网易云音乐</a>
    </h1>
    <search-music class="ser-mu">12335646</search-music>
    <sing-in class="singin"></sing-in>
  </div>
</template>

<script>
import findMusic from "./findMusic.vue";
import searchMusic from "./header/searchMusic.vue";
import singIn from "./header/singIn.vue";
export default {
  name: "topNav",
  components: {
    findMusic,
    searchMusic,
    singIn,
  },
};
</script>

<style scoped>
* {
  color: #fff;
}
.singin {
  float: right;
}
.ser-mu {
  margin-left: 300px;
  /* margin-top: 3px; */
}

.top-nav {
  position: relative;
  width: 100%;
  height: 70px;
  /* background-color: rgb(33, 33, 36); */
  /* border-bottom: rgb(194, 12, 12) 3px solid; */
  background-color: rgb(236, 65, 65);
}

.logo {
  float: left;
  margin-left: 15px;
  width: 176px;
  height: 69px;
  background-position: 0 0;
  background: url(https://s2.music.126.net/style/web2/img/frame/topbar.png?e9bedca67b5a348d1dd253ffb0b46bd2)
    no-repeat;
  /* background: url(../assets/img/logo.png) no-repeat; */
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
