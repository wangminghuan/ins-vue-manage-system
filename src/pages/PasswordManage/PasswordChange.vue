<!--
  修改密码
  password 代表 passwordChange
-->
<template>
  <div class="passwordChange-wrap">
    <section class="header-title">修改密码</section>
    <div class="mb30"></div>
    <el-form ref="ruleForm" status-icon :model="ruleForm" :rules="rules2" class="password-center" label-width="100px">
      <el-form-item label="当前密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"  ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpassword">
        <el-input type="password" v-model="ruleForm.newpassword"  ></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="verifypassword">
        <el-input type="password" v-model="ruleForm.verifypassword"  ></el-input>
      </el-form-item>
    </el-form>
    <el-button type="success" class="password-btn" @click="handleSave('ruleForm')" v-has="'UPDATE_ACCOUNT_PASSWORD'">保存</el-button>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.verifypassword !== '') {
          this.$refs.ruleForm.validateField('verifypassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newpassword) {
        callback(new Error('两次输入新密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        password: '',
        newpassword: '',
        verifypassword: ''
      },
      rules2: {
        password: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newpassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        verifypassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击保存
    async handleSave (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.ruleForm.u_name = JSON.parse(Cookie.get('user')).u_name
          let res = await this.$axios.send('UPDATE_ACCOUNT_PASSWORD', this.ruleForm)
          if (res.status_code === 0) {
            this.$message({
              message: '密码修改成功！',
              type: 'success'
            })
            this.$refs[formName].resetFields()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.passwordChange-wrap{
  .password-btn{
    margin:0 0 20px 100px;
  }
}
</style>
