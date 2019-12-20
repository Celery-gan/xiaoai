<template>
  <div>
    <!-- 曲线图 -->
    <el-card class="box-card">
      <ve-line :data="chartData1" :settings="chartSettings1"></ve-line>
    </el-card>
    <div class="flexbtw">
      <!-- 雷达图 -->
      <el-card class="box-card">
        <ve-radar :data="chartData2"></ve-radar>
      </el-card>
      <!-- 饼图 -->
      <el-card class="box-card">
        <ve-pie :data="chartData3" :settings="chartSettings3"></ve-pie>
      </el-card>
      <el-card class="box-card">
        <!-- 柱状图 数据与曲线图一样 -->
        <ve-histogram :data="chartData1"></ve-histogram>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.chartSettings1 = {
      metrics: ["expected", "actual"],
      dimension: ["date"]
    };
    this.chartSettings3 = {
      dataType: "percent"
    };
    return {
      // 曲线图、柱状图数据
      chartData1: {
        columns: ["date", "expected", "actual"],
        rows: []
      },
      // 雷达图数据
      chartData2: {
        columns: [
          "name",
          "sales",
          "ministration",
          "techology",
          "marketing",
          "delelopmer"
        ],
        rows: []
      },
      // 饼图数据
      chartData3: {
        columns: ["name", "data"],
        rows: []
      }
    };
  },
  components: {},
  methods: {
    // 获取曲线图、柱状图数据
    gethomeChat() {
      this.$axios
        .req("/homeChat")
        .then(res => {
          this.chartData1.rows = res.data;
          this.chartData4.rows = res.data;
          // console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取雷达图数据
    gethomeChat2() {
      this.$axios
        .req("/radarChat")
        .then(res => {
          this.chartData2.rows = res.data;
          // console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取饼图数据
    gethomeChat3() {
      this.$axios
        .req("/ringChat")
        .then(res => {
          this.chartData3.rows = res.data;
          // console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.gethomeChat();
    this.gethomeChat2();
    this.gethomeChat3();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>