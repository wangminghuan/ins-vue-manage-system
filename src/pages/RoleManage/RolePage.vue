<!--
  角色管理
  role 代表 rolePage
-->
<template>
  <div class="rolePage-wrap">
    <section class="header-title">角色管理</section>
    <div class="mb30"></div>
    <section class="common-padding" style="padding-bottom:20px;">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" class="elButtonSearch" @click="handleAdd('ruleForm')" v-has="'ROLE_MANAGE_ADD'">新增</el-button>
          <el-button type="danger" :disabled="!isDisabled" @click="handleDelect" v-has="'ROLE_MANAGE_DELETE'">删除</el-button>
        </el-col>
      </el-row>
    </section>
    <!-- table开始 -->
    <section class="common-padding" style="padding-bottom:20px;">
      <el-table
        :data="tableData3"
        border style="width: 100%;text-align: center;"
        highlight-current-row
        @current-change="handleSelectTable">
        <el-table-column fixed label="选择" width="90">
          <template slot-scope="scope">
              <el-radio v-model="scope.row.selected" :label="true">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="date" label="序号">
          <template slot-scope="scope">{{(scope.$index+(currentPage-1)*10)+1}}</template>
        </el-table-column> -->
        <el-table-column  prop="r_name" label="角色名称"></el-table-column>
        <el-table-column prop="is_agents" label="用户信息" ></el-table-column>
        <el-table-column prop="is_permission" label="权限" ></el-table-column>
      </el-table>
      <div class="footer-page">
        <div class="common-paging">
          <el-pagination
            v-if="sumtotal"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="sumtotal">
          </el-pagination>
        </div>
      </div>
    </section>
    <!-- 弹框 -->
    <BaseDialog :title="dialogSet.title" :isshow.sync="dialogSet.sendDialog" width="379px" height="300px">
      <section class="dialog-center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="角色名称" prop="r_name">
                <el-input v-model="ruleForm.r_name"  class="input-width"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <section slot="footer" class="footer">
        <el-button type="primary" @click="dialogSave('ruleForm')">保 存</el-button>
        <el-button  @click="dialogSet.sendDialog = false" >取 消</el-button>
      </section>
    </BaseDialog>
  </div>
</template>

<script>
import BaseDialog from '@/components/base/BaseDialog'
export default {
  components: {
    BaseDialog
  },
  data () {
    return {
      dialogSet: {title: '新增角色', sendDialog: false},
      listId: {},
      isDisabled: false,
      currentPage: 1,
      sumtotal: '',
      ruleForm: {
        r_name: ''
      },
      objnum: {
        page: 1
      },
      rules: {
        r_name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      tableData3: []
    }
  },
  methods: {
    // 新增
    handleAdd (formName) {
      this.$refs[formName].resetFields()
      this.dialogSet.sendDialog = true
    },
    // 删除
    handleDelect () {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await this.$axios.send('ROLE_MANAGE_DELETE', '', {id: this.listId.r_id})
        if (res.status_code === 0) {
          if (this.tableData3.length - 1 === 0) { this.objnum.page = this.currentPage - 1 }
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
    // 弹框点击保存
    async dialogSave (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$axios.send('ROLE_MANAGE_ADD', this.ruleForm)
          if (res.status_code === 0) {
            this.getData()
            this.$message({
              type: 'success',
              message: `操作成功`
            })
            this.dialogSet.sendDialog = false
          }
        } else {
          return false
        }
      })
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
    // 分页点击事件
    handleCurrentChange (obj) {
      this.currentPage = obj
      this.objnum.page = this.currentPage
      this.getData()
    },
    // 获取数据
    async getData () {
      let res = await this.$axios.send('SELECT_ROLE_LIST', this.objnum)
      if (res.status_code === 0) {
        this.tableData3 = res.result.data
        this.sumtotal = res.result.total
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
  .dialog-center{
    margin-top:65px;
  }
</style>
