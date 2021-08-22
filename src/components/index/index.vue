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
          <el-menu-item index="/videos">
            <i class="iconfont icon-shipin"></i>
            <span slot="title">视频</span>
          </el-menu-item>
          <el-menu-item index="/comments">
            <i class="iconfont icon-more"></i>
            <span slot="title">歌曲评论</span>
          </el-menu-item>
          <!-- <el-menu-item index="/recommendmusic">
            <i class="iconfont icon-good"></i>
            <span slot="title">每日推荐</span>
          </el-menu-item> -->
          <el-menu-item-group>
            <template slot="title" class="groupTitle">登录后可评论</template>
            <el-menu-item
              v-for="(item, index) in createdMusicList"
              :key="index"
              :index="'/musiclistdetail/' + item.id"
            >
              <i class="iconfont icon-gedan"></i>{{ item.name }}</el-menu-item
            >
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title" class="groupTitle"></template>
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
        <!-- 给router-view添加key有可能对性能有一定的损耗，
        但是可以解决push同一个地址不同参数时不会重新渲染router-view的问题 -->
        <router-view class="routerView"></router-view>
        <!-- 发现音乐顶部导航 -->
        <!-- <tabs></tabs> -->
        <!-- 搜索返回列表 -->
        <!-- <search-song-list></search-song-list> -->
      </el-main>
    </el-container>
    <!-- 底部控件 -->
    <div class="footer">
      <bottom-control></bottom-control>
    </div>
    <!-- <test></test> -->
    <!-- <router-view /> -->
  </div>
</template>

<script>
import test from "../common/test.vue";
import topNav from "../common/topNav.vue";
import tabs from "../common/find/tabs.vue";
import bottomControl from "../footer/bottomControl.vue";
import searchSongList from "../common/find/searchSongList.vue";
export default {
  name: "index",
  components: {
    test,
    topNav,
    bottomControl,
    tabs,
    searchSongList,
  },
  data() {
    return {
      defaultActive: "",
      // 用户信息
      userInfo: {},
      // 创建的歌单
      createdMusicList: [],
      // 收藏的歌单
      collectedMusicList: [],
      // 下载的音乐的信息
      downloadMusicInfo: {
        name: "",
        url: "",
      },
    };
  },
  created() {
    // 取路由中的首地址 用于侧边栏的导航active
    // this.defaultActive = "/" + this.$route.path.split("/")[1];
    // 顶部栏读取登录状态需要一定时间，这里延迟500毫秒再执行
    setTimeout(() => {
      this.getUserMusicList();
    }, 500);
  },
  methods: {
    // 请求
    // 请求用户歌单
    async getUserMusicList() {
      if (!this.$store.state.isLogin) {
        // 说明已经退出登录
        this.$message.error("请先进行登录操作");
        return;
      }
      let timestamp = Date.parse(new Date());
      // 先从localStorage里面读取用户信息  如果登录成功是有存的
      this.userInfo =
        window.localStorage.getItem("userInfo") &&
        JSON.parse(window.localStorage.getItem("userInfo"));
      let res = await this.$request("/user/playlist", {
        uid: this.userInfo.userId,
        timestamp,
      });
      // console.log(res);
      // 对数据进行处理分类
      res = res.data.playlist;
      let index = res.findIndex((item) => item.subscribed == true);
      this.createdMusicList = res.slice(0, index);
      this.collectedMusicList = res.slice(index);
      this.createdMusicList[0].name = "我喜欢的音乐";
      // console.log(this.createdMusicList, this.collectedMusicList);
      // 将收藏的歌单上传至vuex
      this.$store.commit("updateCollectMusicList", this.collectedMusicList);
      // 将创建的歌单上传至vuex
      this.$store.commit("updateCreatedMusicList", this.createdMusicList);
    },
  },
  watch: {
    // $route(to, from) {
    //   if (to !== from) {
    //     // 直接 go会导致整个页面进行刷新
    //     // this.$router.go(0);
    //   }
    // },
    // 监听收藏歌单的变化
    "$store.state.collectMusicList"(current) {
      this.collectedMusicList = current;
    },
    "$route.path"() {
      // 取路由中的首地址 用于侧边栏的导航active
      this.defaultActive = "/" + this.$route.path.split("/")[1];
    },

    // 监听当前下载音乐信息
    "$store.state.downloadMusicInfo"(current) {
      axios
        .get(current.url, { responseType: "blob" })
        .then((res) => {
          let blob = res.data;
          let url = URL.createObjectURL(blob);
          // console.log(url);
          let a = document.querySelector("#downloadCurrentMusic");
          this.downloadMusicInfo.url = url;
          this.downloadMusicInfo.name = current.name;
          this.$nextTick(() => {
            a.click();
            // 用完释放URL对象
            URL.revokeObjectURL(url);
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("下载失败,请稍后重试!");
        });

      // this.downloadMusicInfo = current;
      // let a = document.querySelector("#downloadCurrentMusic");
      // this.$nextTick(() => {
      //   a.click();
      // });
    },
  },
};
</script>

<style scoped>
/* @import "/assets/CSS/base.css"; */
/* .footer {
  width: 100%;
  height: 70px;
  background-color: pink;
  position: absolute;
  bottom: 0;
} */

.el-aside lun-bo {
  width: 100%;
  margin: 0;
}

.el-aside {
  /* position: relative; */
  position: fixed;
  top: 60px;
  /* top: 60px; */
  /* height: calc(100vh - 105px); */
  border-right: 1px solid #ccc;
  height: 750px;
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
  /* position: relative; */
  margin-top: 60px;
  margin-left: 170px;
  /* top: 60px; */
  background-color: #fff !important;
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

