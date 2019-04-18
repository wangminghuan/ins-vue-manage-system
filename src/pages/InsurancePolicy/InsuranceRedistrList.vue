<template>
  <div>
    <section class="header-title">{{$route.name}}</section>
    <div class="mb30"></div>
    <el-form :model="searchData" label-width="120px" class="common-padding">
      <el-row>
        <el-col :span="8">
          <el-form-item label="起止日期">
            <el-date-picker
              v-model="searchData.dateRange"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分配类型">
            <el-select v-model="searchData.search_type" clearable >
              <el-option v-for="dict in Dict.ASSIGN_TYPE" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保单号">
            <el-input v-model="searchData.search_bd_code" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分配后代理人">
            <el-input v-model="searchData.search_new_ag" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分配前代理人">
            <el-input v-model="searchData.search_old_ag" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-button v-has="'BD_REDISTR_SAVE'" type="primary" @click="query(1)">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-col :span="24">
        <div class="common-padding">
        <el-table :data="tableData.data" highlight-current-row border @current-change="tableItemSelect">
          <el-table-column min-width="240" label="保险公司" prop="c_name"></el-table-column>
          <el-table-column min-width="180" label="保单号" prop="bd_code">
          </el-table-column>
          <el-table-column min-width="180" label="机构名称" prop="o_name"></el-table-column>
          <el-table-column min-width="80" label="分配前代理人" prop="pre_ag_name"></el-table-column>
          <el-table-column min-width="80" label="分配后代理人" prop="new_ag_name"></el-table-column>
          <el-table-column min-width="80" label="分配类型" prop="reassign_type">
            <template slot-scope="scope">
              {{scope.row.reassign_type|dict('ASSIGN_TYPE')}}
            </template>
          </el-table-column>
          <el-table-column min-width="60"  label="分配轨迹" prop="o_name">
            <template slot-scope="scope">
              <a href="javascript:void(0)" class="alink" @click="queryLog(scope.row)">{{scope.row.log_num}}</a>
            </template>
          </el-table-column>
          <el-table-column min-width="80" label="保单状态" prop="tb_status">
            <template slot-scope="scope">
              {{scope.row.tb_status|dict('TB_STATUS')}}
            </template>
          </el-table-column>
          <el-table-column min-width="240" label="再分配时间" prop="reassign_time"></el-table-column>
          <el-table-column min-width="120" label="投保日期" prop="tb_date"></el-table-column>
          <el-table-column min-width="120" label="承保日期" prop="bd_time"></el-table-column>
        </el-table>
        </div>
      </el-col>
      <el-col :span="24" class="common-paging tr" >
        <div class="footer-page">
          <div class="common-paging" v-if="tableData.total > 0">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="tableData.current_page"
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="tableData.total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>

    <base-dialog title="分配轨迹"  :isshow.sync="dialog.track" width="600px">
      <section class="dialog-center log" v-if="currtSelected">
        <el-row class="mb20">
          <el-col :span="12">
            <label for="">保单号</label>: {{currtSelected.bd_code}}
          </el-col>
          <el-col :span="12">
            <label>保单状态:</label> {{currtSelected.tb_status|dict('TB_STATUS')}}
          </el-col>
        </el-row>
        <el-row class="mb20" v-for="(item, index) in currtSelected.track" :key="item.it_id">
          <el-col class="mb20" :span="24">第 {{index + 1}} 次分配：{{item.it_time}}</el-col>
          <el-col :span="11" :offset="1">{{item.pre_ag_name}} 分配给 {{item.after_ag_name}}</el-col>
          <el-col :span="12"> 续期佣金收益比例：{{item.it_rate}} %</el-col>
        </el-row>
      </section>
    </base-dialog>
  </div>
</template>

<script>
import query from '@/mixin/query'
import BaseDialog from '@/components/base/BaseDialog'
import Common from '@/tools/common'

export default {
  name: 'InsuranceRedistrList',
  mixins: [query],
  components: {
    BaseDialog
  },
  data () {
    return {
      searchData: {
        search_status: '',
        dateRange: []
      },
      tableData: {
        data: [],
        total: 0,
        current_page: 1,
        perPage: 10
      },
      dialog: {
        track: false
      },
      currtSelected: null
    }
  },

  methods: {
    async query (page) {
      let params = Common.clone(this.searchData)
      params.perPage = 10
      params.page = page
      if (this.searchData.dateRange && this.searchData.dateRange.length > 0) {
        params.search_start_time = this.searchData.dateRange[0]
        params.search_end_time = this.searchData.dateRange[1]
      }
      delete params.dateRange
      let ret = await this.$axios.send('BD_REASSIGN_LIST', params)
      if (ret && ret.status_code === 0) {
        this.tableData = ret.result.listData
      }
    },

    async queryLog (item) {
      this.currtSelected = item
      let ret = await this.$axios.send('BD_REASSIGN_TRACK', {s_id: item.s_id})
      if (ret && ret.status_code === 0) {
        this.currtSelected.track = ret.result
        this.dialog.track = true
      }
    }
  }
}
</script>

<style scoped>
  .log {
    padding: 40px 30px 50px 40px;
    height: 600px;
    overflow: auto;
  }

  .el-form-item /deep/ .el-form-item__content {
    line-height: 0
  }

</style>
