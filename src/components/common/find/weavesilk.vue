<template>
  <iframe
    :src="weavesilkUrl"
    frameborder="1"
    width="1325px"
    height="650px"
  ></iframe>
</template>

<script>
export default {
  name: "weavesilk",
  data() {
    return {
      weavesilkUrl: "",
    };
  },
  created() {
    this.weavesilkUrl = "http://weavesilk.com/";
  },
};
</script>

<style scoped>
</style>
