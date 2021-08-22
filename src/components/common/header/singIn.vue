<template>
  <el-col :span="12">
    <!-- <div class="sub-title">circle</div> -->
    <div class="demo-basic--circle">
      <!-- <div class="block">
        <el-avatar :size="50" :src="circleUrl"></el-avatar>
      </div> -->
      <div class="block" v-for="size in sizeList" :key="size">
        <el-avatar :size="size" :src="circleUrl"></el-avatar>
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  name: "singIn",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["small"],
    };
  },
};
</script>

<style scoped>
</style>
<style lang="">
.el-col-12 {
  width: 100px;

  position: absolute;
  right: 15px;
}
</style>