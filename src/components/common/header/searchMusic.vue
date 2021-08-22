 <template id="search">
  <el-autocomplete
    v-model="state"
    prefix-icon="el-icon-search"
    placeholder="  搜索"
    @keyup.enter.native="changeInfo"
    class="auto"
    clearable
  ></el-autocomplete>
</template>

<script>
import axios from "../../../network/axios";
// var Event = new Vue();

export default {
  name: "searchMusic",
  data() {
    return {
      state: "",
      timeout: null,
      song: "",
      singer: "",
      // 音乐的url
      musicId: "",
      //推荐音乐列表
      zhuanji: "",
      picUrl: "",
      songList: [],
      score: "",
      musicListId: [],
      songCnt: 0,
    };
  },

  methods: {
    changeInfo() {
      var keyword = this.state;
      // 搜索单曲
      axios({
        url: "/cloudsearch",
        params: {
          keywords: keyword,
          limit: 100,
        },
      })
        .then((res) => {
          this.$store.state.searchMusicList.splice(0, 10000);
          var songCnt = 0;
          for (let index = 0; res.data.result.songs[index]; index++) {
            // 获取搜索结果
            const table = {
              musicid: res.data.result.songs[index].id,
              song: res.data.result.songs[index].name,
              singer: res.data.result.songs[index].ar[0].name,
              zhuanji: res.data.result.songs[index].al.name,
              picUrl: res.data.result.songs[index].al.picUrl,
              time: this.formatDt(res.data.result.songs[index].dt),
            };
            // console.log("table.time： " + table.time);
            // 全局提交搜索结果
            const musicList = {};
            Object.assign(musicList, table);
            this.$store.commit({
              type: "searchMusic",
              musicList,
            });
            songCnt++;
          }
          this.$store.commit({
            type: "searchCnt",
            songCnt,
          });
          this.$router.push("/searchSongList");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      // 搜索MV
      axios({
        url: "/cloudsearch",
        params: {
          keywords: keyword,
          type: 1014,
          limit: 100,
        },
      })
        .then((res) => {
          this.$store.state.searchVideos.splice(0, 1000);
          for (let index = 0; res.data.result.videos[index]; index++) {
            // 获取搜索结果
            const vtable = {
              userName: res.data.result.videos[index].creator[0].userName,
              title: res.data.result.videos[index].title,
              coverUrl: res.data.result.videos[index].coverUrl,
              vid: res.data.result.videos[index].vid,
            };
            // console.log("table.time： " + table.time);
            // 全局提交搜索结果
            const videoList = {};
            Object.assign(videoList, vtable);
            this.$store.commit({
              type: "searchVideos",
              videoList,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //格式化播放时长
    formatDt(time) {
      let dt = time / 1000;
      let m = parseInt(dt / 60);
      let s = parseInt(dt % 60); //这里用Math.ceil取整会更严谨些
      m >= 10 ? m : (m = "0" + m);
      s >= 10 ? s : (s = "0" + s);
      return m + ":" + s;
    },
  },
};
</script>

<style scoped>
.auto {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 222px;
  margin-top: 3px;
  left: -160px;
  /* border-radius: 2px;*/
  /* background-color: pink; */
}
</style>
<style>
.el-input__inner {
  border-style: none;
  -webkit-appearance: none;
  background-color: rgb(220, 62, 62) !important;
  background-image: none;
  border-radius: 20px;
  /* border: 1px solid #a6a8ad; */
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.el-popper {
  /* margin-top: 76px; */
  top: 50px !important;
}
.el-input__prefix {
  left: 5px;
  top: -4px;

  /* size: landscape; */
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
</style>