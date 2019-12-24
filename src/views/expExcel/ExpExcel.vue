<template>
  <div>
    <!-- 表格显示数据 list(tabform) 是分好页的数组 -->
    <el-table
      :data="tabform.slice(
        (this.currentPages - 1) * this.pagesizes,
        this.currentPages * this.pagesizes
      )"
      class="product-list"
    >
      <!-- prop 表格对应列内容的字段名 -->
      <!-- label 表格显示的标题 -->
      <!-- width	表格对应列的宽度 默认每列平方 -->
      <el-table-column prop="NAME" label="商品名称" align="center" width="500px"></el-table-column>
      <el-table-column prop="GOODS_SERIAL_NUMBER" label="商品编号" align="center"></el-table-column>
      <el-table-column prop="ORI_PRICE" label="原价" align="center"></el-table-column>
      <el-table-column prop="PRESENT_PRICE" label="现价" align="center"></el-table-column>
    </el-table>
    <paging :tabform="tabform" @currentPage="currentPage" @pagesize="pagesize"></paging>

    <div style="display:flex">
      <!-- 导出 excel -->
      <download-excel
        class="export-excel-wrapper"
        style="margin:10px"
        :data="tabform.slice(
        (this.currentPages - 1) * this.pagesizes,
        this.currentPages* this.pagesizes
      )"
        name="tabform.xls"
      >
        <el-button type="primary" size="small">导出xls</el-button>
      </download-excel>
      <!-- 导出 csv -->
      <!-- :data 导出数据 为当前页的数据 -->
      <download-excel
        class="export-excel-wrapper"
        style="margin:10px"
        :data="tabform.slice(
        (this.currentPages - 1) * this.pagesizes,
        this.currentPages * this.pagesizes
      )"
        name="tabform.csv"
        type="csv"
      >
        <el-button type="primary" size="small">导出csv</el-button>
      </download-excel>
    </div>
  </div>
</template>

<script>
import paging from "../../components/Paging";
export default {
  data() {
    return {
      tabform: [],
      currentPages: 1,
      pagesizes: 10
    };
  },
  components: {
    paging
  },
  methods: {
    gettableData() {
      this.$axios
        .req("/tableData")
        .then(res => {
          // tabform 接受数据
          this.tabform = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    pagesize(pagesize) {
      this.pagesizes = pagesize;
      // console.log(this.pagesizes);
    },
    currentPage(currentPage) {
      this.currentPages = currentPage;
      // console.log(this.currentPages);
    }
  },
  mounted() {
    this.gettableData();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.product-list {
  margin: 8px auto;
  width: 84vw;
}
</style>