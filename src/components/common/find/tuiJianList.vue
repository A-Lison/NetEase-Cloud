<template>
  <div class="tuijianlist">
    <div class="title">
      <span>推荐歌曲</span>
      <i class="el-icon-arrow-right titleicon"></i><br />
      <div class="songlist">
        <div
          class="song"
          v-for="(item, index) in zuixinlist"
          :key="index"
          @click="boFang(item)"
        >
          <div><img :src="item.picUrl" alt="" /></div>

          <h1>{{ item.song }}-{{ item.singer }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../../network/axios";
export default {
  name: "tuiJianList",
  data() {
    return {
      zuixinlist: [
        {
          musicid: 123,
          song: "",
          singer: "",
          // zhuanji:"",
          picUrl: "",
          time: 0,
        },
      ],
    };
  },
  created() {
    console.log(11111);
    axios({
      url: "/personalized/newsong",
    })
      .then((res) => {
        for (let index = 0; res.data.result[index]; index++) {
          this.$set(this.zuixinlist, index, {
            musicid: res.data.result[index].id,
            song: res.data.result[index].name,
            singer: res.data.result[index].song.artists[0].name,
            // res.data.result[index].song.artists[1].name,
            // zhuanji: res.data.result[index].id,
            picUrl: res.data.result[index].picUrl,
            // time: this.formatTime(res.data.result[index].song.duration),
          });
          // for (let j = 0; res.data.result[index].song.artists[j]; j++) {
          //   this.zuixinlist[index].singer[j] =
          //     res.data.result[index].song.artists[j].name;
          // }
        }
        console.log(this.zuixinlist);

        // console.log(res.data.klyric.lyric);
        console.log(res);
      })
      .catch((err) => {
        this.message = err;
        console.log("err:  " + err);
      });
  },
  methods: {
    boFang(val) {
      this.$store.state.playId = val.musicid;
      this.$store.state.songId =
        "https://music.163.com/song/media/outer/url?" +
        "id=" +
        val.musicid +
        ".mp3";
      this.$store.state.playSong = val.song;
      this.$store.state.playSinger = val.singer;
      this.$store.state.playPicUrl = val.picUrl;
      // this.picUrl = this.$store.state.playPicUrl;

      // 改变播放歌曲信息
      const table = {
        id: val.musicid,
        playPicUrl: val.picUrl,
        playSong: val.song,
        playSinger: val.singer,
        dt: val.time,
      };
      const playDetail = {};
      Object.assign(playDetail, table);
      this.$store.commit({
        type: "setContent",
        playDetail,
      });
    },
  },
};
</script>

<style scoped>
.songlist {
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  margin: 25px auto;
  /* justify-content: center; */
}
.song div:hover {
  box-shadow: rgba(191, 195, 199, 0.541) 3px 2px 2px;

  /* background-color: rgba(199, 194, 194, 0.616); */
}
.song {
  margin-right: 65px;
  margin-top: 10px;
  margin-bottom: 50px;
  width: 150px;
  height: 150px;
}
.tuijianlist {
  width: 83%;
  height: auto;
  margin: 15px auto;
  /* background-color: pink; */
  padding-bottom: 3.5%;
}
.title span {
  float: left;
  /* margin: ; */
  font-size: 20px;
  font-weight: 700 !important;
}
</style>
<style lang="">
.titleicon {
  float: left !important;
  margin-top: -8px !important;
  font-weight: 700 !important;
}
</style>
