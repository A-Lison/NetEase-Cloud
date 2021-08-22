<template>
  <div class="top-nav">
    <a href="#"> <h1 class="logo"></h1></a>

    <search-music class="ser-mu"></search-music>
    <!-- 登录 -->
    <div class="signbox">
      <!-- <button @click="test">test</button> -->
      <img class="singin" :src="userPic" alt="" @click="sign" />
      <div class="yonghu" style="text-align: left">{{ niName }}</div>
      <!-- <sing-in class="singin"></sing-in> -->
    </div>
  </div>
</template>

<script>
import findMusic from "./find/discover.vue";
import searchMusic from "./header/searchMusic.vue";
import singIn from "./header/singIn.vue";
import login from "./header/login/login.vue";
export default {
  name: "topNav",
  data() {
    return {
      niName: "未登录",
      //  require("assets/logo.png"),
      userPic: require("assets/img/sign.jpg"),
    };
  },
  watch: {
    "$store.state.isLogin"() {
      this.niName = this.$store.state.user.userName;
      this.userPic = this.$store.state.user.userPic;
    },
  },
  components: {
    findMusic,
    searchMusic,
    singIn,
    login,
  },
  methods: {
    test() {
      console.log(this.$store.state.user.userPic);
      console.log(this.$store.state.user.userName);
    },
    sign() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
* {
  color: #fff;
}
.signbox {
  position: absolute;
  right: 100px;
}
.yonghu {
  float: left;
  margin-top: 10px;
}
.singin {
  float: left;
  margin-right: 20px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.ser-mu {
  margin-left: 300px;
  /* margin-top: 3px; */
}

.top-nav {
  display: flex;
  align-items: center;
  /* position: relative; */
  position: fixed;

  width: 100%;
  height: 60px;
  /* background-color: rgb(33, 33, 36); */
  /* border-bottom: rgb(194, 12, 12) 3px solid; */
  background-color: rgb(236, 65, 65);
  z-index: 10;
}
/* .logo,
.ser-mu,
.singin {
  text-align: center;
} */
.logo {
  position: relative;
  float: left;
  margin-left: 15px;
  top: 50%;
  width: 176px;
  height: 70px;
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
