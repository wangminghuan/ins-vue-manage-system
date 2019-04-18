<!-- 个人业绩统计
    persion 代表 StatisticalPersionResult
 -->
<template>
  <div class="statisticalPersionResult">
    <section class="header-title">佣金查询</section>
    <section class="static-head common-padding">
      <el-form :model="ruleForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构选择">
              <el-select v-model="ruleForm.o_id" filterable :loading="loading" :remote-method="remoteMethod" >
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
            <el-form-item label="组织名称">
              <el-input v-model="ruleForm.t_name"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="当前职级">
              <select-job-grade v-model="ruleForm.jg_id"></select-job-grade>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="代理人工号">
              <el-input v-model="ruleForm.ag_job_number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理人姓名">
              <el-input v-model="ruleForm.ag_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="薪酬月份">
              <el-date-picker
                placeholder="选择月份"
                value-format="yyyy-MM"
                v-model="ruleForm.a_p_time"
                :picker-options="disablePickerOptions"
                type="month"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任职状态">
              <el-select v-model="ruleForm.ag_status" placeholder="">
                <el-option v-for="item in Dict.PERSON_AGENT_STATUS" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="">
              <el-button type="primary" v-has="'COMMISSION_MANAGE_LIST'" @click="query(1)">查询</el-button>
              <el-button type="success" v-has="'COMMISSION_MANAGE_EXPORT'" @click="handleExcel">导出</el-button>
              <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <!-- table -->
    <section class="static-table common-padding">
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
        <el-table-column prop="date" label="序号">
          <template slot-scope="scope">{{(scope.$index+(pageNumber.valuecurrentPage-1)*10)+1}}</template>
        </el-table-column>
        <el-table-column label="机构名称" min-width="100" prop="o_name"></el-table-column>
        <el-table-column label="组织名称" min-width="100" prop="t_name"></el-table-column>
        <el-table-column label="代理人工号" min-width="120" prop="ag_job_number"></el-table-column>
        <el-table-column label="代理人姓名" min-width="120" prop="ag_name"></el-table-column>
        <el-table-column label="当前职级"  min-width="120" prop="jg_name"></el-table-column>
        <el-table-column label="任职状态" prop="ag_status" >
          <template slot-scope="scope">
            {{scope.row.ag_status|dict('PERSON_AGENT_STATUS')}}
          </template>
        </el-table-column>
        <el-table-column label="薪酬月份" prop="a_p_time" ></el-table-column>
        <el-table-column label="税前合计" prop="a_p_money_before_commission" ></el-table-column>
        <el-table-column label="缴纳增值税基数" prop="a_p_VAT_base" ></el-table-column>
        <el-table-column label="增值税" prop="a_p_VAT" ></el-table-column>
        <el-table-column label="城建税" prop="a_p_construction_tax" ></el-table-column>
        <el-table-column label="教育附加税" prop="a_p_surtax_education" ></el-table-column>
        <el-table-column label="地方教育附加税" prop="a_p_surtax_local_education" ></el-table-column>
        <el-table-column label="增值税附加合计" prop="a_p_VAT_surtax_total" ></el-table-column>
        <el-table-column label="应税所得" prop="a_p_PIT_base" ></el-table-column>
        <el-table-column label="个税基数">
          <template slot-scope="scope">
            <span v-if="scope.row">800</span>
          </template>
        </el-table-column>
        <el-table-column label="所得税" prop="a_p_PIT" ></el-table-column>
        <el-table-column label="税后实发" prop="a_p_money_after_commission" ></el-table-column>
        <el-table-column label="详情" prop="a_p_money_after_commission" >
          <template slot-scope="scope">
            <span style="color:#6797EC;cursor:pointer" @click="detail(scope.row.a_p_id)">详情</span>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!-- 分页 -->
    <section class="footer-page">
      <section class="common-paging">
        <el-pagination
          v-if="pageNumber.sumtotal"
          @current-change="handleCurrentChange"
          :current-page="pageNumber.currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="pageNumber.sumtotal">
        </el-pagination>
      </section>
    </section>

    <base-dialog title="薪资查看"  :isshow.sync="dialog.detail" width="400px">
      <el-form :model="detailList" class="dialog-center" label-suffix="：">
        <el-form-item class="p100" label="初始年度佣金">{{detailList.a_p_d_first_commission}}</el-form-item>
        <el-form-item class="p100" label="服务津贴">{{detailList.a_p_d_service_allowance}}</el-form-item>
        <el-form-item class="p100" label="续期佣金">{{detailList.a_p_d_renewal_commission}}</el-form-item>
        <el-form-item class="p100" label="推荐奖金">{{detailList.a_p_d_commended}}</el-form-item>
        <el-form-item class="p100" label="管理佣金">{{detailList.a_p_d_management_allowance}}</el-form-item>
        <el-form-item class="p100" label="育成奖金">{{detailList.a_p_d_breed_bonus}}</el-form-item>
        <el-form-item class="p100" label="总计">{{detailList.a_p_d_total}}</el-form-item>
      </el-form>
    </base-dialog>
  </div>
