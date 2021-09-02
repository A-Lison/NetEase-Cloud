<template>
  <div class="imgbox">
    <img :src="playImg" alt="" width="100%" />
  </div>
</template>

<script>
export default {
  name: "boFangImg",
  data() {
    return {
      //   playImg: this.$store.state.playPicUrl,
    };
  },
  computed: {
    playImg() {
      return this.$store.state.playPicUrl;
    },
  },
};
</script>

<style scoped>
.imgbox {
  height: 350px;
  width: 350px;
  position: absolute;
  top: 25%;
}
</style>
