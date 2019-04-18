<!-- 组织业绩统计
    organi 代表 statisticalOrganizationResult
 -->
<template>
  <div class="statisticalOrganizationResult">
    <section class="header-title">组织业绩统计</section>
    <section class="static-head common-padding">
      <el-form :model="ruleForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构选择">
              <el-select v-model="ruleForm.search_oid" filterable :loading="loading" :remote-method="remoteMethod" >
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
              <el-input v-model="ruleForm.search_t_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组织代码">
              <el-input v-model="ruleForm.search_t_code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="统计周期">
              <el-date-picker
                placeholder="选择月份"
                value-format="yyyy-MM-dd"
                v-model="ruleForm.dateRange"
                :picker-options="pickerOptions2"
                type="daterange"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="">
              <el-button type="primary" v-has="'TEAM_KPI'" @click="handleSearch(ruleForm)">查询</el-button>
              <el-button type="success" v-has="'TEAM_EXPORT'" @click="handleExil">导出</el-button>
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
        <el-table-column label="组织代码" min-width="100" prop="t_code"></el-table-column>
        <el-table-column label="组织名称" min-width="120" prop="t_name"></el-table-column>
        <el-table-column label="承保件数" min-width="120" prop="policy_count"></el-table-column>
        <el-table-column label="规模保费" prop="policy_premium"></el-table-column>
        <el-table-column label="标准保费" prop="standard_premium"></el-table-column>
        <el-table-column label="新增人力" prop="new_count"></el-table-column>
        <el-table-column label="有效人力" prop="valid_count"></el-table-column>
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
  </div>
</template>

<script>
import Common from '@/tools/common'

export default {
  data () {
    let timeout
    return {
      ruleForm: {},
      options: [],
      search_t_ids: [],
      loading: false,
      tableData: [],
      pageNumber: {
        valuecurrentPage: 1,
        currentPage: 1,
        sumtotal: ''
      },
      pickerOptions2: {
        disabledDate (time) {
          if (timeout) {
            let startYear = timeout.getFullYear() - 1
            let endYear = timeout.getFullYear() + 1
            let enddate = endYear + '-' + (timeout.getMonth() + 1) + '-' + timeout.getDate()
            let startdate = startYear + '-' + (timeout.getMonth() + 1) + '-' + timeout.getDate()
            let endDate = new Date(enddate)
            let startDate = new Date(startdate)
            return time.getTime() > endDate || time.getTime() < startDate
          }
        },
        onPick ({maxDate, minDate}) {
          timeout = minDate
        },
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
      }
    }
  },
  methods: {
    // 查询
    handleSearch () {
      this.getData()
    },
    // 导出
    async handleExil () {
      let form = Common.clone(this.ruleForm)
      if (form.dateRange && form.dateRange.length === 2) {
        form.search_time_start = form.dateRange[0]
        form.search_time_end = form.dateRange[1]
      } else {
        form.search_time_start = ''
        form.search_time_end = ''
      }

      if (this.search_t_ids.length > 0) {
        form.search_t_ids = this.search_t_ids.join(',')
      }

      delete form.dateRange
      delete form.page

      let config = {
        headers: {'Content-Type': 'multipart/form-data'},
        responseType: 'blob'
      }
      let ret = await this.$axios.post('/exportTeamPerformance', form, config)
      Common.downloadFile(ret, '组织业绩统计结果.xlsx')
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange (selected) {
      let arr = []
      for (let i = 0; i < selected.length; i++) {
        arr.push(selected[i].t_id)
      }

      this.search_t_ids = arr
    },
    // 分页点击事件
    handleCurrentChange (obj) {
      this.pageNumber.currentPage = obj
      this.ruleForm.page = this.pageNumber.currentPage
      this.getData()
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
    async getData () {
      if (this.ruleForm.dateRange && this.ruleForm.dateRange.length === 2) {
        this.ruleForm.search_time_start = this.ruleForm.dateRange[0]
        this.ruleForm.search_time_end = this.ruleForm.dateRange[1]
      } else {
        this.ruleForm.search_time_start = ''
        this.ruleForm.search_time_end = ''
      }

      this.ruleForm.page = this.pageNumber.currentPage
      let res = await this.$axios.send('TEAM_KPI', this.ruleForm)
      if (res.status_code === 0) {
        this.tableData = res.result.listData.data
        this.pageNumber.sumtotal = res.result.listData.total
        this.pageNumber.valuecurrentPage = this.pageNumber.currentPage
      }
    }
  },
  created () {
    this.getReqData()
  }
}
</script>

<style lang="scss" scoped>
.statisticalOrganizationResult{
  .static-head{
    width: 100%;
    margin-top: 30px;
  }
}
</style>
