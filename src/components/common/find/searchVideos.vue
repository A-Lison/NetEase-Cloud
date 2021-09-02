<template>
  <div class="shipings">
    <div
      class="video"
      v-for="(item, index) in videos"
      :key="index"
      @click="boFangVideos(item)"
    >
      <div class="mv-img">
        <img :src="item.coverUrl" alt="" width="100%" />
      </div>

      <div class="name">{{ item.title }}</div>
      <div class="author">{{ item.userName }}</div>
    </div>
  </div>
</template>

<script>
import axios from "../../../network/axios";
export default {
  name: "searchVideos",
  data() {
    return {
      videos: [
        {
          userName: "",
          title: "",
          coverUrl: "",
          vid: "",
        },
      ],
    };
  },
  watch: {
    "$store.state.searchMusicList"() {
      for (let index = 0; this.$store.state.searchVideos[index]; index++) {
        this.$set(this.videos, index, {
          userName: this.$store.state.searchVideos[index].userName,
          title: this.$store.state.searchVideos[index].title,
          coverUrl: this.$store.state.searchVideos[index].coverUrl,
          vid: this.$store.state.searchVideos[index].vid,
        });
        //   this.$refs.imgs.style.background = this.videos[index].coverUrl;
      }
    },
  },
  created() {
    for (let index = 0; this.$store.state.searchVideos[index]; index++) {
      this.$set(this.videos, index, {
        userName: this.$store.state.searchVideos[index].userName,
        title: this.$store.state.searchVideos[index].title,
        coverUrl: this.$store.state.searchVideos[index].coverUrl,
        vid: this.$store.state.searchVideos[index].vid,
      });
      //   this.$refs.imgs.style.background = this.videos[index].coverUrl;
    }
    // console.log(this.videos[2].vid);
  },
  methods: {
    boFangVideos(val) {
      axios({
        url: "/video/url",
        params: {
          id: val.vid,
        },
      })
        .then((res) => {
          // console.log(res.data.data.url);
          var mvUrl = res.data.urls[0].url;
          this.$store.commit({
            type: "boFangMV",
            mvUrl,
          });
          //   console.log(this.$store.state.mvUrl);
          console.log("提交成功");
        })
        .catch((err) => {
          console.log(err);
        });
      this.$router.push("/onMv");
    },
  },
};
</script>

<style scoped>
/* .videobox {
  margin: 20px auto;
} */
.shipings .name,
.shipings .author {
  display: block;
  text-align: left !important;
  width: 300px;
}
.shipings {
  margin: 20px auto;
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  width: 100%;
  height: auto;
  padding-bottom: 35px;
}
.video {
  margin-right: 22px;
  margin-bottom: 18px;
}
.name {
  font-size: 14px;
  margin-top: 10px;
}
.author {
  color: rgb(103, 103, 103);
}

.mv-img {
  border-radius: 5px !important;
  width: 300px;
  height: 170px;
  overflow: hidden;
  /* margin-right: 10px; */
}
.videobox i,
.tit {
  float: left !important;
  font-weight: 600;
}
.videobox {
  margin: 10px 80px;
}
.tit {
  text-align: left !important;
  float: left;
  font-size: 20px;
  margin-top: 10px;
  border-bottom: 4px solid rgb(236, 65, 65);
}
.mvb {
  /* height: 300px; */
  width: 100%;
  padding-bottom: 2%;
  /* background-color: pink; */
}
/* .vi-top {
  width: 100%;
  
}
.searchshiping,
.ser-icon {
  float: left;
}
.searchshiping {
  
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

  height: 40px;
  border: rgb(236, 65, 65) 1px solid;
  width: 666px;
}
.ser-icon {
  height: 40px;
 
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: rgb(236, 65, 65) 1px solid;
  border-left: none;
  width: 30px;
  background-color: pink;
} */
</style>
