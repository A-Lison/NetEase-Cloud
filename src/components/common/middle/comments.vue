<template>
  <div>
    <div class="miao">
      <a href="#reping">-网易云热评墙-</a>
      <!-- <img
        src="https://qn.res.netease.com/pc/gw/20200904095222/img/split_84314503.webp"
        alt=""
      /> -->
      <a href="#xinping">-最新评论墙-</a>
    </div>
    <div class="comments">
      <h1 class="mus-tit">{{ song }}-{{ singer }}</h1>
      <!-- 热评 -->
      <a id="reping"><div class="comlei">网易云热评墙</div></a>

      <div class="retext text">
        <div class="com" v-for="(item, index) in recomments" :key="index">
          <div class="touxiang"><img :src="item.userPic" alt="" /></div>
          <div class="user">
            <div class="userName">{{ item.user }}:</div>
            <div class="con">{{ item.content }}</div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <a id="xinping"><div class="comlei">最新评论墙</div></a>

      <div class="lasttext text">
        <div class="com" v-for="(item, index) in comments" :key="index">
          <div class="touxiang" @click="deleteComment(item)">
            <img :src="item.userPic" alt="" />
          </div>
          <div class="user">
            <div class="userName">{{ item.user }}:</div>
            <div class="con">{{ item.content }}</div>
          </div>
        </div>
      </div>
      <div class="content-box">
        <el-button type="text" @click="openDel" v-show="isDel">
          <div class="del">删除评论</div>
        </el-button>

        <el-button type="text" @click="open"
          ><i class="el-icon-edit writeicon"></i>写评论</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../../network/axios";
