<template>
  <div class="lyr">
    <!-- <button @click="test">test</button> -->
    <!-- <el-row type="flex" justify="center" class="lyric-contain">
      <el-col :span="23" class="song-lyric" :style="lyricMove">
        这里用内联样式来实现当前歌词的高亮显示
        <el-row v-for="(item, index) in lyric" :key="index" :style="{ 'font-size': index == currentRow ? '1.3rem' : '.9rem' }" class="lyric-row">{{ item.text }}</el-row>
      </el-col>
    </el-row> -->
    <lyrics-scroll :lyric="lyric"></lyrics-scroll>
  </div>
</template>

<script>
import axios from "../../network/axios";
import lyricsScroll from "./lyricsScroll";
export default {
  name: "lyrics",
  components: {
    lyricsScroll,
  },
  data() {
    return {
      lyric: [[0, "正在加载歌词"]],
      lyricMove: {
        top: "",
      },
      currentRow: 0,
      songList: [],
      // lyrics:[],
    };
  },
  created() {
    this.getLyric(this.$store.state.playId);
  },
  watch: {
    // 用watch来监听歌曲进度的变化，也就是当前播放时间
    // lyricCurrent() {
    //   this.lyric.forEach((element, index) => {
    //     if (this.lyricCurrent == element.time) {
    //       this.lyricMove.top = -index * 2.5 + 6 + "rem";
    //       this.currentRow = index; //通过比较我们歌词属性里的时间与当前播放时间，来定位到该歌词
    //     }
    //   });
    // },
    "$store.state.playId"() {
      this.getLyric(this.$store.state.playId);
    },
    // "$store.state.onPlay"() {
    //   this.getLyric(this.$store.state.playId);
    // },
  },

  // created() {
  //   //通过getSong()获取对应歌曲信息
  //   // this.getSong(this.$store.state.playSong); //在这之前，我是通过路由进入的该组件，所以会传递一个name歌手名字作为参数
  //   this.getLyric(this.$store.state.searchMusicList[0].musicid);
  //   console.log("this.$store.state.songId:  " + this.$store.state.songId);
  // },

  methods: {
    // getSong(name) {
    //   let url =
    //     "https://api.imjad.cn/cloudmusic/?type=search&search_type=1&s=" +
    //     name +
    //     "&offset=1&limit=10"; //这里以第一页的十条数据为例
    //   axios(url)
    //     .then((res) => {
    //       console.log(res.data);
    //       this.formatSongs(res);
    //     })
    //     .catch();
    // },
    // //提取歌曲信息，arr为接口返回的初始数据
    // formatSongs(arr) {
    //   let n = arr.length;
    //   for (let i = 0; i < n; i++) {
    //     let obj = {}; //我们将每首歌的信息以对象的方式存储
    //     obj.id = arr[i].id;
    //     obj.song = arr[i].name;
    //     obj.singer = arr[i].ar[0].name;
    //     obj.dt = this.formatDt(arr[i].dt); //由于返回的歌曲时长单位是ms，我们还要将其转换成00：00的格式
    //     this.songList.push(obj); //最后将这个歌曲对象存储到组件的songList歌曲列表属性上，最后用个v-for就可以在视图上呈现出来了
    //   }
    // },
    test() {
      console.log(this.lyric);
      // console.log(this.$store.state.playId);
      // console.log(this.$store.state.playId);
    },
    //获取歌词信息，id为歌曲id
    getLyric(id) {
      let url = "https://api.imjad.cn/cloudmusic/?type=lyric&id=" + id; //获取歌词信息要设置type=lyric，详情看接口文档
      // axios(url)
      axios({
        url: "/lyric",
        params: {
          id: id,
        },
      })
        .then(
          (res) => ((this.lyric = []), this.formatLyric(res.data.lrc.lyric))
        )
        .catch(); //同样的，我们先要在接口返回的数据中提取出我们需要的那部分，并用一个formatLyric方法来对它进行格式化
    },
    //传入初始歌词文本text
    formatLyric(text) {
      let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
      let row = arr.length; //获取歌词行数
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
        let temp_arr = temp_row.split("]"); //我们可以通过“]”对时间和文本进行分离
        let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
        //再对剩下的歌词时间进行处理
        temp_arr.forEach((element) => {
          let obj = [[0, ""]];
          let time_arr = element.substr(1, element.length - 1).split(":"); //先把多余的“[”去掉，再分离出分、秒
          let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
          obj[0] = s;
          obj[1] = text;
          this.lyric.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
        });
      }
      this.lyric.sort(this.sortRule); //由于不同时间的相同歌词我们给排到一起了，所以这里要以时间顺序重新排列一下
      // this.$store.commit("setLyric", this.lyric); //把歌词提交到store里，为了重新进入该组件时还能再次渲染
    },
    sortRule(a, b) {
      //设置一下排序规则
      return a.time - b.time;
    },
  },
};
</script>

<style lang="">
.lyr {
  width: 330px;
}
</style>


<style scoped>
.lyric-contain {
  position: relative;
  height: 500px;
  width: 300px;
  overflow: hidden;
  scrollbar-width: none;
}
.lyric-contain::-webkit-scrollbar {
  display: none;
}
.song-lyric {
  position: absolute;
  height: 25px;
  width: 100%;
}
</style>
