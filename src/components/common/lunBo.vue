<template>
  <!-- 底层主盒子 -->
  <div id="main">
    <!-- 虚化的背景 -->
    <!-- <div class="bg"></div> -->
    <div
      class="bg"
      :style="{ backgroundImage: 'url(' + coverImgUrl + ')' }"
    ></div>
    <!-- 放图片的底层盒子 -->
    <el-carousel
      class="lunbo"
      :interval="4000"
      type="card"
      height="200px"
      @change="getUrl"
    >
      <el-carousel-item v-for="(item, index) in imgArr" :key="item">
        <a hidefocus="true" href="https://music.163.com/song?id=1867243757"
          ><img
            class="medium"
            :src="imgArr[index]"
            alt=""
            ref="imgs"
            name="IMG"
        /></a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import axios from "../../network/axios";
export default {
  name: "lunBo",
  data() {
    return {
      imgArr: [
        "https://p1.music.126.net/CPvZlCxjst9CLv_tFu04_A==/109951166251697817.jpg?imageView&quality=89",
        "https://p1.music.126.net/VEX6hvq_r7YbgmhHAfDC9A==/109951166251616971.jpg?imageView&quality=89",
        "https://p1.music.126.net/rpTHy6rIAAu0yxkuOhqG9A==/109951166252220301.jpg?imageView&quality=89",
        "https://p1.music.126.net/tUyBpql8zrOuX8dLChGSyQ==/109951166254403832.jpg?imageView&quality=89",
        "https://p1.music.126.net/VozCDc2RsH4Vrlr0qxX_8g==/109951166251660910.jpg?imageView&quality=89",
        "http://p1.music.126.net/VvBM6bjwM2pdXqNc__PbHA==/109951166251656690.jpg?imageView&quality=89",
      ],
      coverImgUrl:
        "https://p1.music.126.net/CPvZlCxjst9CLv_tFu04_A==/109951166251697817.jpg?imageView&quality=89",
    };
  },
  created() {
    axios({
      url: "/banner",
    })
      .then((res) => {
        for (let index = 0; res.data.banners[index]; index++) {
          this.imgArr.splice(index, 1, res.data.banners[index].imageUrl);
        }
        // console.log("this.imgArr: " + this.imgArr);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getUrl(value) {
      this.coverImgUrl = this.imgArr[value];
    },
  },
};
</script>

<style scoped>
#main .bg {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  /* background-image: url(http://p1.music.126.net/VvBM6bjwM2pdXqNc__PbHA==/109951166251656690.jpg?imageView&quality=89); */
  background-size: 100% 100%;
  filter: blur(30px);
}
#main {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 280px;
}

.lunbo {
  padding-top: 34px;
  width: 1080px;
  height: 260px;
  /* background-color: pink; */
  margin: 0 auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.medium {
  width: 100%;
}
</style>
<style lang="">
.lunbo {
  position: relative;
  z-index: 0;
}
</style>