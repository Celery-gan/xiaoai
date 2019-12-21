<template>
  <div>
    <el-table :data="arr1" border style="width: 100%">
      <el-table-column label="#"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="category" label="类目"></el-table-column>
      <el-table-column prop="source" label="来源"></el-table-column>
      <el-table-column prop="star" label="重要性"></el-table-column>
      <el-table-column prop="date" label="发布时间"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr1: []
    };
  },
  components: {},
  methods: {
    getarticle() {
      this.$axios
        .req("/article/allArticle")
        .then(res => {
          console.log(res);
          this.arr1 = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getarticle();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>