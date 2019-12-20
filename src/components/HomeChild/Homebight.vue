<template>
  <div>
    <el-card class="box-card">
      <ve-line :data="chartData" :settings="chartSettings"></ve-line>
      {{homechat}}
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      metrics: ["expected", "actual"],
      dimension: ["date"]
    };
    return {
      chartData: {
        columns: ["date", "expected", "actual"],
        rows: []
      }
    };
  },
  components: {},
  methods: {
    gethomeChat() {
      this.$axios
        .req("/homeChat")
        .then(res => {
          this.chartData.rows = res.data;
          console.log(res.data);
          console.log(this.chartData.homechat);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.gethomeChat();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>