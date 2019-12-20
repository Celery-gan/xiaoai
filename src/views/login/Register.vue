<template>
  <div class="loginto">
    <el-card class="box-card">
      <div slot="header" class="login_title">
        <span>欢迎来到小甘后台管理平台</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passwd">
          <el-input type="password" v-model="ruleForm.passwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
          <el-button type="primary" @click="goto" style="margin-left:80px;">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      let rat = false;
      for (let i in value) {
        rat = rat || value.charCodeAt(i) >= 10000;
      }
      if (value.trim() === "") {
        callback(new Error("姓名不能为空"));
      } else if (rat) {
        callback(new Error("姓名不能含有中文"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        passwd: "",
        name: ""
      },
      rules: {
        passwd: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, message: "密码必须大于6位", trigger: "blur" }
        ],
        name: [
          { validator: checkName, trigger: "blur" },
          { min: 2, max: 10, message: "用户名在2-10位之间", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // post数据
          this.$axios
            .req("/user/register", {
              username: this.ruleForm.name,
              password: this.ruleForm.passwd
            })
            .then(res => {
              console.log("res=>", res);
              if (res.message === "注册成功") {
                // 注册成功弹框
                this.$message({ type: "success", message: res.message });
                // 成功跳转
                this.$router.push("/login");
              } else {
                // 其他情况弹框
                this.$message({ type: "error", message: res.message });
                this.$refs[formName].resetFields();
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          // 弹框提示失败
          if (this.ruleForm.name === "") {
            this.$message({
              type: "error",
              message: "请输入用户名"
            });
          } else if (this.ruleForm.passwd === "") {
            this.$message({
              type: "error",
              message: "请输入密码"
            });
          } else if (this.ruleForm.passwd.length < 6) {
            this.$message({
              type: "error",
              message: "密码需大于6位"
            });
          } else {
            this.$message({
              type: "error",
              message: "注册失败，请重新输入注册账号,密码"
            });
            // 清空内容
            this.$refs[formName].resetFields();
          }
          return false;
        }
      });
    },
    goto() {
      this.$router.push("/login");
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.loginto {
  overflow: hidden;
  background-color: #d3dce6;
}
.box-card {
  width: 500px;
  margin: 100px auto;
}
.login_title {
  display: flex;
  justify-content: center;
  font-size: 18px;
}
</style>