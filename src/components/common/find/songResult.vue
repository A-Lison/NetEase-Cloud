<template  id="list">
  <div>
    <!-- <button @click="test">监听</button> -->

    <el-table
      ref="singleTable"
      stripe
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="100"> </el-table-column>
      <el-table-column property="song" label="音乐标题" width="550">
      </el-table-column>
      <el-table-column property="singer" label="歌手" width="220">
      </el-table-column>
      <el-table-column property="zhuanji" label="专辑"> </el-table-column>
      <el-table-column property="time" label="时长"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "../../../network/axios";
export default {
  name: "songResult",

  data() {
    return {
      tableData: [
        {
          // 音乐的url
          musicId: this.$store.state.searchMusicList[0].musicid,
          song: "",
          singer: "",
          zhuanji: "",
          time: "",
        },
      ],
      songList: [],
      songCnt: 0,
      currentRow: null,
    };
  },
  // computed: {
  //   tableData() {
  //     return this.$store.state.searchMusicList[0];
  //   },
  // },
  watch: {
    // 改变播放列表的显示
    "$store.state.searchMusicList"() {
      console.log(111111);
      console.log("cnt；" + this.$store.state.songCnt);
      console.log(222222);
      for (let index = 0; index < this.$store.state.songCnt; index++) {
        this.$set(this.tableData, index, {
          musicId: this.$store.state.searchMusicList[index].musicid,
          song: this.$store.state.searchMusicList[index].song,
          singer: this.$store.state.searchMusicList[index].singer,
          zhuanji: this.$store.state.searchMusicList[index].zhuanji,
          picUrl: this.$store.state.searchMusicList[index].picUrl,
          time: this.$store.state.searchMusicList[index].time,
        });
      }
    },
  },

  methods: {
    test() {
      console.log(this.tableData);
    },
    setCurrent(row) {
      // console.log("musicId；" + songId);
      this.$refs.singleTable.setCurrentRow(row);
    },
    // 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
    handleCurrentChange(val) {
      console.log(777777777);
      this.currentRow = val;
      this.$store.state.songId =
        "https://music.163.com/song/media/outer/url?" +
        "id=" +
        val.musicId +
        ".mp3";
      // 改变播放歌曲信息
      const table = {
        playId: val.musicId,
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

      // 改变播放图片
      this.$store.state.playId = val.musicId;
      this.$store.state.playPicUrl = val.picUrl;
      this.$store.state.playSong = val.song;
      this.$store.state.playSinger = val.singer;
      // console.log("  this.$store.state.playId:" + this.$store.state.playId);
      console.log(this.$store.state.playContent);
    },
    click(event) {
      // axios({
      //   url:""
      // }).then(res=>{
      //     console.log(res);
      // }).catch(err=>{
      //   console.log(err);
      // })
    },
  },
};
</script>

<style>
</style>
