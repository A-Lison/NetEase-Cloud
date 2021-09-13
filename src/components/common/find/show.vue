<template>
  <div class="lun-bo">
    <main id="main">
      <!-- 虚化背景 -->
      <div class="bg"></div>
      <!-- 图片框 -->
      <section>
        <!-- 放图片 -->
        <div class="tupian">
          <img src="../assets/img/test/bg-1.jpg" class="image" />
        </div>
        <!-- 小圆点 -->
        <div class="select">
          <!-- <div class="dian"></div>
          <div class="dian check"></div> -->
        </div>
        <!-- 左右切换按钮 -->
        <el-icon-arrow-left class="left"></el-icon-arrow-left>
        <el-icon-arrow-right class="right"></el-icon-arrow-right>
        <!-- 
        <div class="bt left"><span class="anniu"></span></div>
        <div class="bt right"><span class="anniu"></span></div> -->
      </section>
    </main>
    <div class="txt">北极光之夜</div>
  </div>
</template>

<script>
export default {
  name: "show",
};
</script>

<style scoped>
@font-face {
  font-family: "icomoon";
  src: url("fonts/icomoon.eot?wr5es");
  src: url("fonts/icomoon.eot?wr5es#iefix") format("embedded-opentype"),
    url("fonts/icomoon.ttf?wr5es") format("truetype"),
    url("fonts/icomoon.woff?wr5es") format("woff"),
    url("fonts/icomoon.svg?wr5es#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

* {
  font-family: "icomoon";
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: rgba(50, 128, 102, 0.9);
}

main {
  position: relative;
  top: 20vh;
  height: 300px;
  width: 100%;
  overflow: hidden;
}

main .bg {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-image: url(img/images/1.jpg);
  background-size: 100% 100%;
  filter: blur(30px);
}

main section {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  width: 100%;
  max-width: 980px;
}

main section .tupian {
  width: 100%;
  height: 100%;
}

main section .tupian .image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.yun {
  animation: bian 5s linear infinite;
}

@keyframes bian {
  0%,
  100% {
    opacity: 0.2;
    backdrop-filter: blur(10px);
  }

  30%,
  80% {
    opacity: 1;
    backdrop-filter: blur(0px);
  }
}

main .select {
  position: absolute;
  bottom: 10px;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

main .select .dian {
  margin: 3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid rgb(255, 254, 254);
}

main .select .dian:hover {
  background-color: rgb(255, 254, 254);
  cursor: pointer;
}

.check {
  background-color: rgb(255, 254, 254);
}

main section .bt {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-color: rgba(82, 81, 81, 0.2);
  border-radius: 20%;
  cursor: pointer;
  transition: all 0.3s;
}

main section .bt:hover {
  box-shadow: inset 0 0 1px rgba(255, 255, 255, 0.8),
    inset 0 0 5px rgba(255, 255, 255, 0.8),
    inset 0 0 15px rgba(255, 255, 255, 0.8);
}

main section .left {
  left: -60px;
}

main section .right {
  right: -60px;
}

/*当屏幕尺寸小于1100px时，应用下面的CSS样式,详细用法网址：https://www.xuewangzhan.net/baike/css3-379.html*/
@media screen and (max-width: 1100px) {
  main section .left {
    left: 20px;
  }

  main section .right {
    right: 20px;
  }
}

main section .anniu {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  color: rgb(255, 255, 255);
  user-select: none;
  transition: all 0.3s;
}

.txt {
  position: fixed;
  bottom: 5vh;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100px;
  font-family: "fangsong";
  font-size: 50px;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  user-select: none;
}
</style>