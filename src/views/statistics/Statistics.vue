<template>
  <div>
    <div class="box-card static-top">
      <div class="static-top1">
        <div>今日发布</div>
        <div>{{todayNum}}</div>
      </div>
      <div class="static-top2">
        <div>原创文章</div>
        <div>{{origiNum}}</div>
      </div>
      <div class="static-top3">
        <div>转载文章</div>
        <div>{{TransNum}}</div>
      </div>
      <div class="static-top4">
        <div>新消息</div>
        <div>0</div>
      </div>
    </div>
    <div class="static-middle box-card">
      <div class="chartData">
        <ve-pie :data="chartData1"></ve-pie>
      </div>
      <div class="chartData">
        <ve-pie :data="chartData2"></ve-pie>
      </div>
    </div>
    <div>
      <ve-waterfall :data="chartData3" class="box-card"></ve-waterfall>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      chartData1: {
        columns: ["category", "num"],
        rows: []
      },
      chartData2: {
        columns: ["source", "num"],
        rows: []
      },
      chartData3: {
        columns: ["date", "num"],
        rows: []
      },
      todayNum: 0,
      origiNum: 0,
      TransNum: 0
    };
  },
  components: {},
  methods: {
    getArtile() {
      this.$axios
        .req("/article/allArticle")
        .then(res => {
          this.list = res.data;
          // console.log(res.data);
          this.list.map(item => {
            item.date = this.$dayjs(item.date).format("YYYY年MM月DD日");
            if (item.date === this.$dayjs().format("YYYY年MM月DD日")) {
              this.todayNum++;
            }
            if (item.source === "原创") {
              this.origiNum++;
            }
            if (item.source === "转载") {
              this.TransNum++;
            }
          });
          let category = this.$lodash.groupBy(this.list, "category");
          for (let i in category) {
            this.chartData1.rows.push({
              category: i,
              num: category[i].length
            });
          }
          let source = this.$lodash.groupBy(this.list, "source");
          for (let i in source) {
            this.chartData2.rows.push({
              source: i,
              num: source[i].length
            });
          }
          let date = this.$lodash.groupBy(this.list, "date");
          for (let i in date) {
            this.chartData3.rows.push({
              date: i,
              num: date[i].length
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getArtile();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.static-top {
  display: flex;
  text-align: center;
  color: white;
}
.static-top1 {
  background: rgb(224, 148, 135) url("../../assets/img/yes.svg") no-repeat right;
  flex: 1;
}
.static-top2 {
  background: rgb(137, 197, 199) url("../../assets/img/article.svg") no-repeat
    right;
  flex: 1;
}
.static-top3 {
  background: rgb(189, 132, 255) url("../../assets/img/article.svg") no-repeat
    right;
  flex: 1;
}
.static-top4 {
  background: rgb(209, 190, 107) url("../../assets/img/news.svg") no-repeat
    right;
  flex: 1;
}
.static-middle {
  display: flex;
  margin: 40px 10px;
}
.chartData {
  flex: 1;
}
</style>