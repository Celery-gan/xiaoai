<template>
<!-- 主页 -->
  <div>
   <homecounter></homecounter>
   <homebight></homebight>
   <homebottom></homebottom>
  </div>
</template>

<script>
// 引入计数器
import homecounter from '../components/HomeChild/Homecounter'
// 引入曲线图
import homebight from '../components/HomeChild/Homebight'
// 引入首页下方一排数据
import homebottom from '../components/HomeChild/Homebottom'
export default {
  data() {
    return {
     
    };
  },
  components: {
    homecounter,
    homebight,
    homebottom
  },
  methods: {
  
  },
  mounted() {

  },
  watch: {},
  computed: {}
};
</script>

<style lang='scss'>
.box-card {
  margin: 7px 8px;
  flex: 1;
}
.flexbtw {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.flexeve {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
