<template>
  <div>
    <!-- 表格当前页数据展示  -->
    <!-- this.currentPages 分页返回当前页数 -->
    <!-- this.pagesizes 分页方法返回的当前页展示多少条数据 -->
    <el-table
      :data="arr1.slice(
        (this.currentPages - 1) * this.pagesizes,
        this.currentPages * this.pagesizes
      )"
      border
      class="product-list"
    >
      <!-- 第一项 排序标号 从1开始 -->
      <el-table-column label="#" align="center" width="40px">
        <!-- 排序标号可以通过当前项的index下标+1获得 -->
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <!-- 第二项 文章标题 -->
      <el-table-column prop="title" label="标题" align="center" width="350px"></el-table-column>
      <!-- 第三项 文章作者 -->
      <el-table-column prop="author" label="作者" align="center" width="100px"></el-table-column>
      <!-- 第四项 文章类目 tag标签包括 -->
      <el-table-column label="类目" align="center">
        <template slot-scope="scope">
          <!-- React 显示默认标签样式 -->
          <el-tag v-if="scope.row.category==='React'" effect="plain">{{scope.row.category}}</el-tag>
          <!-- Node.js 显示success标签样式 -->
          <el-tag
            v-else-if="scope.row.category==='Node.js'"
            effect="plain"
            type="success"
          >{{scope.row.category}}</el-tag>
          <!-- 性能优化 显示info标签样式 -->
          <el-tag
            v-else-if="scope.row.category==='性能优化'"
            effect="plain"
            type="info"
          >{{scope.row.category}}</el-tag>
          <!-- JavaScript 显示danger标签样式 -->
          <el-tag
            v-else-if="scope.row.category==='JavaScript'"
            effect="plain"
            type="danger"
          >{{scope.row.category}}</el-tag>
          <!-- 小程序 显示warning标签样式 -->
          <el-tag
            v-else-if="scope.row.category==='小程序'"
            effect="plain"
            type="warning"
          >{{scope.row.category}}</el-tag>
          <!-- 工具类 显示warning标签样式 -->
          <el-tag
            v-else-if="scope.row.category==='工具类'"
            effect="plain"
            type="warning"
          >{{scope.row.category}}</el-tag>
          <!-- 其他 显示info标签样式 -->
          <el-tag
            v-else-if="scope.row.category==='其他'"
            effect="plain"
            type="info"
          >{{scope.row.category}}</el-tag>
          <!-- Vue 显示danger标签样式 -->
          <el-tag
            v-else-if="scope.row.category==='Vue'"
            effect="plain"
            type="danger"
          >{{scope.row.category}}</el-tag>
        </template>
      </el-table-column>
      <!-- 第五项 文章来源 -->
      <el-table-column prop="source" label="来源" align="center"></el-table-column>
      <!-- 第六项 文章重要性 显示为评分星星 -->
      <el-table-column label="重要性" align="center">
        <template slot-scope="scope">
          <el-rate v-model="scope.row.star" disabled></el-rate>
        </template>
      </el-table-column>
      <!-- 第七项 文章发布时间  -->
      <el-table-column prop="date" label="发布时间" align="center"></el-table-column>
      <!-- 第八项 对文章进行的操作按钮  -->
      <el-table-column label="操作" width="210px" align="center">
        <!-- 表格的数据操作 要用  template slot-scope="scope" -->
        <template slot-scope="scope">
          <!-- 编辑 edits事件 -->
          <el-button type="primary" size="mini" @click="edits(scope.row)">编辑</el-button>
          <!-- 删除 dele事件 -->
          <el-button type="danger" size="mini" @click="dele(scope.row._id)">删除</el-button>
          <!-- 删除 check事件 -->
          <el-button type="success" size="mini" @click="check(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页子组件 将数组传过去 返回 currentPage 和 pagesize -->
    <paging :tabform="arr1" @currentPage="currentPage" @pagesize="pagesize"></paging>
  </div>
</template>

<script>
// 引入分页组件
import paging from "../../components/Paging";
export default {
  data() {
    return {
      arr1: [],
      // 分页第一页
      currentPages: 1,
      // 分页第一页数量
      pagesizes: 10
    };
  },
  components: {
    paging
  },
  methods: {
    
    getarticle() {
      // 获取所有文章: /article/allArticle (get请求)
      this.$axios
        .req("/article/allArticle")
        .then(res => {
          this.arr1 = res.data;
          this.arr1.map(item => {
            item.star = parseInt(item.star);
            item.date = this.$dayjs(item.date).format("YYYY-MM-DD hh:mm:ss");
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 编辑事件 跳转页面 并将该行数据传入
    edits(info) {
      this.$router.push({ name: "detail", query: { row: info } });
    },
    // 查看事件 传入对应行id 和获取相关数据进行查看
    check(info) {
      this.$router.push({ name: "check", query: { row: info._id } });
    },
    // 删除事件 从数据库永久删除 
    dele(ids) {
      // console.log(ids);
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .req("/article/delete", { _id: ids })
            .then(res => {
              // 删除成功 刷新当前显示内容
              this.getarticle();
            })
            .catch(err => {
              console.log(err);
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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
.product-list {
  margin: 8px auto;
  width: 84vw;
}
.bg1 {
  border: 1px solid red;
}
</style>