<template>
  <div>
    <div class="common_top">
      <div class="common_title">
        <!-- <div class="portrait"><img src='../../assets/img/pic.gif' width="30px"></div> -->
        <div>欢迎来到小甘管理系统</div>
      </div>
      <div class="common_nav">
        <span>亲爱的{{name}}</span>
        <span>
          <span v-if="hours>=0&&hours<6">该睡觉咯，亲</span>
          <span v-if="hours>=6&&hours<12">早上好</span>
          <span v-if="hours>=12&&hours<14">中午好</span>
          <span v-if="hours>=14&&hours<18">下午好</span>
          <span v-if="hours>=18&&hours<24">晚上好</span>
        </span>
        <span>登录时间:{{date}}</span>
      </div>
    </div>
    <div class="flex">
      <div class="left_nav">
        <el-row class="tac">
          <el-col>
            <el-menu
              :default-active="active"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-menu-item index="/" @click="goto('/')">
                <i class="el-icon-location"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-menu-item index="/pagingtab" @click="goto('/pagingtab')">
                <i class="el-icon-menu"></i>
                <span>分页表格</span>
              </el-menu-item>
              <el-menu-item index="/labelpage" @click="goto('/labelpage')">
                <i class="el-icon-document"></i>
                <span slot="title">标签页</span>
              </el-menu-item>
              <el-menu-item index="/pictures" @click="goto('/pictures')">
                <i class="el-icon-setting"></i>
                <span slot="title">图片上传</span>
              </el-menu-item>
              <el-menu-item index="/beenpub" @click="goto('/beenpub')">
                <i class="el-icon-setting"></i>
                <span slot="title">已发表</span>
              </el-menu-item>
              <el-menu-item index="/publish" @click="goto('/publish')">
                <i class="el-icon-setting"></i>
                <span slot="title">发布文章</span>
              </el-menu-item>
              <el-menu-item index="/statistics" @click="goto('/statistics')">
                <i class="el-icon-setting"></i>
                <span slot="title">统计</span>
              </el-menu-item>
              <el-menu-item index="/expExcel" @click="goto('/expExcel')">
                <i class="el-icon-setting"></i>
                <span slot="title">导出Excel</span>
              </el-menu-item>
              <el-menu-item index="/logout" @click="goto('/logout')">
                <i class="el-icon-setting"></i>
                <span slot="title">退出系统</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="sidebar">
        <backtop>
          <router-view></router-view>
        </backtop>
      </div>
    </div>
  </div>
</template>

<script>
import backtop from "../../components/Backtop";
export default {
  data() {
    return {
      name: "",
      date: "",
      hours: ""
    };
  },
  components: {
    backtop
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changtime() {
      // 获取当前小时
      this.hours = this.$dayjs().hour();
      // 将时间修改为(YYYY年MM月DD日hh时mm分ss秒)模式
      this.date = this.$dayjs(localStorage.getItem('date')).format(
        "YYYY年MM月DD日hh时mm分ss秒"
      );
    },
    goto(path) {
      this.$router.push(path);
    }
  },
  mounted() {
    this.name = localStorage.getItem("username");
    this.changtime();
  },
  watch: {},
  computed: {
    active() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped lang='scss'>
.common_top {
  width: 100%;
  height: 60px;
  background: rgb(14, 68, 139);
  color: white;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.common_title {
  width: 40%;
  margin-left: 2%;
  // display: flex;
  // align-items: center
}
.common_nav {
  width: 33%;
  display: flex;
  justify-content: space-evenly;
}
.flex {
  display: flex;
  justify-content: space-between;
  background: rgb(238, 236, 236);
}
.left_nav {
  flex: 1;
  background: #545c64;
  height: 728px;
}
.sidebar {
  flex: 6;
  padding-top: 20px;
}
</style>