<template>
  <el-container>
    <el-aside width="280px" class="base-menu">
      <base-menu></base-menu>
    </el-aside>
    <el-container>
      <el-header height="64px" class="padding-0" style="padding:0;">
        <base-header></base-header>
      </el-header>
      <el-main id="main" class="container-main">
        <div :style="bodyHeight">
          <el-card class="box-card">
            <transition name="move" mode="out-in">
              <keep-alive :include="/[a-zA-z]+List/" :max="2">
                <router-view :key="$route.fullPath"></router-view>
              </keep-alive>
            </transition>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import BaseMenu from '@/components/base/BaseMenu'
import BaseHeader from '@/components/base/BaseHeader'
import BaseFooter from '@/components/base/BaseFooter'

export default {
  components: {
    BaseMenu,
    BaseHeader,
    BaseFooter
  },

  data () {
    return {
      bodyHeight: {}
    }
  },

  mounted () {
    let height = document.getElementById('main').offsetHeight - 40 - 100
    this.bodyHeight = {
      height: height + 'px'
    }
  },

  computed: {
    containerBody () {
      let height = document.getElementById('main').offsetHeight - 40
      return {
        height: height + 'px'
      }
    }
  }
}
</script>
<style lang="scss">
  .el-container{
    background: #F5F5F5;
  }
  .container-main {
    position: absolute;
    left: 280px;
    right: 0;
    top: 60px;
    bottom:0;
    width: auto;
    padding:20px 40px !important;
    box-sizing: border-box;
    overflow-y: scroll;
    background: $bg;
    min-width:1110px;
  }
  .container-main::-webkit-scrollbar {/*滚动条整体样式*/
      width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 0px;
  }
  .container-main::-moz-scrollbar {/*滚动条整体样式*/
      width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 0px;
  }
  .container-main::-ms-scrollbar {/*滚动条整体样式*/
      width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 0px;
  }
  .container-main::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.2);
  }
  .container-main::-webkit-scrollbar-track {/*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);
  }
  .base-menu {
    background: #03192E;
    overflow: hidden;
  }
  .base-menu::-webkit-scrollbar {/*滚动条整体样式*/
      width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 0px;
  }
  .base-menu::-moz-scrollbar {/*滚动条整体样式*/
      width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 0px;
  }
  // .base-menu::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  //     border-radius: 5px;
  //     box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  //     background: rgba(0,0,0,0.2);
  // }
  // .base-menu::-webkit-scrollbar-track {/*滚动条里面轨道*/
  //     box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  //     border-radius: 0;
  //     background: rgba(0,0,0,0.1);
  // }
</style>
