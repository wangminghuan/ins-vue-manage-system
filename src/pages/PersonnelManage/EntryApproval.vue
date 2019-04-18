<!--
  入司审批
  entry代替 EntryApproval
-->
<template>
  <div class="entryApproval">
    <section class="header-title">{{$route.name}}</section>
    <div class="mb30"></div>
    <el-form :model="searchData" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="searchData.ag_name"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工号">
            <el-input v-model="searchData.ag_job_number"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="审批状态">
            <el-select v-model="searchData.st_status"  >
              <el-option
                v-for="item in Dict.PERSON_ENTRY_STATUS"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24"></el-col>
        <el-col :span="8">
          <el-form-item label="所属组织">
            <el-select v-model="searchData.t_id"  >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="申请时间">
            <el-date-picker
              v-model="searchTime"
              type="daterange"
              :picker-options="pickerOptions2"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary" @click="handleSearch" v-has="'AGENT_BATCH_Entry_LIST'">查询</el-button>
            <el-button type="warning" :disabled="isDisabled" @click="handleApproval" v-has="'AGENT_MANAGE_BATCH'">审批</el-button>
            <el-button type="info" @click="handleReset" v-has="'AGENT_BATCH_Entry_LIST'">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- table start -->
    <div class="common-padding">
    <el-table
      :data="tableData"
      border style="width: 100%;text-align: center;"
      ref="multipleTable"
      height="500"
      @selection-change="handleSelectionChange">
       <el-table-column
        fixed
        type="selection"
        width="80"
        label="全选"
        >
      </el-table-column>
      <el-table-column label="工号" min-width="130" prop="ag_job_number"></el-table-column>
      <el-table-column label="姓名" min-width="100" prop="ag_name"></el-table-column>
      <el-table-column label="人员代码" min-width="100" prop="ag_code"></el-table-column>
      <el-table-column label="所属机构" min-width="120" prop="o_name"></el-table-column>
      <el-table-column label="所属组织名称" min-width="120" prop="t_name"></el-table-column>
      <el-table-column label="职级" prop="jg_name"></el-table-column>
      <el-table-column label="推荐人" prop="ref_name"></el-table-column>
      <el-table-column label="主管姓名" prop="ag_leader"></el-table-column>
      <el-table-column label="申请时间" prop="created_at"></el-table-column>
      <el-table-column label="审批状态" prop="st_status"></el-table-column>
      <el-table-column label="审批人" prop="audit_u_name"></el-table-column>
      <el-table-column label="审批时间" prop="audit_time"></el-table-column>
      <el-table-column label="审批备注" prop="audit_remark"></el-table-column>
    </el-table>
    </div>
    <!-- 分页 -->
    <section class="footer-page">
      <div class="common-paging">
        <el-pagination
          v-if="sumTotal"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="sumTotal">
        </el-pagination>
      </div>
    </section>
    <!-- 弹框 -->
    <BaseDialog :title="dialogSet.title" :isshow.sync="dialogSet.sendDialog" :width="getWidth" :height="getHeight">
      <section class="dialog-center" v-if="flag" >
        <el-form :model="ruleForm" ref="ruleForm" label-width="47px">
          <el-row v-for="(item,index) in listId" :key="index">
            <el-col :span="24">
              <el-form-item label="" class="clear-marginbottom">
                <span>待审批员工信息</span>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-form-item label="" class="clear-marginbottom">
                <span>姓名：{{item.ag_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="" class="clear-marginbottom">
                <span>工号：{{item.ag_job_number}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-form-item label="" class="clear-marginbottom">
                <span>职级：{{item.jg_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="" class="clear-marginbottom">
                <span>所属组织：{{item.t_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-form-item label="" class="clear-marginbottom">
                <span>推荐人：{{item.ref_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="" class="clear-marginbottom">
                <span>申请时间：{{item.created_at}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="1">
              <el-form-item label="" class="clear-marginbottom">
                <span style="float:left">审批备注：</span>
                <el-input type="textarea" :maxlength="20" v-model="ruleForm.audit_remark"  class="textarea-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <section class="dialogshow-center" v-else style="margin: 0 47px;">
        <el-form :model="ruleForm" ref="ruleForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="" class="clear-marginbottom">
                <span>共计{{multipleSelection.length}}名员工入司申请</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="" class="clear-marginbottom">
                <table class="dialogshow-table" border="1" cellspacing="0" style="border-collapse:collapse">
                  <tr>
                    <th>姓名</th>
                    <th>工号</th>
                  </tr>
                  <tr v-for="(item,index) in multipleSelection" :key="index">
                    <td>{{item.ag_name}}</td>
                    <td>{{item.ag_job_number}}</td>
                  </tr>
                </table>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <section slot="footer" :class="footClass" v-if="isShowBtn">
        <el-button type="primary" @click="dialogSave('1')">审批通过</el-button>
        <el-button type="danger" @click="dialogSave('2')" >审批不通过</el-button>
      </section>
    </BaseDialog>
  </div>
</template>

<script>
import getData from '@/mixin/getData'
import BaseDialog from '@/components/base/BaseDialog'
export default {
  mixins: [getData],
  components: {
    BaseDialog
  },
  data () {
    return {
      isShowBtn: true,
      ruleForm: {st_status_type: 0, audit_remark: ''},
      dialogSet: {title: '', sendDialog: false},
      searchTime: [],
      listId: [],
      options: [],
      isDisabled: true,
      multipleSelection: [],
      flag: Boolean,
      getWidth: '',
      getHeight: '',
      sumTotal: '',
      currentPage: 1,
      searchData: {
        st_status_type: 0,
        created_at_start: '',
        created_at_end: '',
        ag_name: '',
        ag_job_number: '',
        st_status: '',
        t_id: ''
      },
      searchParame: {
        o_id: '',
        t_name: '',
        t_code: '',
        t_status: '',
        t_grade: '',
        ag_name: '',
        t_pname: ''
      },
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableData: []
    }
  },
  computed: {
    footClass () {
      return this.flag ? 'footerSelect' : 'footer-margin'
    }
  },
  methods: {
    // 重置
    handleReset () {
      this.searchData = {
        st_status_type: 0,
        created_at_start: '',
        created_at_end: '',
        ag_name: '',
        ag_job_number: '',
        st_status: '',
        t_id: ''
      }
      this.searchTime = []
    },
    async getData () {
      if (this.searchTime instanceof Array && this.searchTime.length > 0) {
        this.searchData.created_at_start = this.searchTime[0]
        this.searchData.created_at_end = this.searchTime[1]
      } else {
        this.searchData.created_at_start = ''
        this.searchData.created_at_end = ''
      };

      let res = await this.$axios.send('AGENT_BATCH_Entry_LIST', this.searchData)
      if (res.status_code === 0) {
        this.tableData = res.result.data
        this.sumTotal = res.result.total
      }
    },
    // 获取列表数据
    async handleSearch () {
      this.currentPage = 1
      this.searchData.page = 1
      this.getData()
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange (val) {
      if (val.length > 0) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
      this.multipleSelection = val
      this.listId = val
    },
    // 审批
    handleApproval () {
      let ary = []
      let flag = true
      this.multipleSelection.map(item => {
        ary.push(item.st_status)
      })
      for (let i = 0; i < ary.length; i++) {
        for (let j = i + 1; j < ary.length; j++) {
          if (ary[i] !== ary[j]) {
            flag = false
            break
          }
        }
      }
      if (!flag) {
        this.dialogSet.sendDialog = false
        this.$message({
          type: 'error',
          message: `审批状态不一致`
        })
        return false
      }
      let num = this.multipleSelection.some(item => {
        return item.st_status === '审批通过'
      })
      if (num) {
        this.dialogSet.sendDialog = false
        this.$message({
          type: 'error',
          message: `审批通过不能再审批`
        })
      } else {
        this.dialogSet.sendDialog = true
      }
      if (this.multipleSelection.length >= 2) {
        this.dialogSet.title = '批量审批'
        this.getWidth = '50%'
        this.getHeight = 'auto'
        this.flag = false
      } else {
        this.ruleForm.audit_remark = this.multipleSelection[0].audit_remark
        this.dialogSet.title = '审批'
        this.getWidth = '50%'
        this.getHeight = 'auto'
        this.flag = true
      };

      // this.isShowBtn = false;
      // this.dialogSet.sendDialog = true
    },
    // 获取参数id
    getParames () {
      let numid
      let ary = []
      if (this.multipleSelection.length >= 2) {
        this.multipleSelection.map(rex => {
          ary.push(rex.st_id)
        })
        return ary
      } else {
        this.multipleSelection.map(rex => {
          numid = rex.st_id
        })
        return numid
      }
    },
    // 弹框提交
    async dialogSave (num) {
      this.ruleForm.st_status = num
      let id = this.getParames()
      let res
      if (id instanceof Array) {
        this.ruleForm.ids = id
        res = await this.$axios.send('AGENT_MANAGE_BATCH', this.ruleForm)
      } else {
        res = await this.$axios.send('AGENT_MANAGE_ENTRY', this.ruleForm, {id: id})
      }
      if (Number(res.status_code) === 0) {
        let msg = res.message
        this.tableData.map(rex => {
          this.multipleSelection.map(res => {
            if (res.st_id === rex.st_id) {
              if (!id.length > 0) {
                rex.audit_remark = this.ruleForm.audit_remark
              }
              if (Number(num) === 1) { // 审批通过
                rex.st_status = '审核通过'
              } else {
                rex.st_status = '审核驳回'
              }
            }
          })
          this.getData()
        })
        this.$message({
          type: 'success',
          message: `${msg}`
        })
        this.dialogSet.sendDialog = false
      }
    },
    // 分页点击事件
    handleCurrentChange (obj) {
      this.currentPage = obj
      this.searchData.page = this.currentPage
      this.getData()
    },
    // 请求所属组织
    async getOrganizaData () {
      let res = await this.$axios.send('TEAM_MANAGE_LIST', this.searchParame)
      if (res.status_code === 0) {
        let title, id
        res.result.map(item => {
          title = item.t_name
          id = item.t_id
          this.options.push({'value': id, 'label': title})
        })
      }
    }
  },
  created () {
    this.getOrganizaData()
  }
}
</script>

<style lang="scss">
.entryApproval{
  width: 100%;
  .clear-marginbottom{
    margin-bottom: 10px !important;
  }
  .dialog-center{
    margin-top:20px;
    margin-bottom: 20px;
  }
  .dialogshow-center{
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .footer-margin{
    margin: 30px 0;
    width: 100%;
    text-align: center;
  }
  .footerSelect{
    text-align: center;
    margin-bottom: 20px;
  }
  .textarea-input{
    display: inline-block;
    width:323px;
    height: 120px;
    margin-left: 10px;
  }
  .textarea-input textarea{
    width:323px;
    height: 120px;
    resize: none;
  }
  .dialogshow-table{
    // width: 236px;
    width: 100%;
    td, th{
      border:#ccc solid 1px;
      text-align: center;
      // width: 118px;
      width: auto;
    }
    td{
      height: 31px;
    }
    th{
      height: 41px;
    }
  }
}
</style>
