<template>
  <div class="containera">
    <div class="welcome">
      <div class="pinkbox" ref="yidong">
        <!-- 注册 -->
        <div class="signup nodisplay" ref="signup">
          <h1 class="h1">Register</h1>
          <!-- <form autocomplete="off"> -->
          <input
            class="inp"
            type="text"
            v-model="nickname"
            placeholder="昵称"
          />
          <input
            class="inp"
            type="email"
            v-model="phone"
            placeholder="手机号码"
          />
          <input
            class="inp"
            type="password"
            v-model="password"
            placeholder="密码"
          />
          <input
            class="inp"
            type="password"
            v-model="checkPw"
            placeholder="确认密码"
          />
          <input
            class="inp put-captcha"
            type="captcha"
            placeholder="手机验证码"
            v-model="captcha"
          />
          <!-- <span class="captcha">获取验证码</span> -->
          <button
            class="captcha but button"
            style="display: inline"
            @click="getCaptcha"
          >
            获取验证码
          </button>

          <button class="but button submit" @click="zhuCe">
            Create Account
          </button>
          <!-- </form> -->
        </div>

        <!-- 登录 -->
        <div class="signin" ref="signin">
          <h1 class="h1">Sign In</h1>
          <!-- <form class="more-padding" autocomplete="off"> -->

          <input
            class="inp"
            type="text"
            v-model="phone"
            placeholder="手机号码"
          />
          <input
            class="inp"
            type="password"
            v-model="password"
            placeholder="密码"
          />
          <div v-show="isReSet">
            <input
              class="inp"
              type="password"
              v-model="checkPw"
              placeholder="确认密码"
            />
            <input
              class="inp put-captcha"
              type="captcha"
              placeholder="手机验证码"
              v-model="captcha"
            />
            <button
              class="captcha but button"
              style="display: inline"
              @click="getCaptcha"
            >
              获取验证码
            </button>
          </div>
          <button class="but button sumbit" @click="login" v-show="isLogin">
            Login
          </button>
          <button class="but button sumbit" @click="reSetPW" v-show="!isLogin">
            确认重置
          </button>

          <button class="but button repw" @click="forgetPW">忘记密码?</button>
          <!-- <button class="but button sumbit" @click="QRcode">二维码登录</button> -->
          <!-- </form> -->
        </div>
      </div>

      <div class="leftbox">
        <h2 class="titlea"><span class="spana">一首歌</span>&<br />一个故事</h2>
        <!-- <p class="desc">Pick your perfect <span>bouquet</span></p> -->
        <img class="flower smaller" src="./img/longin.jpg" />
        <p class="pa account">已有账号？</p>
        <button class="but button" id="signin" @click="toRight">登录</button>
      </div>

      <div class="rightbox">
        <h2 class="titlea">
          <span class="spana">故事不长</span>&<br />也不难讲
        </h2>
        <!-- <p class="desc">Pick your perfect <span>bouquet</span></p> -->
        <img class="flower" src="./img/singin.jpg" />
        <p class="pa account">还未有账号？</p>
        <button class="but button" id="signup" @click="toLeft">注册</button>
      </div>
    </div>
  </div>
