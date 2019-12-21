<template>
  <div>
    <el-card class="box-card">
      <div class="pic-title">支持拖拽</div>
      <div class="pic-sourse">Element UI 自带上传组件</div>
      <div>
        <!--drag:是否启用拖拽上传 -->
        <!--action:图片上传地址 -->
        <!-- multiple	是否支持多选文件 -->
        <el-upload class="upload-demo" drag action="/api/upload" multiple>
          <!-- 云图标 -->
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <div class="pic-title">支持裁剪</div>
      <div class="pic-sourse">vue-image-crop-upload</div>
      <div id="app">
        <el-button  class="btn" @click="toggleShow" type="primary">上传文件</el-button>
        <my-upload
          field="file"
          @crop-success="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
          v-model="show"
          :width="50"
          :height="50"
          url="/api/upload"
          :params="params"
          :headers="headers"
          img-format="png"
        ></my-upload>
        <img :src="imgDataUrl" />
      </div>
    </el-card>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
export default {
  data() {
    return {
      show: true,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl: "" // the datebase64 url of created image
    };
  },
  methods: {
    //控制剪切框的显示和隐藏
    toggleShow() {
      this.show = !this.show;
    },
    //剪切成功后的回调函数
    cropSuccess(imgDataUrl) {
      //  imgDataUrl其实就是图片的base64data码
      this.avatar = imgDataUrl;
      console.log(imgDataUrl); //这里打印出来的是base64格式的资源
    }
  },
  components: {
    "my-upload": myUpload
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.pic-title {
  font-size: 24px;
  font-weight: 500;
  line-height: 40px;
  margin: 10px 0;
}
.pic-sourse {
  line-height: 40px;
  background: rgb(238, 236, 236);
  margin: 10px 0;
}
</style>