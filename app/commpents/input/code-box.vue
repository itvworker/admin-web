<template>
    <div class="row-label">
        <div class="row-title" v-if="toggleTitle==1" :style="{width:tw}" v-html="title"></div>
        <div class="cover-right" @mouseover="showbtn=true" @mouseout="showbtn=false" >
              <div class="code-box" v-if="multiple" v-for="(item,index) in value" >
                <img :src="Api.imgurl+item" v-if="multiple" />
                <i class="icon-close"></i>
              </div>
            <div class="code-box" v-if="isAddBtn()">
                <img :src="Api.imgurl+value" v-show="value" v-if="!multiple" />
                <i class="icon-plus"></i>
                <!-- <input type="file" @change="upload"/> -->
                <transition name="vuecover">
                    <div class="cover-oper-bar" v-show="showbtn">
                        <span class="cover-btn-upload"><input class="cover-file" :multiple="multiple" type="file" @change="upload"/>{{value?'修改':'上传'}}</span>
                        <span class="cover-open-pics">线上图库</span>
                    </div>
                </transition>
            </div>
            <em class="err-msg" v-if="err!==true">{{err}}</em>
        </div>
        <!-- <pic></pic> -->
    </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "上传封面"
    },
    info: {
      type: String,
      default: "尺寸限580X340PX , 大小限100K以内"
    },
    value: {
      default: ""
    },
    toggleTitle: {
      default: 0
    },
    tw: {
      type: String,
      default: ".8rem"
    },
    schema: {
      default: false
    },
    rule: {
      default: false
    },
    width: {
      default: 1920
    },
    imgtype: {
      type: String,
      default: "caseSort"
    },
    multiple: {
      default: false
    },
    num: {
      default: 1
    }
  },
  computed: {},
  data() {
    return {
      images: "",
      cover: this.$props.value,
      showurl: this.$props.value,
      err: "",
      showbtn: false
    };
  },
  watch: {},
  created() {},
  methods: {
    isAddBtn(){
      return true;
    },
    async upload(e) {
  
      let img = await this.$tool.base64(this.width, e.target.files);
      let result = await this.$ajax.postXhr2(this.Api.uploads, {
        token: this.$store.state.user.token,
        data: img,
        type: this.imgtype
      });

      if (result.err_code == 200) {
        if (typeof this.value != "string") {
          let data = result.data;
          for (let i = 0, len = data.length; i < len; i++) {
            this.cover.push(data[i]["path"]);
          }
        } else {
          this.cover = result.data[0]["path"];
        }

        this.$emit("update:value", this.cover);
      }

      // this.showurl = img[0]["url"];
      // this.cover = img[0]["url"];
      // e.target.value = "";
      // this.$emit("update:value", this.cover);
      // if (this.schema) {
      //     this.err = this.schema.single(this.rule, this.cover);
      // }
    },
    focus() {},
    valtVal: function() {
      this.err = this.schema.single(this.rule, this.value);
      return this.err;
    },
    showErr: function(err) {
      this.err = err;
    }
  }
};
</script>
