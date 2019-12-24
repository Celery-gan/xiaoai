<template>
  <div>
    <!-- 头部 -->
    <div class="public-top">
      <div>
        <el-button type="danger" size="mini" @click="goback">返回</el-button>
        <el-button type="primary" size="mini" @click="submitForm('ruleForm')">发布</el-button>
      </div>
    </div>
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm public-form"
    >
      <!-- 文章标题 输入框 -->
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <!-- 文章摘要 输入框-->
      <el-form-item label="文章摘要" prop="abstract">
        <el-input v-model="ruleForm.abstract"></el-input>
      </el-form-item>
      <div class="flexeve">
        <!-- 作者 输入框 -->
        <el-form-item label="作者" prop="author">
          <el-input v-model="ruleForm.author"></el-input>
        </el-form-item>
        <!-- 类目 下拉菜单-->
        <el-form-item label="类目" prop="category">
          <el-select v-model="ruleForm.category" placeholder="请选择" class="checks">
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 来源 下拉菜单 -->
        <el-form-item label="来源" prop="source">
          <el-select v-model="ruleForm.source" placeholder="请选择" class="checks">
            <el-option
              v-for="item in sources"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 重要性 下拉菜单 -->
        <el-form-item label="重要性" prop="significances">
          <el-select v-model="ruleForm.star" placeholder="请选择" class="checks">
            <el-option
              v-for="item in significa"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 活动时间 -->
        <el-form-item label="活动时间">
          <div class="block">
            <!-- <span class="demonstration">带快捷选项</span> -->
            <el-date-picker
              v-model="ruleForm.date"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
            >></el-date-picker>
          </div>
        </el-form-item>
      </div>
      <div id="main">
        <mavon-editor v-model="ruleForm.text" />
      </div>
      <el-form-item class="public-submit">
        <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 下拉菜单对应数组 8个
      categories: [
        { value: "React", label: "React" },
        { value: "Vue", label: "Vue" },
        { value: "Node.js", label: "Node.js" },
        { value: "JavaScript", label: "JavaScript" },
        { value: "性能优化", label: "性能优化" },
        { value: "小程序", label: "小程序" },
        { value: "工具类", label: "工具类" },
        { value: "其他", label: "其他" }
      ],
      // 来源对应数组 3个
      sources: [
        { value: "原创", label: "原创" },
        { value: "转载", label: "转载" },
        { value: "与他人合作", label: "与他人合作" }
      ],
      // 重要性对应数组 5个
      significa: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" }
      ],
      // 日历选择器
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      ruleForm: {
        _id: "",
        title: "",
        abstract: "",
        author: "",
        category: "",
        source: "",
        star: "",
        date: "",
        text: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 3, message: "标题最少3个字符", trigger: "blur" }
        ],
        abstract: [
          { required: true, message: "请选择文章摘要", trigger: "change" }
        ],
        author: [
          { required: true, message: "请选择文章摘要", trigger: "change" }
        ],
        category: [
          { required: true, message: "请选择文章摘要", trigger: "change" }
        ],
        source: [
          { required: true, message: "请选择文章摘要", trigger: "change" }
        ],
        star: [{ required: true, message: "请选择文章摘要", trigger: "change" }]
      }
    };
  },
  components: {},
  methods: {
    // 返回前一页
    goback() {
      history.back();
      // history.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 当前时间的时间撮
          let time1 = this.$dayjs().valueOf();
          // 文章发布时间的时间撮
          let time2 = this.$dayjs(this.ruleForm.date).valueOf();
          // 如果发布时间的时间撮小于当前时间撮（发布时间先于当前时间）
          if (time1 >= time2) {
            //  - 编辑文章: /article/update
            // - post请求
            //   - 参数:
            //     id: 文章的id
            //     title: 文章标题
            //     abstract: 文章摘要
            //     author: 作者
            //     category: 类目
            //     source: 来源
            //     star: 重要性
            //     text: 文章内容
            //     date: 发布时间
            this.$axios
              .req("/article/update", {
                id: this.ruleForm._id,
                title: this.ruleForm.title,
                abstract: this.ruleForm.abstract,
                author: this.ruleForm.author,
                category: this.ruleForm.category,
                source: this.ruleForm.source,
                star: this.ruleForm.star,
                text: this.ruleForm.text,
                date: this.ruleForm.date
              })
              .then(res => {
                if (res.success === true) {
                  this.$message({
                    message: "文章修改成功",
                    type: "success"
                  });
                  // 修改成功 跳回已发布页
                  this.$router.push("/beenpub");
                } else {
                  this.$message({
                    message: res.message.message,
                    type: "danger"
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
          // 如果发布时间的时间撮大于当前时间撮（发布时间在当前时间之后）
          else {
            this.$message({
              message: "非法时间",
              type: "success"
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    //  接受 已发布 对应点击时间传过来的数组信息
    this.ruleForm = this.$route.query.row;
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.public-top {
  height: 34px;
  background: rgb(201, 255, 187);
  margin: 0 8px 30px;
  line-height: 30px;
  padding-left: 88%;
}
.public-form {
  width: 98%;
  margin: 5px auto;
}
.checks {
  width: 10vw;
}
.public-submit {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>