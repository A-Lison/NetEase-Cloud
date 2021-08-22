<template>
  <!-- 歌曲信息容器 -->
  <div class="player_con" :class="{ playing: this.$store.state.onPlay }">
    <img src="~assets/img/player_bar.png" class="play_bar" />
    <!-- 黑胶碟片 -->
    <img src="~assets/img/disc.png" class="disc autoRotate" />
    <!-- <img :src="coverUrl == '' ? './images/cover.png' : coverUrl" class="cover autoRotate" /> -->
    <img :src="coverUrl" class="cover autoRotate" />
    <!-- <button @click="test">test</button> -->
  </div>
</template>

<script>
export default {
  name: "jiaoPian",
  data() {
    return {
      // 歌曲封面地址
      coverUrl: this.$store.state.playPicUrl,
    };
  },
  watch: {
    "$store.state.playSong"() {
      this.coverUrl = this.$store.state.playPicUrl;
      this.singer = this.$store.state.playSinger;
      this.songName = this.$store.state.playSong;
    },
  },

  methods: {
    test() {
      console.log("this.$store.state.onPlay:  " + this.$store.state.onPlay);
      console.log("isPlay:" + this.isPlay);
    },
  },
};
</script>

<style scoped>
.player_con {
  width: 400px;
  height: 435px;
  position: absolute;
  left: 200px;
  top: 25%;
}
.disc {
  position: absolute;
  left: 73px;
  top: 60px;
  z-index: 9;
}
.cover {
  position: absolute;
  left: 125px;
  top: 112px;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  z-index: 8;
}
/* 旋转的动画 */
@keyframes Rotate {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
}
/* 旋转的类名 */
.autoRotate {
  animation-name: Rotate;
  animation-iteration-count: infinite;
  animation-play-state: paused;
  animation-timing-function: linear;
  animation-duration: 5s;
}
/* 是否正在播放 */
.player_con.playing .disc,
.player_con.playing .cover {
  animation-play-state: running;
}
.play_bar {
  position: absolute;
  left: 200px;
  top: -10px;
  z-index: 10;
  transform: rotate(-25deg);
  transform-origin: 12px 12px;
  transition: 1s;
}
/* 播放杆 转回去 */
.player_con.playing .play_bar {
  transform: rotate(0);
}
</style>
