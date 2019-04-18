<!--
  迁移审批
  migate 代替 MigateApproval
-->
<template>
  <div class="migateApproval">
    <section class="header-title">{{$route.name}}</section>
    <div class="mb30"></div>
    <el-form :model="searchData" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="searchData.ag_name" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工号">
            <el-input v-model="searchData.ag_job_number" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="审批状态">
            <el-select v-model="searchData.mv_status" >
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
            <el-button type="primary" @click="handleSearch" v-has="'AGENT_MANAGE_LIST'">查询</el-button>
            <el-button type="warning" :disabled="isDisabled" v-has="'AGENT_MANAGE_MIGRATION'" @click="handleEdit">审批</el-button>
            <el-button type="info" @click="handleReset" v-has="'AGENT_MANAGE_LIST'">重置</el-button>
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
      <el-table-column min-width="120" label="迁出机构" prop="pre_o_name"></el-table-column>
      <el-table-column min-width="120" label="迁出组织" prop="pre_t_name"></el-table-column>
      <el-table-column min-width="120" label="迁出前职级" prop="pre_jg_name"></el-table-column>
      <el-table-column min-width="120" label="迁入机构" prop="after_o_name"></el-table-column>
      <el-table-column min-width="120" label="迁入组织" prop="after_t_name"></el-table-column>
      <el-table-column min-width="120" label="迁入后职级" prop="after_jg_name"></el-table-column>
      <el-table-column label="申请时间" prop="created_at"></el-table-column>
      <el-table-column label="申请人" prop="create_u_name"></el-table-column>
      <el-table-column label="审批状态" prop="mv_status"></el-table-column>
      <el-table-column label="审批时间" prop="audit_time"></el-table-column>
      <el-table-column label="审批人" prop="audit_u_name"></el-table-column>
      <el-table-column min-width="120" label="审批人机构" prop="audit_o_name"></el-table-column>
      <el-table-column label="审批备注" prop="mv_audit_remark"></el-table-column>
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
    <BaseDialog :title="dialogSet.title" :isshow.sync="dialogSet.sendDialog" width="670px" height="auto">
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
                <span>迁出机构：{{listId.pre_o_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="" class="clear-marginbottom">
                <span>迁出组织：{{listId.pre_t_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-form-item label="" class="clear-marginbottom">
                <span>迁入机构：{{listId.after_o_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="" class="clear-marginbottom">
                <span>迁入组织：{{listId.after_t_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-form-item label="" class="clear-marginbottom">
                <span>迁出前职级：{{listId.pre_jg_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="" class="clear-marginbottom">
                <span>迁出后职级：{{listId.after_jg_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-form-item label="" class="clear-marginbottom">
                <span>申请人：{{listId.create_u_name}}</span>
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
                <el-input type="textarea" :maxlength="20" v-model="ruleForm.mv_audit_remark" class="textarea-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <section slot="footer" class="footerDia" v-if="isShowBtn">
        <el-button type="primary" @click="dialogSave('1')" style="margin-right:10px;">审批通过</el-button>
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
      ruleForm: {mv_audit_remark: ''},
      isShowBtn: true,
      dialogSet: {title: '审批', sendDialog: false},
      searchData: {
        ag_job_number: '',
        ag_name: '',
        mv_status: '',
        created_at_start: '',
        created_at_end: '',
        page: 1
      },
      isDisabled: true,
      listId: {},
      searchTime: [],
      currentPage: 1,
      sumTotal: '',
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
    async getData () {
      this.isDisabled = true
      if (this.searchTime instanceof Array && this.searchTime.length > 0) {
        this.searchData.created_at_start = this.searchTime[0]
        this.searchData.created_at_end = this.searchTime[1]
      } else {
        this.searchData.created_at_start = ''
        this.searchData.created_at_end = ''
      };
      let res = await this.$axios.send('AGENT_MANAGE_LIST', this.searchData)
      if (res.status_code === 0) {
        this.tableData = res.result.data
        this.sumTotal = res.result.total
      }
    },
    // 查询
    async handleSearch () {
      this.currentPage = 1
      this.searchData.page = 1
      this.getData()
    },
    // 审批
    handleEdit () {
      this.ruleForm.mv_audit_remark = this.listId.mv_audit_remark || ''
      if (this.listId.mv_status === '审批通过' || this.listId.mv_status === '审批驳回') {
        let cent = this.listId.mv_status
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
    // 重置
    handleReset () {
      this.searchData = {
        ag_job_number: '',
        ag_name: '',
        mv_status: '',
        created_at_start: '',
        created_at_end: '',
        page: 1
      }
      this.searchTime = []
    },
    // 弹框提交
    async dialogSave (num) {
      this.ruleForm.mv_status = num
      let id = this.listId.mv_id
      let res = await this.$axios.send('AGENT_MANAGE_MIGRATION', this.ruleForm, {$mv_id: id})
      if (Number(res.status_code) === 0) {
        let msg = res.message
        this.tableData.map(rex => {
          if (this.listId.ag_id === rex.ag_id) {
            rex.mv_audit_remark = this.ruleForm.mv_audit_remark
            if (Number(num) === 1) { // 审批通过
              rex.mv_status = '审批通过'
            } else {
              rex.mv_status = '审核驳回'
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
    // 分页点击事件
    handleCurrentChange (obj) {
      this.currentPage = obj
      this.searchData.page = this.currentPage
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
    }
  }
}
</script>

<style lang="scss">
.migateApproval{
  .dialog-center{
    margin-top:20px;
    margin-bottom: 20px;
  }
  .clear-marginbottom{
    margin-bottom: 10px !important;
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
  .dialogfooter{
    text-align: center;
    width: 100%;
    height: 60px;
    margin-top: 20px;
  }
  .footerDia{
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