</template>

<script>
import Common from '@/tools/common'
import SelectJobGrade from '@/components/select/SelectJobGrade'
import BaseDialog from '@/components/base/BaseDialog'
import moment from 'moment'
import query from '@/mixin/query'

export default {
  mixins: [query],
  components: {
    SelectJobGrade,
    BaseDialog
  },
  data () {
    return {
      ruleForm: {
        a_p_time: moment().format('YYYY-MM')
      },
      options: [],
      loading: false,
      tableData: [],
      search_ag_ids: [],
      pageNumber: {
        valuecurrentPage: 1,
        currentPage: 1,
        sumtotal: ''
      },
      dialog: {
        detail: false
      },
      detailList: {}
    }
  },
  methods: {

    async query () {
      this.search_ag_ids = []
      this.handleSearch(1)
    },
    // 查询
    async handleSearch (page = 1) {
      this.ruleForm.page = page
      let res = await this.$axios.send('COMMISSION_MANAGE_LIST', this.ruleForm)
      if (res.status_code === 0) {
        this.tableData = res.result.data
        this.pageNumber.sumtotal = res.result.total
        this.pageNumber.valuecurrentPage = page
        this.toggleSelection(this.search_ag_ids[page])
      }
    },

    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          let index
          for (let i = 0; i < this.tableData.length; i++) {
            if (row.a_p_id === this.tableData[i].a_p_id) {
              index = i
            }
          }

          let form = this.$refs.multipleTable
          let data = this.tableData
          setTimeout(function () {
            form.toggleRowSelection(data[index], true)
          }, 0)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },

    async detail (id) {
      let data = {
        a_p_id: id
      }
      let ret = await this.$axios.send('COMMISSION_MANAGE_DETAIL', data)
      if (ret && ret.status_code === 0) {
        this.detailList = ret.result
        this.dialog.detail = true
      }
    },
    // 导出
    async handleExcel () {
      let ids = []
      if (this.search_ag_ids.length > 1) {
        for (let i = 0; i < this.search_ag_ids.length; i++) {
          let pageSelect = this.search_ag_ids[i]
          if (pageSelect && Array.isArray(pageSelect)) {
            for (let j = 0; j < pageSelect.length; j++) {
              ids.push(pageSelect[j].a_p_id)
            }
          }
        }
      }
      let form = Common.clone(this.ruleForm)
      form.a_p_ids = ids
      delete form.page
      let config = {
        headers: {'Content-Type': 'multipart/form-data'},
        responseType: 'blob'
      }
      let ret = await this.$axios.post('/payroll/export', form, config)
      Common.downloadFile(ret, '薪资查询.xlsx')
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange (selected) {
      this.search_ag_ids[this.pageNumber.currentPage] = selected
    },
    // 分页点击事件
    handleCurrentChange (obj) {
      this.pageNumber.currentPage = obj
      this.ruleForm.page = this.pageNumber.currentPage
      this.handleSearch(obj)
    },
    // 下拉刷选
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
      }
    },
    // 机构列表
    async getReqData () {
      let res = await this.$axios.send('SELECT_ORGANI_LIST', {o_name: '', o_g_id: '', o_status: ''})
      if (res.status_code === 0) {
        let title, id
        res.result.map(item => {
          title = item.o_name
          id = item.o_id
          this.options.push({'value': id, 'label': title})
        })
      }
    },

    reset () {
      this.ruleForm = {
        a_p_time: moment().format('YYYY-MM')
      }
    }
  },
  created () {
    this.getReqData()
  }
}
</script>

<style lang="scss" scoped>
.statisticalPersionResult{
  .static-head{
    width: 100%;
    margin-top: 30px;
  }
}

.p100 {
  padding-left: 100px;
}

.dialog-center {
  padding-top: 20px;
  padding-bottom: 20px;
}

.dialog-center /deep/ .el-form-item {
  margin-bottom: 3px !important;
}
</style>
