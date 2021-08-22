<template>
  <iframe
    :src="mikutapUrl"
    frameborder="1"
    width="1325px"
    height="650px"
  ></iframe>
</template>

<script>
export default {
  name: "mikutap",
  data() {
    return {
      mikutapUrl: "",
    };
  },
  created() {
    this.mikutapUrl = "https://aidn.jp/mikutap/";
  },
};
</script>

<style scoped>
</style>
