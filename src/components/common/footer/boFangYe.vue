<template>
  <div id="particles-js">
    <div class="show">
      <div class="jiao">
        <!-- <jiao-pian></jiao-pian> -->
        <bo-fang-img></bo-fang-img>
      </div>
      <div class="gecibox">
        <vue-particles
          color="#dedede"
          :particleOpacity="0.6"
          :particlesNumber="80"
          shapeType="star"
          :particleSize="4"
          linesColor="#FFFFFF"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="150"
          :moveSpeed="3"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push"
        ></vue-particles>
        <lyrics></lyrics>
      </div>
    </div>
  </div>
</template>

<script>
import lyrics from "../../views/lyrics.vue";
import boFangImg from "../../views/boFangImg.vue";
export default {
  name: "boFangYe",
  components: {
    lyrics,
    boFangImg,
  },
};
</script>

<style scoped>
#particles-js {
  background-color: black;
  overflow: hidden !important;
}
.show {
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
}
.gecibox {
  padding-top: 60px;
}
.jiao,
.gecibox {
  margin: 0 auto;
  /* flex-grow: 1; */
  height: 0;
  /* width: 497px; */
  /* padding-top: 5%; */
}
</style>
