<!--
  离司审批
  resign 代替 ResignApproval
-->
<template>
  <div class="resignApproval">
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
            <el-button type="primary" @click="handleSearch" v-has="'AGENT_BATCH_RESIGN_LIST'">查询</el-button>
            <el-button type="warning" :disabled="isDisabled" @click="handleEdit" v-has="'AGENT_MANAGE_ENTRY'">审批</el-button>
            <el-button type="info" @click="handleReset" v-has="'AGENT_BATCH_RESIGN_LIST'">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- table start -->
    <div class="common-padding">
      <el-table
        :data="tableData"
        border style="width: 100%;text-align: center;"
        highlight-current-row
        @current-change="handleSelectTable">
        <el-table-column label="选择" prop="name" width="90" fixed>
            <template slot-scope="scope">
              <el-radio v-model="scope.row.selected" :label="true">&nbsp;</el-radio>
            </template>
        </el-table-column>
        <el-table-column label="工号" prop="ag_job_number"></el-table-column>
        <el-table-column label="姓名" prop="ag_name"></el-table-column>
        <el-table-column label="人员代码" prop="ag_code"></el-table-column>
        <el-table-column min-width="120" label="所属机构" prop="o_name"></el-table-column>
        <el-table-column min-width="120" label="所属组织名称" prop="t_name"></el-table-column>
        <el-table-column label="职级" prop="jg_name"></el-table-column>
        <el-table-column label="推荐人" prop="ref_name"></el-table-column>
        <el-table-column label="主管姓名" prop="ag_leader"></el-table-column>
        <el-table-column label="申请时间" prop="created_at"></el-table-column>
        <el-table-column label="离司原因" prop="st_reason">
        <template slot-scope="scope">
            <span>{{getReason(scope.row.st_reason)}}</span>
        </template>
        </el-table-column>
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
    <BaseDialog :title="dialogSet.title" :isshow.sync="dialogSet.sendDialog" width="541px" height="auto">
      <section class="dialog-center">
        <el-form :model="ruleForm" ref="ruleForm" label-width="47px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="" class="clear-marginbottom">
                <span>待审批员工信息</span>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-form-item label="" class="clear-marginbottom">
                <span>姓名：{{listId.ag_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="" class="clear-marginbottom">
                <span>工号：{{listId.ag_job_number}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-form-item label="" class="clear-marginbottom">
                <span>职级：{{listId.jg_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="" class="clear-marginbottom">
                <span>所属组织：{{listId.t_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-form-item label="" class="clear-marginbottom">
                <span>推荐人：{{listId.ref_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="" class="clear-marginbottom">
                <span>申请时间：{{listId.created_at}}</span>
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
      <section slot="footer" class="footerName" v-if="isShowBtn">
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
      ruleForm: {st_status_type: 1, audit_remark: ''},
      dialogSet: {title: '审批', sendDialog: false},
      searchTime: [],
      listId: {},
      currentPage: 1,
      isDisabled: true,
      sumTotal: '',
      options: [],
      stReason: [
        {
          value: '1',
          label: '个人原因'
        },
        {
          value: '2',
          label: '考核不通过'
        },
        {
          value: '3',
          label: '开除'
        },
        {
          value: '4',
          label: '其他'
        }
      ],
      searchData: {
        st_status_type: 1,
        created_at_start: '',
        created_at_end: '',
        ag_name: '',
        ag_job_number: '',
        st_status: '',
        t_id: '',
        page: 1
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
  methods: {
    // 重置
    handleReset () {
      this.searchData = {
        st_status_type: 1,
        created_at_start: '',
        created_at_end: '',
        ag_name: '',
        ag_job_number: '',
        st_status: '',
        t_id: ''
      }
      this.searchTime = []
    },
    // 获取离司原因
    getReason (obj) {
      let objParsed = JSON.parse(obj)
      let num
      if (objParsed.reason) {
        return objParsed.reason
      } else {
        this.stReason.map(item => {
          if (Number(objParsed.type) === Number(item.value)) {
            num = item.label
          }
        })
        return num
      }
    },
    // 审批
    handleEdit () {
      this.ruleForm.audit_remark = this.listId.audit_remark
      if (this.listId.st_status === '审批通过' || this.listId.st_status === '审批驳回') {
        let cent = this.listId.st_status
        this.dialogSet.sendDialog = false
        this.$message({
          type: 'error',
          message: `${cent}不能再审批`
        })
      } else {
        this.dialogSet.sendDialog = true
      }
      // this.dialogSet.sendDialog = true
    },
    // 弹框提交
    async dialogSave (num) {
      this.ruleForm.st_status = num
      let id = this.listId.st_id
      let res = await this.$axios.send('AGENT_MANAGE_ENTRY', this.ruleForm, {id: id})
      if (Number(res.status_code) === 0) {
        let msg = res.message
        this.tableData.map(rex => {
          if (this.listId.st_id === rex.st_id) {
            rex.audit_remark = this.ruleForm.audit_remark
            if (Number(num) === 1) { // 审批通过
              rex.st_status = '审批通过'
            } else {
              rex.st_status = '审核驳回'
            }
          }
        })
        this.getData()
        this.$message({
          type: 'success',
          message: `${msg}`
        })
        this.dialogSet.sendDialog = false
      }
    },
    async getData () {
      this.isDisabled = true
      if (this.searchTime instanceof Array && this.searchTime.length > 0) {
        this.searchData.created_at_start = this.searchTime[0]
        this.searchData.created_at_end = this.searchTime[1]
      } else {
        this.searchData.created_at_start = ''
        this.searchData.created_at_end = ''
      };
      let res = await this.$axios.send('AGENT_BATCH_RESIGN_LIST', this.searchData)
      if (res.status_code === 0) {
        this.tableData = res.result.data
        this.sumTotal = res.result.total
      }
    },
    // 请求列表数据
    async handleSearch () {
      this.currentPage = 1
      this.searchData.page = 1
      this.getData()
    },
    // 选择table
    handleSelectTable (currentRow, oldCurrentRow) {
      if (currentRow) {
        currentRow.selected = true
        this.listId = currentRow
        this.isDisabled = false
      }
      if (oldCurrentRow) {
        oldCurrentRow.selected = false
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
.resignApproval{
  .textarea-input{
    display: inline-block;
    width:323px;
    height: 120px;
    margin-left: 10px;
  }
  .dialog-center{
    margin-top:20px;
    margin-bottom: 20px;
  }
  .clear-marginbottom {
    margin-bottom: 10px !important
  }
  .textarea-input textarea{
    width:323px;
    height: 120px;
    resize: none;
  }
  .footerName{
    margin-bottom: 20px;
    text-align: center;
  }
}
</style>
