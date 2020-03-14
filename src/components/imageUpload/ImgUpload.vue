<template>
  <div>
    <div class="img-uploader" v-bind:style="{width:width,height:height}" v-loading="loading" :value="value" @mouseenter="showOpearatorBar" @mouseleave="hiddenOpearatorBar">
      <div ref="operator-bar" class="operator-bar" v-if="!(disabled || imgUrl == '' || imgUrl == null || !operator)">
        <div style="padding: 5px;height: 100%;">
          <!--<i class="fa fa-minus fa-2x" style="margin-right: 5px" title="清空图片"  @click="cleanImg"></i> 有问题 -->
          <!--<i class="fa fa-close fa-2x" style="color: #FFD700" title="删除图片"  @click="deleteImg"></i>-->
          <img class="fa fa-close fa-2x" style="color: #FFD700;width: 20px" title="删除图片"  src="./icon/cheng.png" @click="deleteImg"/>
        </div>
      </div>
      <input type="file" id="upload"
             ref="upload"
             :disabled="disabled"
             @change="inputchange($event)"
             v-bind:style="{width:width,height:height}"
             :accept="accept">
      <img v-if="imgUrl && mediaType=='img'" v-bind:style="{width:width,height:height}" :src="IMAGE_BASE_URL+imgUrl" :height="height" class="avatar">

      <video v-else-if="imgUrl && mediaType=='video'" :src="IMAGE_BASE_URL+imgUrl" :autoplay="false" :width="width" :height="height" controls></video>

      <!--<video  v-bind:style="{width:width,height:height}" :src="imgUrl"></video> 如何支持先显示video-->

      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>

    <el-dialog
      title="图片裁剪"
      :visible.sync="cropperOption.img !=''"

      :before-close="handleCose"
      :width=" this.autoCropWidth+150 > 640 ? this.autoCropWidth > 1200 ? (this.autoCropWidth/2 + 150)+'px': (this.autoCropWidth+100)+'px'   :'640px'"
      :append-to-body="true"
    >
      <div>
        <el-button @click="rotateLeft" size="mini" class="btn fa fa-rotate-left"></el-button>
        <el-button @click="rotateRight" size="mini" class="btn fa fa-rotate-right"></el-button>
        <span
          style="color: #ABABAB;font-size: 12px;position: absolute;margin-left: 10px;top: 88px;">温馨提示：滑动鼠标可放大或缩小图片大小</span>
      </div>
      <!--防止截图框超过屏幕-->
      <div
        :style="{
          height:   this.autoCropWidth > 1200 ?   (this.autoCropHeight/2 + 100)+'px' :(this.autoCropHeight+100)+'px',
          width: this.autoCropWidth+100 > 600 ? this.autoCropWidth > 1200 ? (this.autoCropWidth/2 + 100)+'px': (this.autoCropWidth+100)+'px'   :'600px'
        }">
        <!---->
        <vueCropper v-if="cropperOption.img !=''"
                    ref="cropper"
                    :img="cropperOption.img"
                    outputType="png"
                    :autoCrop="cropperOption.autoCrop"
                    :autoCropWidth="cropperOption.autoCropWidth"
                    :autoCropHeight="cropperOption.autoCropHeight"
                    :fixed="cropperOption.fixed"
                    :fixedNumber="cropperOption.fixedNumber"
                    style="margin-top: 10px"
        ></vueCropper>
        <!--:fixedBox="cropperOption.fixedBox"-->
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button size="mini"  type="primary" @click="confirmCropper">上 传</el-button>
            </span>
    </el-dialog>

  </div>

