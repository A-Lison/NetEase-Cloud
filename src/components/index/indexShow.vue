<template >
  <div class="body" v-if="isShow">
    <div class="container">
      <video
        src="~assets/vedio/indexVideo.mp4"
        autoplay=""
        muted=""
        loop=""
      ></video>
      <div class="box">
        <div>
          <span
            ><video
              src="~assets/vedio/indexVideo.mp4"
              autoplay=""
              muted=""
              loop=""
            ></video
          ></span>
          <span
            ><video
              src="~assets/vedio/indexVideo.mp4"
              autoplay=""
              muted=""
              loop=""
            ></video
          ></span>
          <span
            ><video
              src="~assets/vedio/indexVideo.mp4"
              autoplay=""
              muted=""
              loop=""
            ></video
          ></span>
        </div>
      </div>
      <!-- <div class="enter" @click="$emit('update:isShow', false)"> -->
      <div class="enter" @click="click">
        <img
          class="enterlogo"
          src="~assets/img/enter.png"
          alt=""
          width="100%"
        />
      </div>
    </div>
    <!-- <button @click="$emit('update:isShow', false)">Music &nbsp; Start</button> -->
  </div>
</template>

<script>
export default {
  name: "indexShow",
  // props: {
  //   isShow: Boolean,
  // },
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    click() {
      this.isShow = false;
      // var val = this.isShow;
      // $emit("update:isShow", false);
      this.$router.push("/index");
      console.log("this.$parent.isShow:" + this.$parent.isShow);
    },
  },
  // destroyed() {
  //   this.$router.push("/index");
  //   // console.log(123456);
  // },
};
</script>

<style scoped>
/* NetEase-Cloud\src\assets\CSS\style.css */
@import "../../assets/CSS/style.css";
.enter {
  /* margin: 10px auto; */
  position: absolute;
  width: 120px;
  height: 40px;
  bottom: 5px;
  left: 5px;
}

.enter:hover {
  transition: ease 1s;
  /* left: 5px;
  width: 123px;
  height: 40px; */
  transform: scale(1.2);
}
.body {
  margin: 0;
  /*外边距*/
  padding: 0;
  /*内边距*/
  background-color: #000;
  /*背景颜色*/
}

button {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 185px;
  height: 50px;
  text-align: center;
  font-size: 20px;
  line-height: 20px;
  padding-top: 15px;
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  font-family: sans-serif;
  box-sizing: border-box;
  /* border: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4, #f441a5, #ffeb3b, #03a9f4) 2px solid; */
  background: linear-gradient(
    90deg,
    #03a9f4,
    #f441a5,
    #ffeb3b,
    #03a9f4,
    #f441a5,
    #ffeb3b,
    #03a9f4
  );
  border-radius: 60px;
  background-size: 400%;
  z-index: 1;
  /*层叠定位*/
}

button:hover {
  animation: animate 8s linear infinite alternate;
  /*动画: 名称 时间 线性 循环 播放完回退播放*/
}

@keyframes animate {
  0% {
    background-position: 0%;
    /*修改背景定位，实现渐变色炫光*/
  }

  50% {
    background-position: 100%;
  }

  100% {
    background-position: 0%;
  }
}

button::before {
  /*之前添加*/
  content: "";
  /*内容*/
  position: absolute;
  /*绝对定位*/
  top: -5px;
  /*当设置对立的2个定位属性时，元素的大小将由对立的大小决定*/
  left: -5px;
  right: -5px;
  bottom: -5px;
  /*当设置对立的2个定位属性时，元素的大小将由对立的大小决定*/
  z-index: -1;
  background: linear-gradient(
    90deg,
    #03a9f4,
    #f441a5,
    #ffeb3b,
    #03a9f4,
    #f441a5,
    #ffeb3b,
    #03a9f4
  );
  border-radius: 40px;
  background-size: 400%;
  filter: blur(20px);
  /*过渡：模糊*/
  opacity: 0;
  /*透明度*/
  transition: 1s;
  /*过渡时间*/
}

button:hover::before {
  filter: blur(20px);
  opacity: 1;
  animation: animate 8s linear infinite;
  /*注意动画名称统一*/
}
</style>
