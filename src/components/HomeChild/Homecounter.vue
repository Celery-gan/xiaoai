<template>
  <!-- 计数器 -->
  <div>
    <div class="flex">
      <el-card class="box-card">
        <div class="flex">
          <div>
            <img src="../../assets/img/people.svg" class="box-img" />
          </div>
          <div>
            <div class="box-classify">new visits</div>
            <!-- duration	持续时间，以毫秒为单位 -->
            <!-- startVal	开始值    endVal	结束值 -->
            <countTo :startVal='homedata.visits' :endVal='102500' :duration="300000"></countTo>
            <!-- <div>{{homedata.visits}}</div> -->
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="flex">
          <div>
            <img src="../../assets/img/news.svg" class="box-img" />
          </div>
          <div>
            <div class="box-classify">messages</div>
            <div>{{homedata.messages}}</div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="flex">
          <div>
            <img src="../../assets/img/money.svg" class="box-img" />
          </div>
          <div>
            <div class="box-classify">purchases</div>
            <div>{{homedata.purchases}}</div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="flex">
          <div>
            <img src="../../assets/img/car.svg" class="box-img" />
          </div>
          <div>
            <div class="box-classify">shoppings</div>
            <div>{{homedata.shopping}}</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  data() {
    return {
      homedata: {}
    };
  },
  components: {
    countTo
  },
  methods: {
    gethomeData() {
      this.$axios
        .req("/homeData")
        .then(res => {
          // console.log(res.data);
          this.homedata = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.gethomeData();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.box-img {
  width: 60%;
  flex: 1;
}
.box-classify {
  color: rgb(168, 165, 161);
  font-size: 14px;
  line-height: 20px;
}
</style>