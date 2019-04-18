<template>
  <div class="base-menu" :style="{'height': sideBarHeight}">
    <div class="base-logo">
      <a href="javascript:;">
        <img src="../../assets/images/logo.png" alt="logo">
        <h1>保中宝业务管理系统</h1>
      </a>
    </div>
    <div class="inner-sidebar" ref="menuContain" :style="{'max-height': innerBarHeight}">
    <div  data-aaa="123">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        background-color="#03192E"
        text-color="#8C95BE"
        router
        unique-opened
        active-text-color="#fff">
        <template v-for="level1 in getSumMenu(0)">
          <!-- 如果一级菜单有子菜单 -->
          <template v-if="hasChild(level1.id)">
            <el-submenu :index="level1.name" :key="level1.id">
              <template slot="title">
                <i :class="[level1.icon,'com-menu-icon']"></i>
                <span>{{level1.name}}</span>
              </template>
              <el-menu-item :index="level2.id+''" :route="level2.href || level2.path" v-for="level2 in getSumMenu(level1.id)" :key="level2.id" class="actiegray">{{level2.name}}</el-menu-item>
            </el-submenu>
          </template>
          <!-- 如果一级菜单没有一级菜单 -->
          <template v-else>
            <el-menu-item :index="level1.id+''" class="menu-item-line-height" :route="level1.path" :key="level1.id">
              <template slot="title">
                <i :class="[level1.icon,'com-menu-icon']"></i>
                <span>{{level1.name}}</span>
              </template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
    </div>
    <div class="menu-fix">客服电话 : 0371-88865188</div>
  </div>
</template>
<script>
import defaultMenu from '@/config/menu'
import Global from '@/config/global'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

export default {
  data () {
    return {
      defaultMenu: defaultMenu,
      defaultActive: '',
      sideBarHeight: '100%',
      innerBarHeight: '100%'
    }
  },

  created () {
    this.init()
  },

  methods: {
    init () {
      this.active()
    },

    getSumMenu (pid) {
      return this.defaultMenu.filter(item => item.isMenu && item.pid === pid && Global.ACTION_MARKERS.includes(item.marker))
    },

    hasChild (pid) {
      return !!this.getSumMenu(pid).length
    },

    active (menuId) {
      let id = menuId || this.$route.meta.id
      if (this.$route.meta.active) {
        id = this.$route.meta.active
      }
      let item = this.defaultMenu.filter(item => parseInt(item.id) === parseInt(id))
      item = item[0]

      if (item && item.isMenu) {
        this.defaultActive = item.id + ''
      } else {
        this.defaultActive = item.meta.active + ''
      }
    },

    setSideBarHeight () {
      let clientHeight = 0
      clientHeight = document.documentElement.clientHeight
      this.sideBarHeight = clientHeight + 'px'
      this.innerBarHeight = clientHeight - 150 + 'px'
    }
  },

  computed: {
    level1Menus () {
      return this.defaultMenu.filter(item => item.pid === 0 && Global.ACTION_MARKERS.includes(item.marker))
    }
  },

  watch: {
    '$route' () {
      this.active()
    }
  },

  mounted () {
    this.setSideBarHeight()
    new PerfectScrollbar(this.$refs.menuContain) // eslint-disable-line
    window.addEventListener('resize', () => {
      this.setSideBarHeight()
    })
  },

  destroyed () {
    window.removeEventListener('resize', this.setSideBarHeight())
  }
}
</script>

<style lang="scss" scoped>
.actiegray{
  background: #000c17 !important;
}
li .is-active{
  background: #1890ff !important;
}
.base-menu {
  // min-height: 100vh;
  // background: #43455B;
  position: relative;
  .base-logo {
    height: 60px;
    position: relative;
    line-height: 60px;
    padding-left: 24px;
    transition: all 0.3s;
    // background: $pghead;
    background: #002140;
    overflow: hidden;
    img {
      display: inline-block;
      vertical-align: middle;
      height: 41px;
    }
    h1 {
      color: #fff;
      font-size: 20px;
      margin: 0 0 0 12px;
      font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .inner-sidebar{
    position: absolute;
    left: 0;
    top: 60px;
    width: 280px;
    height: 100%;
    overflow-y: scroll;
    // overflow: hidden;
  }
  .inner-sidebar::-webkit-scrollbar{
    width: 0px;
    height: 0px;
  }
  .inner-sidebar::-moz-scrollbar{
    width: 0px;
    height: 0px;
  }
   .inner-sidebar::-ms-scrollbar{
    width: 0px;
    height: 0px;
  }
  .inner-sidebar::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: #fff;
  }
  .inner-sidebar::-webkit-scrollbar-track {/*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: #fff;
  }
  .inner-sidebar::-moz-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: #fff;
  }
  .inner-sidebar::-moz-scrollbar-track {/*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: #fff;
  }
  .com-menu-icon{
    width: 15px;
    height: 15px;
  }
  .el-icon-1{
    background: url("../../assets/images/menu/menu_icon1.png") no-repeat;
  }
  .el-icon-2{
    background: url("../../assets/images/menu/menu_icon2.png") no-repeat;
  }
  .el-icon-3{
    background: url("../../assets/images/menu/menu_icon3.png") no-repeat;
  }
  .el-icon-4{
    background: url("../../assets/images/menu/menu_icon4.png") no-repeat;
  }
  .el-icon-5{
    background: url("../../assets/images/menu/menu_icon5.png") no-repeat;
  }
  .el-icon-6{
    background: url("../../assets/images/menu/menu_icon6.png") no-repeat;
  }
  .el-icon-7{
    background: url("../../assets/images/menu/menu_icon7.png") no-repeat;
  }
  .el-icon-8{
    background: url("../../assets/images/menu/menu_icon8.png") no-repeat;
  }
  .el-icon-9{
    background: url("../../assets/images/menu/menu_icon9.png") no-repeat;
  }
  .el-icon-10{
    background: url("../../assets/images/menu/menu_icon10.png") no-repeat;
  }
  .el-icon-11{
    background: url("../../assets/images/menu/menu_icon11.png") no-repeat;
  }
  .menu-fix{
    position: absolute;
    bottom: 50px;
    right: 0;
    color: #B7BEDC;
    font-size: 16px;
    margin:50px 0 0px 0;
    width:100%;
    text-align: center;
  }
}
.el-menu {
  border-right: none;
}

.menu-item-line-height {
  line-height: 56px;
}
</style>
