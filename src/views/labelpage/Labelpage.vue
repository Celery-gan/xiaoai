<template>
  <div>
    <!-- 头部  -->
    <div class="box-card label-top">
      <!-- 未读消息 -->
      <div
        class="label-title"
        @click="show(1)"
        :class="{'font-color':num1===1}"
      >未读消息({{arr1.length}})</div>
      <!-- 已读消息 -->
      <div
        class="label-title"
        @click="show(2)"
        :class="{'font-color':num1===2}"
      >已读消息({{arr2.length}})</div>
      <!-- 回收站 -->
      <div
        class="label-title"
        @click="show(3)"
        :class="{'font-color':num1===3}"
      >回收站({{arr3.length}})</div>
    </div>
    <!-- 主体部分 -->
    <el-card class="box-card">
      <div v-for="item in show(num1)" :key="item.name" class="label-list flexbtw">
        <div>{{item.name}}</div>
        <div class="laber-left flexbtw">
          <div>{{item.time}}</div>
          <!-- 第一个页面信息后按钮为 标为已读 -->
          <div v-if="num1 === 1">
            <el-button size="small" @click="haveread(item)">标为已读</el-button>
          </div>
          <!-- 第二个页面信息后按钮为 删除 -->
          <div v-if="num1 === 2">
            <el-button size="small" @click="haveread(item)">删除</el-button>
          </div>
          <!-- 第三个页面信息后按钮为 还原 -->
          <div v-if="num1 === 3">
            <el-button type="warning" size="small" @click="haveread(item)">还原</el-button>
            <el-button type="danger" size="small" @click="clear(item)">清除</el-button>
          </div>
        </div>
      </div>
      <!-- 如果页面没有数据 显示暂无数据 -->
      <div v-if="show(num1).length === 0" class="laber-btn">暂无数据</div>
      <!-- 如果页面有数据 第一个页面总按钮 全部标记为已读 -->
      <div v-else-if="num1 === 1" class="laber-btn">
        <el-button type="primary" @click="havereadall">全部标记为已读</el-button>
      </div>
      <!-- 如果页面有数据 第二个页面总按钮 删除全部 -->
      <div v-else-if="num1 === 2" class="laber-btn">
        <el-button type="danger" @click="delall">删除全部</el-button>
      </div>
      <!-- 如果页面有数据 第三个页面总按钮 清空回收站 全部恢复 -->
      <div v-else-if="num1 === 3" class="laber-btn">
        <el-button type="danger" @click="BinEmpty">清空回收站</el-button>
        <el-button type="info" @click="renewall">全部恢复</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 第几个页面的标识 num1：1，2，3
      num1: 1,
      // 全部数据 flag为操作标识
      news: [
        { name: "one", time: "2019-12-13 12:02:45", flag: 1 },
        { name: "two", time: "2019-12-13 12:02:45", flag: 1 },
        { name: "three", time: "2019-12-13 12:02:45", flag: 2 },
        { name: "four", time: "2019-12-13 12:02:45", flag: 3 },
        { name: "five", time: "2019-12-13 12:02:45", flag: 3 },
        { name: "six", time: "2019-12-13 12:02:45", flag: 3 }
      ],
      // 每个页面的数据 用于统计个数
      arr1: [],
      arr2: [],
      arr3: []
    };
  },
  components: {},
  methods: {
    // 通过过滤 得到页面需要的数据
    show(n) {
      this.num1 = n;
      return this.news.filter(item => item.flag === n);
    },
    // 每次点击页面按钮 触发重新计算每页数组length
    update() {
      this.arr1 = [];
      this.arr2 = [];
      this.arr3 = [];
      this.news.map(item => {
        if (item.flag === 1) {
          this.arr1.push(item);
        }
        if (item.flag === 2) {
          this.arr2.push(item);
        }
        if (item.flag === 3) {
          this.arr3.push(item);
        }
      });
    },
    // 事件 标为已读 删除 恢复 触发重新计算length
    haveread(item) {
      if (item.flag === 3) {
        item.flag = 2;
      } else {
        item.flag = item.flag + 1;
      }
      this.update();
    },
    // 事件 全部标为已读 触发重新计算length
    havereadall() {
      this.arr1.map(item => {
        item.flag = 2;
      });
      this.update();
    },

    // 事件 删除全部 触发重新计算length
    delall() {
      this.arr2.map(item => {
        item.flag = 3;
      });
      this.update();
    },
    // 事件 全部恢复 触发重新计算length
    renewall() {
      this.arr3.map(item => {
        item.flag = 2;
      });
      this.update();
    },
    // 事件 清空回收站 不用触发 直接使arr3为空 删除总数组中flag=3的全部数据
    BinEmpty() {
      this.arr3 = [];
      this.news = this.news.filter(item => {
        return item.flag !== 3;
      });
    },
    // 事件 从回收站清除单个数据
    clear(item) {
      this.news = this.news.filter(item1 => {
        return item1 !== item;
      });
      this.update();
    }
  },
  mounted() {
    // 初始化方法 show 使页面存在起始数据
    this.show(1);
    // 初始化三哥页面对应数组 获取长度
    this.update();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.label-top {
  height: 2vw;
  border-bottom: 1px solid rgb(196, 215, 233);
  display: flex;
}
.label-title {
  margin: 0 5px;
}
.font-color {
  color: skyblue;
  border-bottom: 1px solid skyblue;
}
.label-list {
  border-bottom: 1px solid rgb(201, 233, 255);
  line-height: 60px;
  text-align: center;
}
.laber-left {
  width: 20vw;
}
.laber-btn {
  margin: 10px 0;
  display: flex;
}
</style>