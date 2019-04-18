
<!--
  保费统计
  static 代表 StatisticalReport
-->
<template>
  <div class="statisticalReport-wrap">
    <section class="header-title">保费统计</section>
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
            <el-form-item label="保险公司">
              <el-select v-model="ruleForm.search_cid" >
                <el-option
                  v-for="item in Baoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保险产品">
              <el-select v-model="ruleForm.search_pid" >
                <el-option
                  v-for="item in productOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24"></el-col>
          <el-col :span="8">
            <el-form-item label="承保日期">
              <el-date-picker
                class="picker-width"
                v-model="ruleForm.time"
                type="daterange"
                :picker-options="pickerOptions2"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="">
              <el-radio-group v-model="ruleForm.search_type" @change="change">
                <el-radio :label="1" border>日报表</el-radio>
                <el-radio :label="2" border>周报表</el-radio>
                <el-radio :label="3" border>月报表</el-radio>
                <el-radio :label="4" border>季报表</el-radio>
                <el-radio :label="5" border>年报表</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="">
              <el-button type="primary" class="elButtonSearch" @click="handleSearch(search)" v-has="'REPORT_MANAGE_LIST'">查询</el-button>
              <el-button type="success" @click="handleExil" v-has="'EXPORT_MANAGE_LIST'">导出</el-button>
              <a id="export" href=""></a> &nbsp;
              <el-button type="info" @click="handleReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <!-- table开始 -->
    <section class="static-table common-padding">
      <el-table
        :data="tableData3"
        border style="width: 100%;text-align: center"
        >
        <el-table-column  prop="o_name" label="出单机构"></el-table-column>
        <el-table-column prop="p_name" label="产品名称" ></el-table-column>
        <el-table-column prop="bd_code" label="保单号" ></el-table-column>
        <el-table-column prop="sp_premium" label="保费"></el-table-column>
        <el-table-column prop="sp_standard" label="标准保费" ></el-table-column>
        <el-table-column prop="c_name" label="保险公司" ></el-table-column>
        <el-table-column prop="bd_time" label="承保日期"></el-table-column>
      </el-table>
    </section>
    <!-- 分页 -->
    <section class="footer-page">
      <span class="common-pageFont" v-if="sumtotal"><span v-if="totalData.premium">保费共计{{totalData.premium}}元,</span> <span v-if="totalData.standard">标准保费{{totalData.standard}}元,</span> <span v-if="totalData.policy">保单{{totalData.policy}}件。</span></span>
      <section class="common-paging">
        <el-pagination
          v-if="sumtotal"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="sumtotal">
        </el-pagination>
      </section>
    </section>
  </div>
</template>

<script>
import Common from '@/tools/common'
export default {
  name: 'StatisticalReportList',
  data () {
    return {
      ruleForm: {
        time: '',
        search_oid: '',
        search_cid: '',
        search_pid: '',
        search_type: '',
        search_time_start: '',
        search_time_end: '',
        page: 1
      },
      search: {},
      loading: false,
      currentPage: 1,
      options: [],
      font: '',
      Baoptions: [],
      productOptions: [],
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
      tableData3: [],
      sumtotal: '',
      totalData: {}
    }
  },
  computed: {
    searchCid () {
      return this.ruleForm.search_cid
    }
  },
  watch: {
    searchCid (val) {
      this.ruleForm.search_pid = ''
      this.getTalData(val)
    }
  },
  methods: {
    // 处理参数时间
    handleTime (time) {
      let self = this
      if (time instanceof Array) {
        this.ruleForm.search_time_start = self.$moment(time[0]).format('YYYY-MM-DD')
        this.ruleForm.search_time_end = self.$moment(time[1]).format('YYYY-MM-DD')
      } else {
        this.ruleForm.search_time_start = ''
        this.ruleForm.search_time_end = ''
      }
    },
    async getData () {
      this.handleTime(this.ruleForm.time)
      let res = await this.$axios.send('REPORT_MANAGE_LIST', this.ruleForm)
      if (res.status_code === 0) {
        this.tableData3 = res.result.listData.data
        this.sumtotal = res.result.listData.total
        this.totalData = res.result.totalData
      }
    },
    // 查询
    async handleSearch () {
      this.currentPage = 1
      this.ruleForm.page = 1
      this.getData()
    },
    // 导出
    async handleExil () {
      this.handleTime(this.ruleForm.time)
      let data = await this.$axios.post('/exportReport', this.ruleForm, {responseType: 'blob'})
      Common.downloadFile(data, '报表统计.xlsx')
    },
    // 重置
    handleReset () {
      this.ruleForm = {
        time: '',
        search_oid: '',
        search_cid: '',
        search_pid: '',
        search_type: '',
        search_time_start: '',
        search_time_end: ''
      }
    },
    // 下拉刷选
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
      }
    },
    // 分页点击事件
    handleCurrentChange (obj) {
      this.currentPage = obj
      this.ruleForm.page = this.currentPage
      this.getData()
    },
    change (val) {
      let num = Number(val)
      switch (num) {
        case 1:
          let nowDate = Common.getStartDate(this)
          let name1 = nowDate.split('-')
          this.ruleForm.time = [new Date(name1[0], name1[1] - 1, name1[2]), new Date(name1[0], name1[1] - 1, name1[2])]
          break
        case 2:
          let time1 = Common.getStartWeek(this)
          let time2 = time1[0].split('-')
          let time3 = time1[1].split('-')
          this.ruleForm.time = [new Date(time2[0], time2[1] - 1, time2[2]), new Date(time3[0], time3[1] - 1, time3[2])]
          break
        case 3:
          let name2 = Common.getStartMonth(this)
          this.ruleForm.time = [new Date(name2[0], name2[1] - 1, name2[2]), new Date(name2[0], name2[1] - 1, name2[3])]
          break
        case 4:
          let name3 = Common.getStartSeason(this)
          this.ruleForm.time = [new Date(name3[0], name3[1] - 3, name3[2]), new Date(name3[0], name3[1] - 1, name3[3])]
          break
        case 5:
          let name4 = Common.getStartYears(this)
          this.ruleForm.time = [new Date(name4[0], 0, 1), new Date(name4[0], 11, 31)]
          break
        default:
          this.ruleForm.time = ''
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
    // 公司列表
    async getSelectData () {
      let res = await this.$axios.send('SELECT_COMPANY_LIST')
      if (res.status_code === 0) {
        let title, id
        res.result.map(item => {
          title = item.c_name
          id = item.c_id
          this.Baoptions.push({'value': id, 'label': title})
        })
      }
    },
    // 保险产品列表
    async getTalData (val) {
      this.productOptions = []
      let res = await this.$axios.send('SELECT_PRODUCT_LIST', {search_cid: val || ''})
      if (res.status_code === 0) {
        let title, id
        res.result.map(item => {
          title = item.p_name
          id = item.p_id
          this.productOptions.push({'value': id, 'label': title})
        })
      }
    }
  },
  created () {
    this.getReqData()
    this.getSelectData()
    this.getTalData()
  }
}
</script>

<style lang="scss">
.statisticalReport-wrap{
  width: 100%;
  .picker-width{
    width: 290px;
  }
  .static-head{
    width: 100%;
    margin-top: 30px;
    .static-top{
      width: 100%;
      margin-top:20px;
    }
  }
  .static-table{
    margin-top:20px;
  }
}
</style>
