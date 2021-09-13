<template>
  <div class="body">
    <div class="listOn">
      <el-button
        @click="drawer = true"
        type="primary"
        style="margin-right: 16px"
        icon="el-icon-s-fold"
      >
      </el-button>
    </div>
    <el-drawer
      class="list-tit"
      title="最近播放"
      :visible.sync="drawer"
      :with-header="false"
      :modal="false"
      :append-to-body="true"
    >
      <div
        class="list-tit"
        style="padding: 15px 0px 0px 7px; font-size: 18px; font-weight: 700"
      >
        最近播放
      </div>
      <div class="lastsong">
        <el-table
          ref="singleTable"
          :data="tableData"
          stripe
          style="width: 100%"
          highlight-current-row
          @current-change="handleCurrentChange"
          @row-contextmenu="delListSongs"
        >
          <el-table-column prop="playSong" label="歌曲" width="270px">
          </el-table-column>
          <el-table-column prop="playSinger" label="歌手" width="90px">
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import axios from "../../../network/axios";
export default {
  name: "boFangList",
  data() {
    return {
      currentRow: null,
      drawer: false,

      tableData: [
        {
          playId: 0,
          playPicUrl: "",
          playSong: "",
          playSinger: "",
        },
      ],
    };
  },
  watch: {
    "$store.state.playId"() {
      // 第一行显示当前播放歌曲
      var playObj = {
        playId: this.$store.state.playId,
        playPicUrl: this.$store.state.playPicUrl,
        playSong: this.$store.state.playSong,
        playSinger: this.$store.state.playSinger,
        delListSong: "x",
      };
      if (this.tableData[0].playPicUrl === "") {
        this.tableData.splice(0, 1, playObj);
      }
      //判断歌曲是否已存在
      if (
        JSON.stringify(this.tableData).indexOf(JSON.stringify(playObj)) == -1
      ) {
        this.tableData.unshift(playObj);
      }
      this.changeList();
    },
  },
  created() {
    this.changeList();
  },
  methods: {
    test() {
      alert("mkl");
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    //右击删除播放列表歌曲
    delListSongs(val) {
      var index = this.tableData.findIndex(
        (item) => item.playId === val.playId
      );
      this.tableData.splice(index, 1);
      // this.$store.commit({
      //   type: "removeSong",
      //   index,
      // });
      if (val.playId === this.$store.state.playId) {
        let isDel = !this.$store.state.isDel;
        this.$store.commit({
          type: "removeSonged",
          isDel,
        });
        console.log("切歌");
      }

      console.log("成功移除列表歌曲");
      // this.changeList();//删除后重新提交
      // alert(123);
      // alert(this.$store.state.playList[0].playDetail.length);
    },
    // 提交播放列表
    changeList() {
      this.$store.state.playList.splice(0, 10000);
      var playDetail = this.tableData;
      // Object.assign(playDetail, table);
      this.$store.commit({
        type: "addSong",
        playDetail,
      });
    },
    // 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
    handleCurrentChange(val) {
      this.currentRow = val;
      this.$store.state.songId =
        "https://music.163.com/song/media/outer/url?" +
        "id=" +
        val.playId +
        ".mp3";
      //清除原歌曲列表
      this.$store.state.playList.splice(0, 10000);
      var playDetail = this.tableData;
      // Object.assign(playDetail, table);
      this.$store.commit({
        type: "addSong",
        playDetail,
      });
      console.log(this.$store.state.playList);
      // 改变播放图片
      this.$store.state.playId = val.playId;
      this.$store.state.playPicUrl = val.playPicUrl;
      this.$store.state.playSong = val.playSong;
      this.$store.state.playSinger = val.playSinger;
      console.log("  this.$store.state.playSong:" + this.$store.state.playSong);
      // console.log(this.$store.state.playContent);
    },
  },
};
</script>

<style scoped>
</style>
<style >
.el-drawer.ltr,
.el-drawer.rtl,
.el-drawer__container {
  /* top: 5%; */
  bottom: 0px;
  height: 100%;
  /* z-index: 3; */
}
.el-drawer__open .el-drawer.rtl {
  width: 25% !important;
}

[class*=" el-icon-"],
[class^="el-icon-"] {
  /* float: right; */
  line-height: 2 !important;
  font-size: 25px !important;
  color: rgb(102, 102, 102);
}

.listOn {
  position: absolute;
  right: 20px;
  bottom: 10px;
}
</style>
