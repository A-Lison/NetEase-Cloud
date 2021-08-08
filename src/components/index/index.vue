<template>
  <div id="index">
    <!-- 顶部导航  -->
    <top-nav></top-nav>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="170px">
        <el-menu
          active-text-color="black"
          router
          :default-active="defaultActive"
        >
          <el-menu-item index="/discover">
            <i class="iconfont icon-yinle"></i>
            <span slot="title">发现音乐</span>
          </el-menu-item>
          <el-menu-item index="/video">
            <i class="iconfont icon-shipin"></i>
            <span slot="title">视频</span>
          </el-menu-item>
          <el-menu-item index="/favorites">
            <i class="iconfont icon-more"></i>
            <span slot="title">收藏</span>
          </el-menu-item>
          <el-menu-item index="/recommendmusic">
            <i class="iconfont icon-good"></i>
            <span slot="title">每日推荐</span>
          </el-menu-item>
          <el-menu-item-group>
            <template slot="title" class="groupTitle">创建的歌单</template>
            <el-menu-item
              v-for="(item, index) in createdMusicList"
              :key="index"
              :index="'/musiclistdetail/' + item.id"
            >
              <i class="iconfont icon-gedan"></i>{{ item.name }}</el-menu-item
            >
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title" class="groupTitle">收藏的歌单</template>
            <el-menu-item
              v-for="(item, index) in collectedMusicList"
              :key="index"
              :index="'/musiclistdetail/' + item.id"
            >
              <i class="iconfont icon-gedan"></i>{{ item.name }}</el-menu-item
            >
          </el-menu-item-group>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 顶部导航 -->
        <tabs></tabs>
      </el-main>
    </el-container>

    <!-- 总体布局容器 -->
    <!-- <div class="top">top</div>
    <div class="main">
      <div class="gedan">歌单</div>
      推荐
    </div>
    <div class="footer">footer</div> -->
    <!-- <test></test> -->
    <!-- <router-view /> -->
  </div>
</template>

<script>
import test from "../common/test.vue";
import topNav from "../common/topNav.vue";
import tabs from "../common/find/tabs.vue";
export default {
  name: "index",
  components: {
    test,
    topNav,

    tabs,
  },
};
</script>

<style scoped>
/* @import "/assets/CSS/base.css"; */

.el-aside lun-bo {
  width: 100%;
  margin: 0;
}

.el-aside {
  /* height: calc(100vh - 105px); */
  border-right: 1px solid #ccc;
  height: 648px;
  background-color: #fff;
  /* color: #333; */
  color: rgb(135, 135, 136);
  text-align: left;
}

.el-menu {
  border: none;
}

.el-menu-item:hover {
  background-color: #f5f5f6;
  color: #333;
  font-size: 20px;
}

.el-menu-item {
  font-size: 16px;
  padding: 0 0 0 10px;
  margin: 5px 0;
  height: 40px;
  line-height: 40px;
}

.el-menu-item-group {
  margin-top: 10px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
  padding: 15px 25px 0;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

