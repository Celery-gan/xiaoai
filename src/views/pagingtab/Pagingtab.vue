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
      <el-table-column label="操作" align="center">
        <!-- 表格的数据操作 要用  template slot-scope="scope" -->
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="del(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <paging :tabform="tabform" @currentPage="currentPage" @pagesize="pagesize"></paging>

    <!-- dialog 不属于任何结构 -->
    <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible">
      <!-- 第一项输入 商品名称/ -->
      <el-form :model="obj1">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="obj1.NAME" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 第二项输入 商品原价/ -->
        <el-form-item label="商品原价" :label-width="formLabelWidth">
          <el-input v-model="obj1.ORI_PRICE" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 第三项输入 商品现价 -->
        <el-form-item label="商品现价" :label-width="formLabelWidth">
          <el-input v-model="obj1.PRESENT_PRICE" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 取消按钮 -->
        <el-button @click="cancel">取 消</el-button>
        <!-- 确认按钮 -->
        <el-button type="primary" @click="makesure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入分页组件
import paging from "../../components/Paging";
export default {
  data() {
    return {
      tabform: [],
      arr: [],
      thing: "",

      currentPages: 1,
      pagesizes: 10,
      //  dislog 相关数据
      dialogTableVisible: false,
      dialogFormVisible: false,
      obj1: {},
      formLabelWidth: "80px"
    };
  },
  components: {
    paging
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
        this.tabform = this.arr;
      }
    },
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
    },
    pagesize(pagesize) {
      this.pagesizes = pagesize;
      console.log(this.pagesizes);
    },
    currentPage(currentPage) {
      this.currentPages = currentPage;
      console.log(this.currentPages);
    },
    // 删除表格数据
    del(index) {
      this.tabform.splice(index, 1);
      this.tabform.slice(
        (this.currentPages - 1) * this.pagesizes,
        this.currentPages * this.pagesizes
      ).splice(index, 1);
    },
    // 编辑表格数据
    edit(row) {
      // 是否显示 Dialog，支持 .sync 修饰符
      this.dialogFormVisible = true;
      this.obj1 = row;
    },
    makesure() {
      this.dialogFormVisible = false;
      this.$message({
        message: "修改成功",
        type: "success"
      });
    },
    cancel(){
       this.dialogFormVisible = false;
      this.$message({
        message: "取消修改",
        type: "info"
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
.product-list {
  margin: 8px auto;
  width: 84vw;
}
</style>