</template>
<script>
  import axios from 'axios'
  import vueCropper from './vue-cropper.vue'

  export default {
    components: {
      vueCropper
    },
    name: 'ImgUpload',
    data() {
      return {
        imgUrl: this.value,
        loading: false,
        accept:"image/gif,image/jpeg,image/jpg,image/png,video/mp4",
        cropperOption: {
          img: '',
          autoCrop: true,
          outputSize:1,
          autoCropWidth: this.autoCropWidth > 1200 ? this.autoCropWidth/2:this.autoCropWidth,
          autoCropHeight: this.autoCropWidth > 1200 ? this.autoCropHeight/2 : this.autoCropHeight,
          fixedBox: true,
          fixed: true,
          fixedNumber: [this.autoCropWidth, this.autoCropHeight]
        },
        mediaType:'img'
      }
    },
    watch: {
      value(val) {
        this.imgUrl = val;

        var type=(val.substr(val.lastIndexOf("."))).toLowerCase();
        if(type==".mp4"){
          this.mediaType = 'video'
        }else{
          this.mediaType = 'img'
        }

      },
      autoCropHeight(val) {
        this.cropperOption = {
          img: '',
          autoCrop: true,
          outputSize:1,
          autoCropWidth: this.autoCropWidth > 1200 ? this.autoCropWidth/2:this.autoCropWidth,
          autoCropHeight: this.autoCropWidth > 1200 ? this.autoCropHeight/2 : this.autoCropHeight,
          fixedBox: true,
          fixed: true,
          fixedNumber: [this.autoCropWidth, this.autoCropHeight]
        }
      }
    },
    props: {
      path: {
        type: String,
        default: '/'
      },
      type:{
        type: String,
        default: 'I' // I 图片 V video  A 都可以
      },
      width: {
        type: String,
        default: '178px'
      },
      height: {
        type: String,
        default: '178px'
      },
      value: {
        type: String,
        default: ''
      },
      cropper: { //是否裁剪
        type: Boolean,
        default: false
      },
      autoCropWidth: {
        type: Number,
        default: 178
      },
      autoCropHeight: {
        type: Number,
        default: 178
      },
      disabled: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: null
      },
      operator:{
        type:Boolean,
        default:false
      }
    },
    mounted(){
      if(this.type =='I'){
        this.accept = "image/gif,image/jpeg,image/jpg,image/png"
      } else if(this.type =='V'){
        this.accept = "video/mp4"
      }else if(this.type =='A'){
        this.accept = "image/gif,image/jpeg,image/jpg,image/png,video/mp4"
      }
    },
    methods: {
      rotateLeft() {
        this.$refs.cropper.rotateLeft()
      },
      rotateRight() {
        this.$refs.cropper.rotateRight()
      },
      showOpearatorBar(event){
        if(this.disabled || this.imgUrl == '' || this.imgUrl == null || !this.operator){
          return ;
        }

        event.target.style.opacity =0.8;
        event.target.style.transition = 'opacity .5s';
        event.target.children[0].style.opacity =0.8;
        event.target.children[0].style.transition = 'opacity .5s';

      },
      hiddenOpearatorBar(event){
        if(this.disabled || this.imgUrl == '' || this.imgUrl == null || !this.operator){
          return ;
        }

        event.target.style.opacity =1;
        event.target.style.transition = 'opacity .5s';
        event.target.children[0].style.opacity =0;
        event.target.children[0].style.transition = 'opacity .5s';
      },
      cleanImg(){
        this.$emit('onClean',this.index);
      },
      deleteImg(){
        this.$emit('onDelete',this.index);
      },
      inputchange(event) {
        this.mediaType ='video'

        var file = event.target;
        var self = this;

        var type= file.files[0].type

        if(type.toLowerCase().indexOf('video')>=0){
          var formData = new FormData();
          formData.append("fileObj", file.files[0]);

          self.uploadImage(formData);
        }else{
          this.mediaType ='img'


          let reader = new FileReader();
          reader.readAsDataURL(file.files[0]);
          reader.onloadend = function () {
            let base64 = reader.result; // base64就是图片的转换的结果

            var img = new Image();
            img.src = base64
            img.onload = function() {
              var flag = true;
//              if(img.width == self.autoCropWidth && img.height == self.autoCropHeight){
//                flag = false; //宽高相同不截图
//              }

              if(img.width / img.height  == self.autoCropWidth / self.autoCropHeight){
                flag = false; //宽高比例相同不截图
              }

              if (self.cropper && flag) {  //需要裁剪

                self.cropperOption.img = base64;
              } else {
                var formData = new FormData();
                formData.append("fileObj", file.files[0]);

                self.uploadImage(formData);
              }
            };
          };
        }
      },
      handleCose() {
        this.cropperOption.img = '';
        //关闭时清空文件
        this.$refs.upload.value = null;

      },
      confirmCropper() {
        var self = this;
        self.$refs.cropper.getCropBlob((data) => {
          var formData = new FormData();
          formData.append("fileObj", data);
          self.uploadImage(formData);
          self.handleCose();
        })
      },
      uploadImage(formData){
        this.$set(this,"loading",true);

        axios.post('http://localhost:8082/sell/file/upload', formData).then(res =>{

          if (res.status == 200 && res.data.status == 200) {
//            console.log(this.index);
            this.imgUrl = res.data.data.key;
            this.$emit('onSucceed',res.data.data.key, this.index, this.mediaType);
            this.loading = false;
          } else {
            console.log('图片上传失败!' + res.data.message);
            this.$emit('onFailed', res.data.message);
            this.loading = false;
          }
        },err =>{
          console.log('图片上传失败!' +err);
          this.$emit('onFailed', err);
          this.loading = false;
        })
      }
    }
  }


</script>
<style scoped>
  .operator-bar{
    width: 100%;
    top: 0;
    height: 35px;
    position: absolute;
    z-index: 9999;
    color: #ffffff;
    background-color: #777777;
    font-size: 12px;
    opacity:0;
    display: flex;
    justify-content: flex-end;
  }

  .img-uploader input {
    position: absolute;
    top: 0;
    text-align: right;
    opacity: 0;
    background: 0 0;
    cursor: inherit;
    width: 178px;
    height: 178px;

  }

  .img-uploader {
    width: 178px;
    height: 178px;
    border-width: 1.5px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background:#ffffff;
  }

  .img-uploader:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
