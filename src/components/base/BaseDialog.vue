<!--
  <BaseDialog :title="title" :isshow.sync="sendDialog" width="40%" height="300px">
      <section class="dialog-center">
        内容区域
      </section>
      <section slot="footer" class="footer">
       底部按钮
      </section>
    </BaseDialog>
-->
<template>
  <section class="dialog-wrap" v-show="showMask" @click.self="showMask = false">
    <div class="dialog-container" :style="defaultSty">
        <div class="dialog-title">{{title}}<i class="el-icon-close dialog-right" @click="showMask = false"></i></div>
        <slot></slot>
        <slot name="footer"></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    isshow: {
      type: Boolean
    },
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String
    },
    height: {
      type: String
    }
  },
  computed: {
    defaultSty () {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  watch: {
    isshow (val) {
      this.showMask = val
    },
    showMask (val) {
      this.$emit('update:isshow', val)
    }
  },
  data () {
    return {
      showMask: false
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: center;
  .dialog-container {
    overflow: hidden;
    min-height: 100px;
    background: #ffffff;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    border-radius: 5px;
    // transform: translate(-50%, -50%);
    position: relative;
    animation: action_translateY 0.5s forwards ease-out;
    @keyframes action_translateY {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    .dialog-title {
      width: 100%;
      height: 50px;
      font-size: 16px;
      color: $txtTitleDig;
      border-bottom: 1px solid #E4E7ED;
      padding: 0 0 0 30px;
      line-height: 50px;
      box-sizing: border-box;
      // background: $digTitleMain;
      .dialog-right:hover{
        animation: rotate1 0.5s linear;
      }
      @keyframes rotate1
      {
        from {
        transform:rotate(0deg);
        -ms-transform:rotate(0deg);
        -moz-transform:roate(0deg);
        -webkit-transform:rotate(0deg);
        -o-transform:rotate(0deg);
        }
        to {
        transform:rotate(180deg);
        -ms-transform:rotate(180deg);
        -moz-transform:rotate(180deg);
        -webkit-transform:rotate(180deg);
        -o-transform:rotate(180deg);
        }
      }
      .dialog-right{
        float: right;
        line-height: 50px;
        margin-right: 17px;
        font-size: 20px;

      }
    }
    .footer {
      text-align: center;
      width: 100%;
      height: 60px;
      // line-height: 60px;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0 16px;
      box-sizing: border-box;
    }
    .el-button--small {
      width: 98px;
      height: 32px;
    }
  }
}
</style>
