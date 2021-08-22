<template>
  <div class="mv">
    <div class="zuixin mvb">
      <span class="tit">最新MV </span>
      <!-- <i class="el-icon-arrow-right e"></i> -->
      <div class="shiping">
        <div
          class="video"
          v-for="(item, index) in zuiMV"
          :key="index"
          @click="boFangMV(item)"
        >
          <img class="mv-img" :src="item.pic" alt="" width="100%" />
          <div class="name">{{ item.mvName }}</div>
          <div class="author">{{ item.mvAuthor }}</div>
        </div>
      </div>
    </div>
    <div class="rebo mvb">
      <div class="tit">热播MV</div>
      <!-- <i class="el-icon-arrow-right e"></i> -->
      <div class="shiping">
        <div
          class="video"
          v-for="(item, index) in reMV"
          :key="index"
          @click="boFangMV(item)"
        >
          <img class="mv-img" :src="item.pic" alt="" width="100%" />
          <div class="name">{{ item.mvName }}</div>
          <div class="author">{{ item.mvAuthor }}</div>
        </div>
      </div>
    </div>
    <div class="wangyi mvb" style="padding-bottom: 7%">
      <div class="tit">网易出品</div>
      <!-- <i class="el-icon-arrow-right e"></i> -->
      <div class="shiping">
        <div
          class="video"
          v-for="(item, index) in wangMV"
          :key="index"
          @click="boFangMV(item)"
        >
          <img class="mv-img" :src="item.pic" alt="" width="100%" />
          <div class="name">{{ item.mvName }}</div>
          <div class="author">{{ item.mvAuthor }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../../network/axios";
export default {
  name: "videos",
  data() {
    return {
      mvUrl: "",
      zuiMV: [
        {
          mvId: 0,
          pic: "",
          mvName: "",
          mvAuthor: "",
        },
      ],
      reMV: [
        {
          mvId: 0,
          pic: "",
          mvName: "",
          mvAuthor: "",
        },
      ],
      wangMV: [
        {
          mvId: 0,
          pic: "",
          mvName: "",
          mvAuthor: "",
        },
      ],
    };
  },
  created() {
    // 并发请求Mv信息
    axios
      .all([
        axios.get("/mv/first?limit=10"),
        axios.get("/personalized/mv"),
        axios.get("mv/exclusive/rcmd?limit=10"),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          // 最新Mv

          for (let index = 0; index < 8; index++) {
            console.log("index:  " + index);

            this.$set(this.zuiMV, index, {
              mvId: res1.data.data[index].id,
              pic: res1.data.data[index].cover,
              mvName: res1.data.data[index].name,
              mvAuthor: res1.data.data[index].artistName,
            });
          }
          // 热播Mv
          for (let index = 0; res2.data.result[index]; index++) {
            this.$set(this.reMV, index, {
              mvId: res2.data.result[index].id,
              pic: res2.data.result[index].picUrl,
              mvName: res2.data.result[index].name,
              mvAuthor: res2.data.result[index].artistName,
            });
          }
          // 网易出品
          for (let index = 0; index < 8; index++) {
            this.$set(this.wangMV, index, {
              mvId: res3.data.data[index].id,
              pic: res3.data.data[index].cover,
              mvName: res3.data.data[index].name,
              mvAuthor: res3.data.data[index].artistName,
            });
          }
          console.log(res1);
          console.log(res2);
          console.log(res3);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    boFangMV(val) {
      // console.log(val.mvId);
      // /mv/url?id=54367125436712
      axios({
        url: "/mv/url",
        params: {
          id: val.mvId,
        },
      })
        .then((res) => {
          // console.log(res.data.data.url);
          var mvUrl = res.data.data.url;
          this.$store.commit({
            type: "boFangMV",
            mvUrl,
          });
          console.log(this.$store.state.mvUrl);
          console.log("提交成功");
        })
        .catch((err) => {
          console.log(err);
        });
      this.$router.push("/onMv");
    },
  },
};
</script>

<style scoped>
.shiping .name,
.shiping .author {
  display: block;
  text-align: left !important;
  width: 262px;
}
.shiping {
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  width: 100%;
  height: auto;
}
.name {
  font-size: 14px;
  margin-top: 10px;
}
.author {
  color: rgb(103, 103, 103);
}
.video {
  margin-top: 25px;
  margin-right: 22px;
}
.mv-img {
  border-radius: 5px;
  width: 262px;
  height: 150px;
}
.mv i,
.tit {
  float: left !important;
  font-weight: 600;
}
.mv {
  margin: 10px 80px;
}
.tit {
  text-align: left !important;
  float: left;
  font-size: 20px;
  margin-top: 10px;
  border-bottom: 4px solid rgb(236, 65, 65);
}
.mvb {
  /* height: 300px; */
  width: 100%;
  padding-bottom: 2%;
  /* background-color: pink; */
}
</style>

