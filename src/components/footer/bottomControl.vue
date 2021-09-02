<template>
  <div class="bottomControl" style="z-index: 10000">
    <!-- 进度条 -->
    <div class="block">
      <audio
        :src="playURL"
        ref="audio"
        autoplay
        @timeupdate="timeupdate"
        @canplay="getDuration"
        @ended="overAudio"
      ></audio>

      <el-slider
        v-model="timeProgress"
        :show-tooltip="false"
        @change="changeProgress"
      ></el-slider>
    </div>
    <div class="fot">
      <!-- 弹出播放页面 -->
      <div class="item item-1">
        <el-button
          @click="drawer = true"
          type="primary"
          style="margin-left: 16px; margin-right: 16px"
        >
          <img :src="picUrl" class="singer" width="100%" />
        </el-button>
        <!-- 歌名和歌手 -->
        <div class="songDetil">
          <span style="font-size: 16px">{{ songName }}</span>
          <br />
          <span style="font-size: 10px">{{ singer }}</span>
        </div>
        <!-- 标题 用于关闭播放页面 -->
        <div class="bofangye">
          <el-drawer
            style="font-size: 25px"
            :title="title"
            direction="btt"
            size="100%"
            :visible.sync="drawer"
            :with-header="true"
            :append-to-body="true"
          >
            <bo-fang-ye></bo-fang-ye>

            <!-- 播放页面 -->
          </el-drawer>
        </div>
      </div>
      <!-- 播放控制 -->

      <div class="item item-2">
        <div class="bofangcontrol">
          <!-- <audio controls ref="audioPlayer" :src="playURL" autoplay @play="onPlay" @pause="onPlay" @timeupdate="timeupdate"></audio> -->
          <i class="el-icon-caret-left xiayishou" @click="prev"></i>
          <div class="play">
            <i
              class="el-icon-video-play bofang"
              v-show="!playStatus"
              @click="play"
            ></i>
            <i
              class="el-icon-video-pause zanting"
              v-show="playStatus"
              @click="pause"
            ></i>
          </div>
          <i class="el-icon-caret-right shangyishou" @click="next"></i>
          <div class="time">{{ currentText }}/{{ durationText }}</div>
        </div>
      </div>
      <!-- 弹出播放歌曲列表 -->

      <div class="item item-3">
        <!-- <button @click="test">test</button> -->

        <bo-fang-list></bo-fang-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../network/axios";
