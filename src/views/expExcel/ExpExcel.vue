<template>
  <div>
    <paging :tabform="tabform"></paging>
    <expxls :data1="tabform"></expxls>
  </div>
</template>

<script>
import paging from "../../components/Paging";
import expxls from "../../components/exports/Exportexcel";
export default {
  data() {
    return {
      tabform: []
    };
  },
  components: {
    paging,
    expxls
  },
  methods: {
    gettableData() {
      this.$axios
        .req("/tableData")
        .then(res => {
          // tabform 接受数据
          this.tabform = res.data;
          // arr 备份数组
          this.arr = this.tabform;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    thia.gettableData();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>