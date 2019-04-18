<template>
  <div class="base-header">
    <div class="right">
      <el-dropdown trigger="hover" @command="handerCommand">
        <div class="el-dropdown-link">
          <span></span>
          <i></i>
          <h1 v-html="headData.headName"></h1>
        </div>
        <el-dropdown-menu slot="dropdown" style="margin:0 20px 0 0;">
          <el-dropdown-item command="password">修改密码</el-dropdown-item>
          <el-dropdown-item command="exit">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <i class="exit-icon"></i>
      <em v-html="headData.headExit"></em> -->
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  data () {
    return {
      headData: {
        headName: '保中宝',
        headExit: '安全退出'
      }
    }
  },
  created () {
    if (Cookie.get('user')) {
      let user = JSON.parse(Cookie.get('user'))
      this.headData.headName = user.u_name
    }
  },
  methods: {
    handerCommand (key) {
      if (key === 'exit') {
        this.logout()
      } else {
        this.$router.push('/app/PasswordManage')
      }
    },
    logout () {
      Cookie.remove('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.base-header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  .right {
    display: flex;
    align-items: center;
    float: right;
    height: 64px;
    span {
      color: $txtFontName;
      vertical-align:middle;
      display:inline-block;
      box-sizing:border-box;
      // font-size: 14px;
      border:1px solid $txtFontName;
      height: 20px;
      width: 1px;
    }
    h1 {
      // color: $txtFontName;
      color: #508CF8;
      font-size: 16px;
      display: inline-block;
      margin-right: 89px;
    }
    i {
      display: inline-block;
      font-size: 24px;
      color: #fff;
      background: url(../../assets/images/people1.png) no-repeat;
      background-size: 100%;
      width: 17px;
      height: 20px;
      vertical-align:middle;
      margin:0 15px 0 22px;
    }
    em {
      font-size: 14px;
      color: $txtFontMain;
      margin: 0 40px 0 10px;
      font-weight: 400;
      cursor: pointer;
    }
  }

}
.el-dropdown-menu{
  // padding:5px;
  li{
    // padding:5px;
  }
  li:nth-child(1){
    border-bottom: 1px solid #E4E7ED;
  }
}
</style>