import boFangList from "./boFangList.vue";
import boFangYe from "./boFangYe.vue";
let lastSecond = 0;
// 总时长的秒数
let durationNum = 0;
export default {
  name: "bottomControl",
  components: {
    boFangList,
    boFangYe,
  },
  data() {
    return {
      // 控件数据
      playStatus: false, //播放状态，用来控制播放、暂停按钮的显示
      Timer: "", //定时器，我们需要实时监听到歌曲的播放进度
      currentBar: 0, //进度条长度，默认为0，根据歌曲进度同步更新
      durationText: "00:00", //当前歌曲的播放时长
      listShow: false, //控制播放列表的显示
      loopStyle: "not", //not:单曲播放 list:列表循环 single:单曲循环 random:随机循环
      drawer: false, //弹出播放页面
      playURL: this.$store.state.songId,
      picUrl: require("assets/img/kexie.jpg"),
      songName: this.$store.state.playSong,
      singer: this.$store.state.playSinger,
      title: this.$store.state.playSong,
      // 当前播放时间位置
      currentTime: 0,
      // 进度条的位置
      timeProgress: 0,
    };
  },
  // //从store中获取
  computed: {
    //进度条旁边的播放时间，同样要实时更新
    currentText() {
      return this.formatTime(this.currentTime);
    },
    playCnt() {
      let c = 0;
      for (
        let index;
        this.$store.state.playList[0].playDetail[index];
        index++
      ) {
        c++;
      }
      return c;
    },
    playIndex() {
      return this.$store.state.playList[0].playDetail.findIndex(
        (item) => item.playId === this.$store.state.playId
      );
    },
  },
  watch: {
    "$refs.audio.play"() {
      this.$store.state.onPlay = true;
    },
    // "$refs.audio.ended"() {
    //   this.playStatus = false;
    // },
    "$store.state.songId"() {
      this.playURL = this.$store.state.songId;
      this.picUrl = this.$store.state.playPicUrl;
      this.songName = this.$store.state.playSong;
      this.singer = this.$store.state.playSinger;
      this.title = this.$store.state.playSong;
    },
    "$store.state.playId"() {
      this.$store.state.onPlay = !this.$store.state.onPlay;
      this.playStatus = true;
    },
    //监听路由是否在播放视频,播放视频时暂停播放歌曲
    $route() {
      if (this.$route.name === "onMv") {
        // alert("123");
        this.pause();
      }
    },
  },
  methods: {
    test() {
      console.log(this.$store.state.playList);
    },
    //播放完毕执行
    overAudio() {
      // console.log('播放声音完毕');
      // this.audioArr.forEach(item=>{
      //     item.isStart = true;
      // })
      // this.$store.state.onPlay = false;
      this.playStatus = false;
    },

    // 获取歌曲URL
    getSongUrl(id) {
      this.$store.state.songId =
        "https://music.163.com/song/media/outer/url?" + "id=" + id + ".mp3";
    },
    //播放上一首歌
    prev() {
      let t = this.playIndex - 1;

      this.$store.state.playSinger =
        this.$store.state.playList[0].playDetail[t].playSinger;
      this.$store.state.playId =
        this.$store.state.playList[0].playDetail[t].playId;
      this.$store.state.playSong =
        this.$store.state.playList[0].playDetail[t].playSong;
      this.$store.state.playPicUrl =
        this.$store.state.playList[0].playDetail[t].playPicUrl;
      this.getSongUrl(this.$store.state.playId);

      console.log(this.playIndex);
      console.log(this.$store.state.playList[0].playDetail[t].playSinger);
      console.log(this.$store.state.playSinger);
    },
    //播放下一首歌
    next() {
      let f = this.playIndex + 1;
      this.$store.state.playSinger =
        this.$store.state.playList[0].playDetail[f].playSinger;
      this.$store.state.playId =
        this.$store.state.playList[0].playDetail[f].playId;
      this.$store.state.playSong =
        this.$store.state.playList[0].playDetail[f].playSong;
      this.$store.state.playPicUrl =
        this.$store.state.playList[0].playDetail[f].playPicUrl;
      this.getSongUrl(this.$store.state.playId);
      console.log(this.playCnt);
    },
    // 当前播放时间位置
    timeupdate() {
      // 节流
      let time = this.$refs.audio.currentTime;
      // 将当前播放时间保存到vuex  如果保存到vuex这步节流,会导致歌词不精准,误差最大有1s
      this.$store.commit("updateCurrentTime", time);
      // console.log(
      //   "this.$store.state.currentTime:" + this.$store.state.currentTime
      // );

      time = Math.floor(time);
      if (time !== lastSecond) {
        // console.log(time);
        lastSecond = time;
        this.currentTime = time;
        // 计算进度条的位置
        this.timeProgress =
          (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100;
        // console.log("this.timeProgress: " + this.timeProgress);
      }
    },

    // 拖动进度条的回调
    changeProgress(e) {
      // console.log(e);
      // 修改当前播放时间
      durationNum = this.returnSecond(this.durationText);
      this.currentTime = Math.floor((e / 100) * durationNum);
      console.log("changeProgress" + this.currentTime);
      // 改变audio的实际当前播放时间
      this.$refs.audio.currentTime = this.currentTime;
    },
    //设置定时器
    setTimer() {
      this.clearTimer(); //先清除上一个定时器
      this.Timer = setInterval(this.updateCurrent, 1000);
    },
    //清除定时器
    clearTimer() {
      clearInterval(this.Timer);
      this.Timer = "";
    },
    // 处理音乐时间
    returnSecond(time) {
      time = time.split(":");
      let m = parseInt(time[0]);
      let s = parseInt(time[1]);
      return m * 60 + s;
    },
    //格式化播放时间
    formatTime(string) {
      var m = parseInt(string / 60);
      var s = parseInt(string % 60);
      m >= 10 ? m : (m = "0" + m);
      s >= 10 ? s : (s = "0" + s);
      return m + ":" + s;
    },
    //点击播放
    play() {
      // this.$refs.audio.ended //先判断歌曲是否播放完成了，如果是则重新播放，否则继续
      //   ? this.playSong(this.songContent)
      //   : this.$refs.audio.play(),
      // this.setTimer();
      this.$refs.audio.play();
      this.playStatus = true; //改变播放状态主要是为了隐藏播放按钮
      // this.$store.state.onPlay = !this.$store.state.onPlay;
    },
    //点击暂停
    pause() {
      this.playStatus = false;
      this.$refs.audio.pause(), this.clearTimer(); //暂停时需要清除计时器，直到下次播放
      // this.$store.state.onPlay = !this.$store.state.onPlay;
    },
    //在列表上点击播放歌曲
    cutSong(obj) {
      obj == this.songContent
        ? this.play()
        : this.$store.commit("setContent", obj);
    },
    //单曲播放
    notLoop() {
      this.playStatus = false;
      this.clearTimer();
    },
    //列表循环
    listLoop() {
      let index = this.playList.indexOf(this.songContent);
      let length = this.playList.length;
      index == length - 1 ? (index = 0) : index++; //如果是最后一首，就从头再来
      this.$store.commit("setContent", this.playList[index]); //更新store
    },
    //单曲循环
    singleLoop() {
      this.play(); //单曲循环可以直接调用我们前面的play()
    },

    //上一首
    prevSong() {
      let index = this.playList.indexOf(this.songContent);
      let length = this.playList.length;
      index == 0 ? (index = length - 1) : index--;
      this.$store.commit("setContent", this.playList[index]);
    },
    //下一首
    nextSong() {
      //点击下一首时，主要判断当前循环方式是不是随机，如果不是可以直接调用列表循环方式切换
      this.loopStyle == "random" ? this.randomLoop() : this.listLoop();
    },
    // 获取1歌曲播放时长
    getDuration() {
      this.durationText = this.formatTime(this.$refs.audio.duration);
    },
  },
};
</script>

<style scoped>
.xiayishou:hover,
.shangyishou:hover {
  color: #ef4444;
}
.time {
  margin-top: 15px;
  /* margin-right: 0px; */
}
.bofang,
.zanting {
  color: #ef4444;
}
.bottomControl {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 75px;
  border-top: #ccc 1px solid;
  /* box-shadow: 1px 1px 1px black; */
  background-color: rgb(255, 255, 255);

  /* display: flex; */
}
.item-1,
.item-3 {
  display: flex; /* 可以被vertical-align: middle限制*/
  align-items: center;
  flex-grow: 1;
  /* background-color: green; */
}

.item-2 {
  /* display: flex;
  align-items: center; */
  flex-grow: 2.5;
  /* background-color: rgb(3, 48, 3); */
  /* border-left: royalblue 1px solid;
  border-right: royalblue 1px solid; */
}
.item-1 .singer {
  margin-left: 10px;
  width: 50px;
  height: 50px;

  border-radius: 5px;
  margin-top: 3px;
}

.shangyishou,
.xiayishou,
.bofang {
  /* margin-right: 20px; */
  flex-grow: 1;
  text-align: center;
}
.bofangcontrol audio {
  width: 100%;
}
.bofangcontrol {
  bottom: 24px;
  left: 36%;
  width: 500px;
  height: 37px;
  /* background-color: pink; */
  display: flex;
  position: absolute;
}
</style>
<style lang="">
.el-slider__button {
  width: 9px;
  height: 9px;
  border: 1px solid #dc2626;
  display: none !important;
}
.el-slider__button-wrapper {
  top: -17px !important;
}
.el-button {
  padding: 0 !important;
  background-color: #fff !important;
  border-style: none !important;
}
span {
  text-align: center;
  /* font-size: 27px; */
}

.songDetil {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px;
}

.el-slider__bar {
  height: 2px !important;
  background-color: #ef4444 !important;
}
.el-slider__runway {
  top: -1px !important;
  margin: auto !important;
  height: 2px !important;
  margin-bottom: 8px !important;
}
.el-slider__button.hover,
.el-slider__button:hover {
  margin-top: 14px;
  margin-left: 14px;
  cursor: -webkit-grab;
  cursor: grab;
  display: block !important;
  /* top: 10px; */
}
.el-drawer__header {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #72767b;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 0;
  padding: 20px 20px 0;
  background-color: black;
}
.el-drawer__body {
  overflow: hidden !important;
}
</style>