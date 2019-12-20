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
        <div class="flex">
          <el-form-item label="验证码" prop="code">
            <div class="input_code">
              <el-input type="text" v-model="ruleForm.code" autocomplete="off"></el-input>
            </div>
          </el-form-item>
          <div @click="changeCode" v-html="codesimg"></div>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
          <el-button type="primary" @click="goto" style="margin-left:80px;">立即注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("姓名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("密码不能为空"));
      }
      callback();
    };
    var validatecode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else {
        callback();
      }
    };
    return {
      codesimg: "",
      ruleForm: {
        passwd: "",
        code: "",
        name: ""
      },
      rules: {
        passwd: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 10, message: "密码必须大于6位", trigger: "blur" }
        ],
        code: [
          { validator: validatecode, trigger: "blur" },
          { min: 4, max: 4, message: "验证码为4位", trigger: "blur" }
        ],
        name: [
          { validator: checkName, trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
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
            .req("/user/login", {
              username: this.ruleForm.name,
              password: this.ruleForm.passwd,
              code: this.ruleForm.code
            })
            .then(res => {
              console.log("res=>", res);
              if (res.message === "登录成功") {
                // 注册成功弹框
                this.$message({ type: "success", message: res.message});
                // 将用户名存在本地
                localStorage.setItem("username", this.ruleForm.name);
                // sessionStorage.setItem('date',res.data[0].date);
                sessionStorage.setItem('date',this.$dayjs());
                console.log(res.data[0].date);   
                // 成功就跳转到主页;
                this.$router.push("/");
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
          }else if (this.ruleForm.code === '') {
            this.$message({
              type: "error",
              message: "请输入验证码"
            });
          }else if (this.ruleForm.code.length < 6) {
            this.$message({
              type: "error",
              message: "验证码应为4位"
            });
          } else if (this.ruleForm.passwd.length < 6) {
            this.$message({
              type: "error",
              message: "密码需大于6位"
            });
          } else {
            this.$message({
              type: "error",
              message: "登录失败，请重新输入"
            });
            // 清空内容
            this.$refs[formName].resetFields();
          }
          return false;
        }
      });
    },
    goto() {
      this.$router.push("/register");
    },
    changeCode() {
      this.$axios
        .req("/captcha")
        .then(res => {
          this.codesimg = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.changeCode();
  },
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
.input_code {
  width: 70%;
}
.flex {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>