export default {
  name: "comments",
  data() {
    return {
      flag: false,
      isDel: false,
      song: this.$store.state.playSong,
      singer: this.$store.state.playSinger,
      delCommentId: 0,
      comments: [
        {
          userPic: "",
          user: "",
          content: "",
          commentId: 0,
        },
      ],
      recomments: [
        {
          userPic: "",
          user: "",
          content: "",
          commentId: 0,
        },
      ],
    };
  },
  watch: {
    // flag() {
    //   console.log("testcomment");
    //   // this.getNewComments();
    //   this.timer();
    // },
    "$store.state.playSong"() {
      //更新热评
      axios({
        url: "/comment/hot",
        params: {
          id: this.$store.state.playId,
          type: 0,
        },
      })
        .then((res) => {
          for (let index = 0; res.data.hotComments[index]; index++) {
            console.log("index；" + index);
            this.$set(this.recomments, index, {
              userPic: res.data.hotComments[index].user.avatarUrl,
              user: res.data.hotComments[index].user.nickname,
              content: res.data.hotComments[index].content,
              commentId: res.data.hotComments[index].commentId,
            });
          }
          console.log("热评：" + res);
        })
        .catch((err) => {
          console.log(err);
        });
      // 获取最新评论
      this.getNewComments();
    },
  },
  created() {
    //判断是否有播放歌曲
    if (this.$store.state.playSong === "") {
      alert("请选择歌曲播放");
      this.$router.push("/index/discover");
    } else {
      // 音乐热评
      // /comment/hot?id=186016&type=0
      axios({
        url: "/comment/hot",
        params: {
          id: this.$store.state.playId,
          type: 0,
        },
      })
        .then((res) => {
          for (let index = 0; res.data.hotComments[index]; index++) {
            console.log("index；" + index);
            this.$set(this.recomments, index, {
              userPic: res.data.hotComments[index].user.avatarUrl,
              user: res.data.hotComments[index].user.nickname,
              content: res.data.hotComments[index].content,
              commentId: res.data.hotComments[index].commentId,
            });
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      // 获取最新评论
      this.getNewComments();
    }
  },
  //清除定时器
  destroyed() {
    clearTimeout(this.timer);
  },
  // 弹框部分
  methods: {
    //获取最新评论
    getNewComments() {
      // alert("test");
      // 获取最新评论
      axios({
        url: "/comment/music",
        params: {
          id: this.$store.state.playId,
          limit: 100,
        },
      })
        .then((res) => {
          //渲染评论
          for (let index = 0; res.data.comments[index]; index++) {
            // console.log("index；" + index);
            this.$set(this.comments, index, {
              userPic: res.data.comments[index].user.avatarUrl,
              user: res.data.comments[index].user.nickname,
              content: res.data.comments[index].content,
              commentId: res.data.comments[index].commentId,
            });
          }
          // this.comments = res.data.comments;
          console.log("更新评论");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      // return;
    },
    // 定时器
    timer() {
      return setTimeout(() => {
        this.getNewComments();
      }, 10000);
    },
    //打开评论框
    open() {
      // alert(this.$store.state.user.userPic + "123");
      // console.log("评论前的this.comments");
      // console.log(this.comments);
      if (this.$store.state.user.userPic === null) {
        alert("请先登录");
      } else {
        this.$prompt("音乐始于故事", "", {
          confirmButtonText: "评论",
          cancelButtonText: "取消",
          inputType: "textarea",
          inputPlaceholder: "发表评论",
          confirmButtonClass: "pinglun",
        })
          .then(({ value }) => {
            console.log(123);
            // axios
            //   .post("/comment", {
            //     t: 1,
            //     type: 0,
            //     id: this.$store.state.playId,
            //     content: value,
            //   })
            axios({
              url: "/comment",
              params: {
                t: 1,
                type: 0,
                id: this.$store.state.playId,
                content: value,
              },
            })
              .then((res) => {
                console.log("评论成功");
                let table = {
                  userPic: res.data.comment.user.avatarUrl,
                  user: res.data.comment.user.nickname,
                  content: res.data.comment.content,
                  commentId: res.data.comment.commentId,
                };
                // this.comments = [table, ...this.comnnents];
                this.comments.unshift(table);
                console.log(table);
                console.log(this.comments);
                console.log(res);
                // 获取评论后刷新最新的评论
                // this.getNewComments();
                // this.timer();
                // this.$router.push("/comments");
              })
              .catch((err) => {
                console.log(err);
              });
            this.flag = !this.flag;

            this.$message({
              type: "success",
              message: "评论成功",
            });
            // this.timer();

            // console.log("评论后的this.comments");
            // console.log(this.comments);
            // window.location.reload(); //页面刷新
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消评论",
            });
          });
      }
    },
    // 删除评论
    openDel() {
      this.$confirm("此操作将永久删除评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "pinglun",
        type: "warning",
      })
        .then(() => {
          axios({
            url: "/comment",
            params: {
              t: 0,
              type: 0,
              id: this.$store.state.playId,
              commentId: this.delCommentId,
            },
          })
            .then((res) => {
              console.log("删除评论 ");
              console.log(res);
              // 删除评论后刷新最新的评论
              this.getNewComments();
              // this.$router.push("/comments");
            })
            .catch((err) => {
              console.log(err);
            });

          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.isDel = !this.isDel;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
          this.isDel = !this.isDel;
        });
    },
    deleteComment(item) {
      // console.log(item.userPic + "。。。" + this.$store.state.user.userPic);
      if (item.user === this.$store.state.user.userName) {
        this.isDel = !this.isDel;
        this.delCommentId = item.commentId;
      }
    },
  },
};
</script>

<style>
.miao {
  position: fixed;
  overflow: hidden;
  /* background-color: black; */
}
.miao img {
  width: 30px;
}
.miao a {
  margin-bottom: 5px;
  display: block;

  width: 100px;
  height: 25px;
  padding-top: 5px;
  border-bottom: 1px solid #fca5a599;
  font-family: "Microsoft Yahei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
}
.miao a:hover {
  background-color: rgba(221, 127, 127, 0.466);
  transition: 0.5s;
  /* color: #c0c4cc; */
}
.del {
  display: block !important;
  position: absolute;
  bottom: 45px;
  right: 0px;
  box-shadow: #c0c4cc 1px 1px 1px;
  border-radius: 5px;
  width: 85px;
  background-color: #ff00003b;
  padding: 5px;
}
.pinglun:hover {
  color: rgba(236, 65, 65, 0.8);
}
.pinglun {
  color: #1f2937;
}
/* .touxiang {
  float: left;
  
} */
/* 评论部分 */
.content-box {
  display: fi;
  position: fixed;
  bottom: 80px;
  right: 0;
}
button.el-button.el-button--text:hover {
  background-color: rgba(182, 182, 182, 0.178) !important;
}
button.el-button.el-button--text {
  padding: 3px;
  color: #1f2937;
  border-radius: 5px;
  width: 85px;
}
.write-anniu {
  border-radius: 50% !important;
  padding: 2px !important;
  width: 50px;
  height: 20px;
}
.writeicon {
  font-size: 14px !important;
}
/*  */
.comlei {
  margin-top: 15px;
  color: gray;
  text-align: left;
  font-size: 16px;
}
.comments {
  margin: 10px auto;
  width: 75%;
  padding-bottom: 5%;
  overflow: auto;
  /* height: 100%; */
}
h1.mus-tit {
  font-size: 20px;
  padding-bottom: 5px;
  /* line-height: 23px; */
  font-weight: 500;
  border-bottom: rgb(236, 65, 65) solid 1px;
}
.com:hover {
  box-shadow: #dce0e6 0px 3px 7px;
}
.com {
  /* border-bottom: rgb(0 0 0 / 6%) 1px solid; */
  width: 100%;
  height: 100px;
  padding-top: 20px;
  box-shadow: #e5e7eb77 0px 1px 7px;
}
.com img {
  /* display: block; */

  /* float: left; */
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.com img,
.com .user {
  float: left;
}
.user {
  text-align: left;
  margin-left: 65px;
  margin-top: -50px;
  width: 100%;
  /* color: rgb(80, 125, 175); */
}
.userName {
  color: rgb(80, 125, 175);
  width: 100%;
}
.con {
  margin-top: 5px;
  overflow: hidden;
  width: 93%;
  height: 45px;
}
</style>
