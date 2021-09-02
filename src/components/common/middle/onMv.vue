<template>
  <div class="body">
    <i
      class="el-icon-arrow-left fanhui"
      style="float: left"
      @click="fanHui"
    ></i>
    <div>
      <video
        class="bofangbox"
        :src="this.$store.state.mvUrl"
        width="78%"
        autoplay
        controls
      ></video>
    </div>
  </div>
</template>

<script>
export default {
  name: "onMv",
  data() {
    return {
      mvUrl: "",
    };
  },
  methods: {
    fanHui() {
      // this.$router.push("/videos");
      // 返回上一级路由
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.fanhui:hover {
  color: rgb(236, 65, 65);
}
.bofangbox {
  margin: 14px auto;
  /* text-align: ; */
  margin-left: 72px;
}
</style>
