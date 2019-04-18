<template>
  <div class="main">
    <canvas id="myCanvas"></canvas>
    <el-card shadow="never" class="login-body">
      <div slot="title">
        <h1>保中宝核心业务管理系统</h1>
      </div>
      <el-form :model="formData" ref="formData" :rules="Rule.LOGIN" label-position="top" status-icon>
        <el-form-item label="">
          <h1 class="login-title">保中宝核心业务管理系统</h1>
        </el-form-item>
        <el-form-item label="" prop="c_code">
          <el-input v-model="formData.c_code" size="lagre" auto-complete="on" placeholder="企业编号"></el-input>
        </el-form-item>
        <el-form-item label="" prop="u_name">
          <el-input v-model="formData.u_name"  size="lagre" auto-complete="on" placeholder="登录账号"></el-input>
        </el-form-item>
        <el-form-item label="" prop="u_password">
          <el-input v-model="formData.u_password" type="password" auto-complete="on" size="lagre" placeholder="登录密码" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item label="" class="tc">
          <el-button type="primary" class="login-btn" size="lagre" @click="login" @keyup.enter.native="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Http from '@/tools/http'
import Cookie from 'js-cookie'
import Session from '@/mixin/session'

export default {
  mixins: [Session],
  data () {
    return {
      formData: {}
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.getStorage()
    },
    async login () {
      let vm = this
      this.$refs.formData.validate(async valid => {
        if (valid) {
          let ret = await Http.send('login', vm.formData)
          if (ret && ret.status_code === 0) {
            vm.setStorage()
            let expiresDate = new Date(new Date().getTime() + 7200 * 1000)
            Cookie.set('token', ret.result.token, { expires: expiresDate })
            Cookie.set('user', ret.result.userinfo, { expires: expiresDate })
            await this.getSession()
            this.$router.push({name: '首页'})
          }
        }
      })
    },

    setStorage () {
      if (window.localStorage) {
        delete this.formData.u_password
        let str = JSON.stringify(this.formData)
        str = this.strEncrypt(str)
        localStorage.setItem('login', str)
      }
    },

    getStorage () {
      if (window.localStorage) {
        if (localStorage.getItem('login')) {
          let obj = {}
          try {
            obj = JSON.parse(this.strDecrypt(localStorage.getItem('login')))
          } catch (e) {
            obj = {}
          }
          this.formData = obj
        }
      }
    },

    /**
     * 加密
     */
    strEncrypt (str) {
      var c = String.fromCharCode(str.charCodeAt(0) + str.length)
      for (var i = 1; i < str.length; i++) {
        c += String.fromCharCode(str.charCodeAt(i) + str.charCodeAt(i - 1))
      }
      return encodeURIComponent(c)
    },

    /**
     * 解密
     */
    strDecrypt (str) {
      str = decodeURIComponent(str)
      var c = String.fromCharCode(str.charCodeAt(0) - str.length)
      for (var i = 1; i < str.length; i++) {
        c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i - 1))
      }
      return c
    }
  }
}
</script>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/images/login_bg.png');
  background-size: 100% 100%;
  position: relative;
}
.login-body {
  width: 476px;
  position: absolute;
  left: calc(50% - 238px);
  top: calc(50% - 204px);
  padding: 20px;
}

.login-title {
  font-size: 24px;
  text-align: center;
}

.login-btn {
  width: 213px;
}

.tc {
  text-align: center
}

.el-form-item >>> .el-input {
  width: 475px !important;
}
</style>
