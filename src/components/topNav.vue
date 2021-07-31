<template>
  <div class="top-nav">
    <div class="top"></div>
    <div class="buttom"></div>
    <div class="test" :height="height"></div>
  </div>
</template>

<script>
export default {
  name: "topNav",
};
</script>

<style scoped>
.top-nav .test {
  width: 500px;
  height: 200px;
  background-color: pink;
}
</style>
