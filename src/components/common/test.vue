<template>
  <div class="anniu">
    <button class="post" @click="getRequest">发送</button>
    <div>返回的数据：{{ message }}</div>
    <!-- <video src=""></video> -->
  </div>
</template>

<script>
// import { request } from "../network/request";
import axios from "../../network/axios";
// import axios from "axios";

export default {
  name: "test",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    getRequest() {
      axios({
        url: "/mv/url",
        params: {
          id: "14300290",
        },
      })
        .then((res) => {
          // console.log(res.data.klyric.lyric);
          console.log(res);
          this.message = res;
        })
        .catch((err) => {
          this.message = err;
          console.log(err);
        });

      // request({
      //   url: "/playlist/hot",
      //   method: "post",
      // })
      //   .then((res) => {
      //     console.log(res);
      //     this.message = res;
      //   })
      //   .catch((err) => {
      //     this.message = err;
      //     console.log(err);
      //   });

      //   axios({
      //     url: "/playlist/hot" /*热门歌单接口地址*/,
      //     method: "post",
      //   })
      //     .then((res) => {
      //       this.message = res.data.tags;
      //       console.log("我拿到的数据：", res.data.tags);
      //     })
      //     .catch((err) => {
      //       this.message = res.data.tags;
      //       console.log(err);
      //     });
    },
  },
};
</script>

<style scoped>
</style>