</template>
<script >
import axios from "../../../../network/axios";
// import script from './script'
export default {
  name: "login",
  data() {
    return {
      phone: "",
      password: "",
      captcha: "",
      nickname: "",
      checkCap: "",
      checkPw: "",
      isCreated: 0,
      isReSet: false,
      isLogin: true,
    };
  },
  //    mounted() {

  //       this.timer = setTimeout(this.get, 1000);

  //     },
  //   computed: {
  //     isCreated: function () {
  //       axios({
  //         url: "/cellphone/existence/check",
  //         params: {
  //           phone: this.phone,
  //         },
  //       })
  //         .then((res) => {
  //           //   let flag = 2;
  //           if (res.data.hasPassword === "false") {
  //             // flag = 0; //账号未存在或账号已存在但还没有设置密码
  //             return 1;
  //           } else {
  //             // flag = 1;
  //             return 2;
  //           }
  //           //   res.data.hasPassword;
  //           console.log(res);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //       //   return flag;
  //     },
  //   },
  methods: {
    // 验证输入的验证码
    checkCaptcha() {
      axios({
        url: "/captcha/verify",
        params: {
          captcha: this.captcha,
          phone: this.phone,
        },
      })
        .then((res) => {
          // console.log(this.password + "    " + this.phone);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //   获取手机验证码
    getCaptcha() {
      if (this.phone === "") {
        alert("请输入手机号码");
      } else {
        axios({
          url: "/captcha/sent",
          params: {
            phone: this.phone,
          },
        })
          .then((res) => {
            console.log("获取了验证码");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 检测账号是否已经存在
    checkCreated() {
      axios({
        url: "/cellphone/existence/check",
        params: {
          phone: 17344538056,
        },
      })
        .then((res) => {
          if (res.data.hasPassword === false) {
            this.isCreated = -1;
            console.log("账号不存在");
          } else {
            this.isCreated = 1;
            console.log("账号存在");
          }
          //   res.data.hasPassword;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //   注册
    zhuCe() {
      this.checkCreated();
      //   console.log("测： " + this.isCreated);
      if (
        this.captcha === "" ||
        this.phone === "" ||
        this.password === "" ||
        this.nickname === ""
      ) {
        alert("请完善信息");
      } else if (this.password != this.checkPw) {
        alert("请确认密码");
      } else if (this.isCreated === 1) {
        alert("账号已存在,请登录");
      } else {
        // axios
        //   .post("/register/cellphone", {
        //     phone: this.phone,
        //     password: this.password,
        //     captcha: this.captcha,
        //     nickname: this.nickname,
        //   })
        axios({
          url: "/register/cellphone",
          params: {
            phone: this.phone,
            password: this.password,
            captcha: this.captcha,
            nickname: this.nickname,
          },
        })
          .then((res) => {
            if (!res.data.account.id) {
              alert("注册成功,请登录");
            }
            console.log(this.password + "    " + this.phone);
            console.log(res);
          })
          .catch((err) => {
            console.log("err:  " + err);
          });
      }
    },
    // 登录
    login() {
      if (this.phone === "" || this.password === "") {
        alert("请输入账号/密码");
      } else {
        axios({
          url: "/login/cellphone",
          params: {
            phone: this.phone,
            password: this.password,
          },
        })
          .then((res) => {
            if (res.data.code === 400) {
              alert("账号未存在");
            } else if (res.data.msg === "密码错误") {
              alert("密码错误");
            } else {
              //   this.$store.state.user.userPic = res.data.profile.avatarUrl;
              var isLogin = !this.$store.state.isLogin;
              this.$store.commit({
                type: "changeIsLogin",
                isLogin,
              });
              var table = {
                userPic: res.data.profile.avatarUrl,
                userName: res.data.profile.nickname,
              };
              const user = {};
              Object.assign(user, table);
              localStorage.setItem("token", res.data.token);
              this.$store.commit({
                type: "changeUser",
                user,
              });
              alert("登录成功" + this.$store.state.isLogin);
              console.log(res);
              this.$router.push("/index/discover");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 忘记密码
    forgetPW() {
      this.isReSet = !this.isReSet;
      this.isLogin = !this.isLogin;
    },
    // 重置密码

    reSetPW() {
      if (this.captcha === "" || this.phone === "" || this.password === "") {
        alert("请完善信息");
      } else if (this.password != this.checkPw) {
        alert("请确认密码");
      } else {
        axios({
          url: "/register/cellphone",
          params: {
            captcha: this.captcha,
            phone: this.phone,
            password: this.password,
          },
        })
          .then((res) => {
            alert("重置密码成功");
            this.isReSet = !this.isReSet;

            this.isLogin = !this.isLogin;
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    toLeft() {
      this.$refs.yidong.style.transform = "translateX(80%)";
      this.$refs.signin.style.display = "none";
      this.$refs.signin.style.transition = "all 0.5s ease";
      this.$refs.signup.style.display = "block";
    },
    toRight() {
      this.$refs.signup.style.display = "none";
      this.$refs.signup.style.transition = "all 0.5s ease";
      this.$refs.signin.style.display = "block";
      this.$refs.yidong.style.transform = "translateX(0%)";
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400|Lora");

/* body {
  background: #cbc0d3;
} */
.put-captcha {
  width: 40% !important;
}
.captcha,
.repw {
  padding: 1px !important;
  border-radius: 0 !important;
}
/* 容器的样式 */
.containera {
  width: 650px;
  height: 550px;
  position: relative;
  margin: 0px auto;
  top: -12%;
}

.welcome {
  background: #f6f6f6;
  width: 650px;
  height: 415px;
  position: absolute;
  top: 25%;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}

.pinkbox {
  position: absolute;
  top: -10%;
  left: 5%;
  background: rgb(222, 53, 55);
  width: 320px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
  z-index: 2;
}

.nodisplay {
  display: none;
  transition: all 0.5s ease;
}

.leftbox,
.rightbox {
  position: absolute;
  width: 50%;
  transition: 1s all ease;
}

.leftbox {
  left: -2%;
}

.rightbox {
  right: -2%;
}

/* 字体和按钮的样式 */
.h1 {
  font-family: "Open Sans", sans-serif;
  text-align: center;
  margin-top: 95px;
  text-transform: uppercase;
  color: #f6f6f6;
  font-size: 2em;
  letter-spacing: 8px;
}

.titlea {
  font-family: "Lora", serif;
  color: #8e9aaf;
  font-size: 1.8em;
  line-height: 1.1em;
  letter-spacing: 3px;
  text-align: center;
  font-weight: 300;
  margin-top: 20%;
}

.desc {
  margin-top: -8px;
}

.account {
  margin-top: 45%;
  font-size: 10px;
}

.pa {
  font-family: "Open Sans", sans-serif;
  font-size: 0.7em;
  letter-spacing: 2px;
  color: #8e9aaf;
  text-align: center;
}

.spana {
  color: rgba(222, 53, 55, 0.6);
}

.flower {
  position: absolute;
  width: 130px;
  height: 130px;
  top: 37%;
  left: 27%;
  opacity: 0.8;
}

.smaller {
  width: 130px;
  height: 130px;
  top: 37%;
  left: 30%;
  opacity: 0.9;
}

.but {
  padding: 12px;
  font-family: "Open Sans", sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 11px;
  border-radius: 10px;
  margin: auto;
  outline: none;
  display: block;
}

.but:hover {
  background: #eac7cc;
  color: #f6f6f6;
  transition: background-color 1s ease-out;
}

.button {
  margin-top: 3%;
  background: #f6f6f6;
  color: #ce7d88;
  border: solid 1px #eac7cc;
}

/* 表单样式 */
form {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 7px;
}

.more-padding {
  padding-top: 35px;
}

.more-padding .inp {
  padding: 12px;
}

.more-padding .sumbit {
  margin-top: 45px;
}

.sumbit {
  margin-top: 25px;
  padding: 12px;
  border-color: rgb(222, 53, 55);
}

.sumbit:hover {
  background: #cbc0d3;
  border-color: #bfb1c9;
}

.inp {
  background: rgb(222, 53, 55);
  width: 65%;
  color: #fff;
  border: none;
  border-bottom: 1px solid rgba(246, 246, 246, 0.5);
  padding: 9px;

  font-weight: 100;
}

.inp::placeholder {
  color: #f6f6f6;
  letter-spacing: 2px;
  font-size: 1em;
  font-weight: 100;
}

.inp:focus {
  color: #f6f6f6;
  outline: none;
  border-bottom: 1.2px solid rgba(206, 125, 136, 0.7);
  font-size: 1em;
  transition: 0.8s all ease;
}

.inp:focus::placeholder {
  opacity: 0;
}

label {
  font-family: "Open Sans", sans-serif;
  color: rgb(222, 53, 55);
  font-size: 0.8em;
  letter-spacing: 1px;
}

.checkbox {
  display: inline;
  white-space: nowrap;
  position: relative;
  left: -52px;
  top: 25px;
}

.inp[type="checkbox"] {
  width: 15px;
  background: rgb(222, 53, 55);
}

.checkbox .inp[type="checkbox"]:checked + label {
  color: rgb(222, 53, 55);
  transition: 0.5s all ease;
}
</style>
