<template>
  <div class="exits">
    <div>
      <img src="../../assets/img/nono.jpg" @click="loginout" title="点击退出" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    loginout() {
      this.$confirm("您确认要退出本系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .req("/user/logout")
            .then(res => {
              // console.log(res);
              this.$message({ type: "success", message: res.message });
              localStorage.removeItem("username");
              localStorage.removeItem("date");
              this.$router.push("/login");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.exits {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>