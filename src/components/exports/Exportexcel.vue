<template>
  <div style='display:flex'>
    <!-- 导出 excel -->
    <download-excel class="export-excel-wrapper" :data="list(data1)" name="tabform.xls">
      <el-button type="primary" size="small">导出xls</el-button>
    </download-excel>
     <!-- 导出 csv -->
    <download-excel class="export-excel-wrapper" :data="list(data1)" name="tabform.csv" type='csv'>
      <el-button type="primary" size="small">导出csv</el-button>
    </download-excel>
  </div>
</template>

<script>
export default {
  props: {
    data1: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      num1: 0,
    };
  },
  components: {},
  methods: {
    list(data1) {
      // 使用时页面内容循环体应为 v-for(item in divide(arr))
      // this.num1++;
      // if (this.num1 >= 500) {
      //   this.num1 === 0;
      // }
      return data1.slice(0, 1);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>