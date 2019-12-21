<template>
  <div>
    <!-- 头部 -->
    <div class="public-top">1</div>
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
          <el-select v-model="ruleForm.significances" placeholder="请选择" class="checks">
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
              v-model="ruleForm.dates"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
            >></el-date-picker>
          </div>
        </el-form-item>
      </div>
      <div id="main">
        <mavon-editor v-model="ruleForm.value" />
      </div>
      <el-form-item class="public-submit">
        <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { value: "React", label: "React" },
        { value: "Node.js", label: "Node.js" },
        { value: "性能优化", label: "性能优化" },
        { value: "JavaScript", label: "JavaScript" },
        { value: "小程序", label: "小程序" },
        { value: "工具类", label: "工具类" },
        { value: "其他", label: "其他" }
      ],
      sources: [
        { value: "原创", label: "原创" },
        { value: "转载", label: "转载" },
        { value: "与他人合作", label: "与他人合作" }
      ],
      significa: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" }
      ],
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
        title: "",
        abstract: "",
        author: "",
        category: "",
        source: "",
        significances: "",
        dates: "",
        value: ""
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
        significances: [
          { required: true, message: "请选择文章摘要", trigger: "change" }
        ]
      }
    };
  },
  components: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .req("/article/create",{
              title: this.ruleForm.title,
              abstract: this.ruleForm.abstract,
              author: this.ruleForm.author,
              category: this.ruleForm.category,
              source: this.ruleForm.source,
              star: this.ruleForm.significances,
              text: this.ruleForm.value,
              date: this.ruleForm.dates,
            })
            .then(res => {
              if(res.code === 200){
              this.$message({
                message: "文章已成功发布",
                type: "success"
              });
              }
              else {
                 this.$message({
                message: res.message.message,
                type: "success"
              });
              }
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      console.log(1);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.public-top {
  height: 30px;
  background: rgb(0, 162, 255);
  margin: 0 8px 30px;
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