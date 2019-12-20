<template>
  <!-- 分页表格页 pagingtab -->
  <div>
    <input
      type="text"
      v-model="thing"
      placeholder=" 请输入您想搜索的商品名称"
      @keydown.enter="seaches"
      class="tabsearch box-card"
    />
    <paging :tabform="tabform"></paging>
    <!-- <expxls :data1="tabform"></expxls> -->
  </div>
</template>

<script>
// 引入分页组件
import paging from "../../components/Paging";
// import expxls from "../../components/exports/Exportexcel";
export default {
  data() {
    return {
      tabform: [],
      arr: [],
      thing: ""
    };
  },
  components: {
    paging

    // expxls
  },
  methods: {
    seaches() {
      // 输入框有内容 进行过滤显示
      if (this.thing.trim() !== "") {
        this.tabform = this.arr.filter(item => {
          // includes 包含有 字符串方式
          return item.NAME.includes(this.thing);
        });
      }
      //  输入框没有内容 显示全部数据
      else {
        this.tabform = arr;
      }
    },
    gettableData() {
      this.$axios
        .req("/tableData")
        .then(res => {
          // tabform 接受数据
          this.tabform = res.data;
          // arr 备份数组
          // this.arr = this.tabform;
        })
        .catch(err => {
          console.log(err);
        });
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
.tabsearch {
  border: 1px solid rgb(214, 211, 211);
  height: 28px;
  line-height: 28px;
  width: 15vw;
  padding-left: 10px;
}
</style>