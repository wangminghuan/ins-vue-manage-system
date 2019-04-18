<!--
  用户管理
  类名：userPage
-->
<template>
  <div class="userPage-wrap">
    <section class="header-title">用户管理</section>
    <div class="mb30"></div>
    <el-form :model="search" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户角色">
            <el-select v-model="search.role_id" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户名称">
            <el-input v-model="search.u_name" class=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户状态">
            <el-select v-model="search.u_status" >
              <el-option
                v-for="item in Dict.USER_STATUS"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <div class="pageIncrem-height"></div>
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary" size="medium" @click="handleSearch" v-has="'USER_MANAGE_LIST'">查询</el-button>
            <el-button type="primary" size="medium" class="elButtonSearch" @click="addDialog('ruleForm')" v-has="'USER_MANAGE_ADD'">新增</el-button>
            <el-button type="warning" size="medium" :disabled="!isDisabled" @click="handleUpData" v-has="'USER_MANAGE_EDIT'">修改</el-button>
            <el-button type="danger" size="medium" :disabled="!isDisabled" @click="handelDelete" v-has="'USER_MANAGE_DELETE'">删除</el-button>
            <el-button type="info" size="medium" @click="handleReset" v-has="'USER_MANAGE_LIST'">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- table开始 -->
    <section class="common-padding">
      <el-table
        :data="tableData3"
        border style="width: 100%;text-align: center"
        highlight-current-row
        @current-change="handleSelectTable"
        >
         <el-table-column fixed label="选择" width="90">
          <template slot-scope="scope">
              <el-radio v-model="scope.row.selected" :label="true">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="序号">
          <template slot-scope="scope">{{(scope.$index+(pageNumber.valuecurrentPage-1)*10)+1}}</template>
        </el-table-column>
        <el-table-column  prop="u_name" label="用户名称"></el-table-column>
        <el-table-column prop="r_name" label="用户角色" ></el-table-column>
        <el-table-column prop="u_phone" label="手机号码" ></el-table-column>
        <el-table-column prop="u_email" label="邮箱" ></el-table-column>
        <el-table-column label="用户状态" >
          <template slot-scope="scope">
            <span>{{scope.row.u_status|dict('USER_STATUS')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!-- 分页 -->
    <section class="footer-page">
      <div class="common-paging">
        <el-pagination
          v-if="sumTotal"
          @current-change="handleCurrentChange"
          :current-page="pageNumber.currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="sumTotal">
        </el-pagination>
      </div>
    </section>
    <!-- 弹框 -->
    <BaseDialog :title="dialogSet.title" :isshow.sync="dialogSet.sendDialog" width="537px" height="729px">
      <section class="dialog-center">
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="190px" class="demo-ruleForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="所属机构" prop="o_id" class="userPage-dialog">
                <el-select v-model="ruleForm.o_id">
                    <el-option
                      v-for="item in insOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="用户角色" prop="role_id" class="userPage-dialog">
                <el-select v-model="ruleForm.role_id"  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="用户名称" prop="u_name" class="userPage-dialog">
                <el-input v-model="ruleForm.u_name" :disabled="disabled" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="登录密码" prop="password" class="userPage-dialog">
                <el-input type="password" v-model="ruleForm.password" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="确认密码" prop="verifypassword" class="userPage-dialog">
                <el-input type="password" :offset="1" v-model="ruleForm.verifypassword" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="手机号码" prop="u_phone" class="userPage-dialog">
                <el-input v-model="ruleForm.u_phone" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="电子邮箱" prop="u_email" class="userPage-dialog">
                <el-input v-model="ruleForm.u_email" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="用户状态" prop="u_status" class="userPage-dialog">
                <el-select v-model="ruleForm.u_status"  >
                  <el-option
                    v-for="item in Dict.USER_STATUS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <section slot="footer" class="footer">
        <el-button @click="dialogSave('ruleForm')" type="success">保 存</el-button>
        <el-button @click="dialogSet.sendDialog = false" >取 消</el-button>
      </section>
    </BaseDialog>
  </div>
</template>

<script>
import BaseDialog from '@/components/base/BaseDialog'
import Validator from '@/config/validator'
export default {
  components: {
    BaseDialog
  },
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
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入新密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        o_id: '',
        o_code: '',
        role_id: '',
        u_name: '',
        password: '',
        verifypassword: '',
        u_phone: '',
        u_email: '',
        u_status: ''
      },
      rules: {
        o_id: [
          { required: true, message: '请选择所属机构', trigger: 'change' }
        ],
        role_id: [
          { required: true, message: '请选择用户角色', trigger: 'change' }
        ],
        u_name: [
          { required: true, message: '请填写用户名称', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        verifypassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        u_phone: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          { validator: Validator.phone, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        u_email: [
          { required: true, type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        u_status: [
          { required: true, message: '请选择用户状态', trigger: 'change' }
        ]
      },
      search: {
        u_name: '',
        role_id: '',
        u_status: '',
        page: 1
      },
      pageNumber: {
        valuecurrentPage: 1,
        currentPage: 1
      },
      isDisabled: false,
      dialogSet: {'title': '新增用户', 'sendDialog': false},
      listId: {},
      options: [],
      mark: Number,
      insOptions: [],
      tableData3: [],
      sumTotal: '',
      organiList: {},
      disabled: false
    }
  },
  methods: {
    async getData () {
      let res = await this.$axios.send('USER_MANAGE_LIST', this.search)
      if (res.status_code === 0) {
        this.isDisabled = false
        this.tableData3 = res.result.data
        this.sumTotal = res.result.total
        this.pageNumber.valuecurrentPage = this.pageNumber.currentPage
      }
    },
    // 重置
    handleReset () {
      this.search = {
        u_name: '',
        role_id: '',
        u_status: ''
      }
    },
    // 查询
    async handleSearch () {
      this.search.page = 1
      this.pageNumber.currentPage = 1
      this.getData()
    },
    // 点击新增
    addDialog (formName) {
      this.$refs[formName].resetFields()
      this.dialogSet.sendDialog = true
      this.dialogSet.title = '新增用户'
      this.mark = 1
      this.disabled = false
    },
    // 编辑
    async handleUpData () {
      this.dialogSet.sendDialog = true
      this.dialogSet.title = '修改用户'
      this.ruleForm.o_id = this.listId.o_id
      this.ruleForm.role_id = this.listId.role_id
      this.ruleForm.u_name = this.listId.u_name
      this.ruleForm.u_phone = this.listId.u_phone
      this.ruleForm.u_email = this.listId.u_email
      this.ruleForm.u_status = this.listId.u_status
      // this.listId.password = ''
      // this.listId.verifypassword = ''
      // this.ruleForm = this.listId
      this.$refs.ruleForm.clearValidate('password')
      this.$refs.ruleForm.clearValidate('verifypassword')
      this.ruleForm.password = ''
      this.ruleForm.verifypassword = ''
      this.mark = 2
      this.disabled = true
    },
    // 删除
    handelDelete () {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await this.$axios.send('USER_MANAGE_DELETE', '', {id: this.listId.u_id})
        if (res.status_code === 0) {
          if (this.tableData3.length - 1 === 0) { this.search.page = this.pageNumber.currentPage - 1 }
          this.getData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.isDisabled = false
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加
    ruleformAdd () {
      this.organiList.map(res => {
        if (this.ruleForm.o_id === res.o_id) {
          this.ruleForm.o_code = res.o_code
        }
      })
    },
    // 弹框点击保存
    async dialogSave (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res
          this.ruleformAdd()
          if (this.mark === 1) { // 新增
            res = await this.$axios.send('USER_MANAGE_ADD', this.ruleForm)
          } else {
            res = await this.$axios.send('USER_MANAGE_EDIT', this.ruleForm, {id: this.listId.u_id})
          }
          if (res.status_code === 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getData()
            this.dialogSet.sendDialog = false
          }
        } else {
          return false
        }
      })
    },
    // 分页点击事件
    handleCurrentChange (obj) {
      this.pageNumber.currentPage = obj
      this.search.page = this.pageNumber.currentPage
      this.getData()
    },
    // 选择table
    handleSelectTable (currentRow, oldCurrentRow) {
      if (currentRow) {
        currentRow.selected = true
        this.listId = currentRow
        this.isDisabled = true
      }
      if (oldCurrentRow) {
        oldCurrentRow.selected = false
      }
    },
    // 获取用户角色select
    async getReqData () {
      let res = await this.$axios.send('SELECT_ROLE_LIST')
      if (res.status_code === 0) {
        let title, id
        let options = []
        res.result.map(item => {
          title = item.r_name
          id = item.r_id
          options.push({'value': id, 'label': title})
        })

        this.options = options
      }
    },
    // 获取机构列表select
    async getInsReqData () {
      let res = await this.$axios.send('SELECT_ORGANI_LIST', {o_name: '', o_g_id: '', o_status: ''})
      if (res.status_code === 0) {
        this.organiList = res.result
        let title, id
        res.result.map(item => {
          title = item.o_name
          id = item.o_id
          this.insOptions.push({'value': id, 'label': title})
        })
      }
    }
  },
  created () {
    this.getReqData()
    this.getInsReqData()
  },

  activated () {
    this.getReqData()
  }
}
</script>

<style lang="scss" scoped>
.userPage-wrap {
  width: 100%;
  .dialog-center{
    margin-top: 36px;
    .input-marginleft{
      margin-left: 30px;
    }
    .userPage-dialog{
      margin-bottom: 22px;
    }
  }
}
</style>
