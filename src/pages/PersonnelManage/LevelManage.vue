<!--
  职级管理
  level 代替 levelManage
-->
<template>
  <div class="levelManage">
    <section class="header-title">{{$route.name}}</section>
    <div class="mb30"></div>
    <div class="common-padding">
      <el-form :model="searchData">
        <el-row>
          <el-col :span="24">
            <el-form-item label="">
              <el-button type="primary" @click="handleAdd('ruleForm')" v-has="'AGENT_LEVEL_ADD'">新增</el-button>
              <el-button type="warning" :disabled="!isDisabled" @click="handleEditor('ruleForm')" v-has="'AGENT_LEVEL_UPDATE'">修改</el-button>
              <el-button type="danger" :disabled="!isDisabled" @click="handleDelect" v-has="'AGENT_LEVEL_DELETE'">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- table start -->
    <div class="common-padding" style="padding-bottom:20px;">
      <el-table
        :data="tableData"
        border style="width: 100%;text-align: center"
        highlight-current-row
        @current-change="handleSelectTable">
        <el-table-column label="选择" width="100">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.selected" :label="true">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="职位等级" prop="j_g_grade"></el-table-column>
        <el-table-column label="职级名称" prop="j_g_name"></el-table-column>
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
    </div>
    <!-- 弹框 -->
    <BaseDialog :title="dialogSet.title" :isshow.sync="dialogSet.sendDialog" width="342px" height="284px">
      <section class="dialog-center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="职级等级">
                <span ref="j_g_gradename">{{tableLength}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="职级名称" prop="j_g_name">
                <el-input v-model="ruleForm.j_g_name" class="input-width"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <section slot="footer" class="footer">
        <el-button type="primary" @click="dialogSave('ruleForm')">提 交</el-button>
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
      tableLength: Number,
      mark: Number,
      dialogSet: {title: '', sendDialog: false},
      searchData: {},
      levelNum: '',
      isDisabled: false,
      listId: {},
      currentPage: 1,
      sumtotal: '',
      objnum: {
        page: 1
      },
      ruleForm: {
        j_g_grade: '',
        j_g_name: ''
      },
      rules: {
        j_g_name: [
          { required: true, message: '请填写机构类型', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  methods: {
    // 新增
    handleAdd (formName) {
      this.$refs[formName].resetFields()
      this.tableLength = Number(this.levelNum) + 1
      // this.$refs.j_g_gradename.innerHTML = this.tableLength
      this.dialogSet.sendDialog = true
      this.dialogSet.title = '新增职级'
      this.mark = 1
    },
    // 修改
    handleEditor (formName) {
      this.$refs[formName].resetFields()
      this.mark = 2
      this.dialogSet.title = '修改职级'
      this.dialogSet.sendDialog = true
      // this.$refs.j_g_gradename.innerHTML = this.listId.j_g_grade
      this.tableLength = this.listId.j_g_grade
      this.ruleForm.j_g_name = this.listId.j_g_name
    },
    // 删除
    async handleDelect () {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await this.$axios.send('AGENT_LEVEL_DELETE', '', {$id: this.listId.j_g_id})
        if (res.status_code === 0) {
          // this.tableData.splice(this.listId.j_g_grade%10-1, 1)
          if (this.tableData.length - 1 === 0) { this.objnum.page = this.currentPage - 1 }
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
    // 弹框提交
    dialogSave (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.ruleForm.j_g_grade = this.$refs.j_g_gradename.innerHTML
          let res
          if (this.mark === 1) { // 新增
            res = await this.$axios.send('AGENT_LEVEL_ADD', this.ruleForm)
          } else { // 修改
            res = await this.$axios.send('AGENT_LEVEL_UPDATE', {j_g_name: this.ruleForm.j_g_name}, {$id: this.listId.j_g_id})
          }
          if (res.status_code === 0) {
            const _this = this
            setTimeout(() => {
              let megFont
              if (_this.mark === 1) {
                this.getData()
                this.isDisabled = false
                megFont = '提交成功'
              } else {
                this.tableData.map(rex => {
                  if (rex.j_g_id === this.listId.j_g_id) {
                    rex.j_g_name = this.ruleForm.j_g_name
                  }
                })
                megFont = '修改成功'
              }
              _this.$message({
                type: 'success',
                message: `${megFont}`
              })
              this.dialogSet.sendDialog = false
            }, 500)
          }
        } else {
          return false
        }
      })
    },
    // 分页点击事件
    handleCurrentChange (obj) {
      this.currentPage = obj
      this.objnum.page = this.currentPage
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
    getNumberMax (ary) {
      let num = []
      ary.map(item => {
        num.push(item.j_g_grade)
      })
      function sortNumber (a, b) {
        return a - b
      }
      if (this.sumtotal > 10) {
        this.levelNum = this.sumtotal
      } else {
        this.levelNum = num.sort(sortNumber).reverse()[0] || 0
      }
    },
    async getData () {
      let res = await this.$axios.send('SELECT_AGENT_LEVEL_LIST', this.objnum)
      if (res.status_code === 0) {
        this.tableData = res.result.data
        this.sumtotal = res.result.total
        this.getNumberMax(this.tableData)
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="scss">
.levelManage{
  .dialog-center{
    margin-top:30px;
    width:100%;
  }
}
</style>
