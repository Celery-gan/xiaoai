<template>
  <div>
   <homeone></homeone>
   <homebight></homebight>
  </div>
</template>

<script>
import homeone from '../components/HomeChild/Homeone'
import homebight from '../components/HomeChild/Homebight'
export default {
  data() {
    return {
     
    };
  },
  components: {
    homeone,
    homebight,
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
  margin: 8px 20px;
  flex: 1;
}
</style>
