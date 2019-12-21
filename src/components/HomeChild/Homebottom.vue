 <template>
  <div class="flexbtw">
    <el-card class="box-card orderinfo">
      <el-table :data="arr1">
        <el-table-column prop="num" label="Order_No" width="360" align="center"></el-table-column>
        <el-table-column prop="price" label="Price" align="center"></el-table-column>
        <el-table-column prop="status" label="Status" align="center"></el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card todolist">
      <div class="box">
        <div class="box1 flexbtw">
          <div
            @click="changall"
            :v-model="checked1"
            :class="checked1===true?'img11':'img12'"
            class="checkimg"
          ></div>
          <div>
            <h4>Todo List</h4>
          </div>
        </div>
        <div class="flexbtw">
          <div v-for="(item) in show(x)" class="itenindo" :key="item.name">
            <div
              @click="chang1(item)"
              :v-model="item.checked"
              :class="item.checked===true?'img1':''"
              class="checkimg2"
            ></div>
            {{item.name}}
            <div @click="del(item)" class="del1"></div>
          </div>
          <div v-if="show(x).length === 0">暂无数据</div>
        </div>
        <div class="box3">
          {{show(x).length}} item left
          <div :class="{'ss1':x === 1}" @click="show(1)">All</div>
          <div :class="{'ss1':x === 2}" @click="show(2)">Active</div>
          <div :class="{'ss1':x === 3}" @click="show(3)">Completed</div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card todolist">
      <div>
        <img src="../../assets/img/s1.png" width="100%" />
      </div>
      <div class="myprogress">
        <div v-for="item in arr2" :key="item.name">
          <div>{{item.name}}</div>
          <div v-if="item.progress==1">
            <el-progress :percentage="100" status="success"></el-progress>
          </div>
          <div v-else>
            <el-progress :percentage="item.progress*100" :format="format"></el-progress>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr1: [],
      arr2: [],
      list: [
        {
          name: "star this repository",
          checked: false
        },
        {
          name: "fork this repository",
          checked: false
        },
        {
          name: "follow author",
          checked: false
        },
        {
          name: "vue-admin",
          checked: false
        },
        {
          name: "vue",
          checked: false
        },
        {
          name: "element-ui",
          checked: false
        },
        {
          name: "axios",
          checked: true
        },
        {
          name: "webpack",
          checked: true
        }
      ],
      checked1: false,
      x: 1
    };
  },
  components: {},
  methods: {
    getorderData() {
      this.$axios
        .req("/orderData")
        .then(res => {
          this.arr1 = res.data;
          this.arr1.map(item => {
            item.price = `￥${item.price}`;
            if (item.status === 1) {
              item.status = "success";
            } else if (item.status === 0) {
              item.status = "pengding";
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getprogress() {
      this.$axios
        .req("/progress")
        .then(res => {
          this.arr2 = res.data;
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    changall() {
      if (this.x === 1) {
        this.checked1 = !this.checked1;
        this.list.map(item => {
          return (item.checked = this.checked1);
        });
      }
    },
    chang1(item) {
      item.checked = !item.checked;
    },
    del(item) {
      this.list.splice(this.list.indexOf(item), 1);
    },
    show(n) {
      this.x = n;
      if (n === 1) {
        return this.list;
      } else if (n === 2) {
        return this.list.filter(item => !item.checked);
      } else if (n === 3) {
        return this.list.filter(item => item.checked);
      }
    }
  },
  mounted() {
    this.getorderData();
    this.getprogress();
    this.show(1);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.orderinfo {
  flex: 2;
}
.todolist {
  flex: 1;
}
.box {
  width: 100%;
  height: 27vw;
  position: relative;
}
.box1 {
  line-height: 35px;
  border-bottom: 1px solid rgb(207, 201, 201);
}
.checkimg {
  width: 20px;
  height: 20px;
  margin: auto 5px;
}
.img11 {
  background: url("../../assets/img/boult.png") no-repeat center;
  background-size: 80%;
  border: 1px solid #dee2da;
  border-radius: 50%;
}
.img12 {
  background: url("../../assets/img/boult.png") no-repeat center;
  background-size: 80%;
}
.box3 {
  width: 100%;
  position: absolute;
  bottom: 5px;
  margin: 5px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-top: 1px solid rgb(207, 201, 201);
}
.itenindo {
  width: 280px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  line-height: 40px;
  font-size: 16px;
  position: relative;
}
.ins1 {
  border-radius: 50%;
  margin: 5px;
}
.del1 {
  width: 20px;
  height: 20px;
  line-height: 20px;
  position: absolute;
  right: 5px;
  background: url("../../assets/img/cuo.png");
  background-size: 90%;
  opacity: 0.5;
}
.checkimg2 {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid grey;
  margin: auto 5px;
}
.img1 {
  background: url("../../assets/img/check.png") no-repeat center;
  background-size: 80%;
  border: 1px solid grey;
}
.box3 > div {
  height: 20px;
  padding: 5px;
  border-radius: 5px;
}
.ss1 {
  border: 1px solid #222222;
}
.myprogress {
  width: 90%;
  margin: 30px auto 10px;
}
</style>