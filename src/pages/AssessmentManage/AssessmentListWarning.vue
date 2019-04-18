<!-- 产品列表 -->
<template>
  <div>
    <section class="header-title">{{$route.name}}</section>
    <div class="mb30"></div>
    <el-form :model="searchData" label-width="120px" class="common-padding">
      <el-row>
          <el-col :span="8">
            <el-form-item label="机构选择">
              <SelectChoose v-model="searchData.search_oid" placeholder=""></SelectChoose>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组织名称">
              <el-input v-model="searchData.search_t_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="考核职级">
              <select-job-grade v-model="searchData.search_jg_id"></select-job-grade>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理人工号">
              <el-input v-model="searchData.search_ag_code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理人姓名">
              <el-input v-model="searchData.search_ag_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预警月份">
              <el-date-picker
                placeholder="选择月份"
                value-format="yyyy-MM"
                v-model="searchData.search_month"
                :picker-options="disablePickerOptions"
                type="month"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="">
              <el-button type="primary"  v-has="'EXAMINE_WARN_LIST'" @click="query(1)">查询</el-button>
              <el-button type="success"  v-has="'EXAMINE_WARN_EXPORT'" @click="excel" >导出</el-button>
            </el-form-item>
          </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-col :span="24">
        <div class="common-padding">
        <el-table :data="tableData.data" highlight-current-row border >
          <el-table-column prop="o_name" label="机构名称"></el-table-column>
          <el-table-column prop="t_name" label="组织名称"></el-table-column>
          <el-table-column  prop="ag_job_number" label="代理人工号"></el-table-column>
          <el-table-column  prop="ag_name" label="代理人姓名"></el-table-column>
          <el-table-column prop="a_e_w_time" label="预警月份" ></el-table-column>
          <el-table-column prop="jg_name" label="考核职级"></el-table-column>
          <el-table-column label="当前业绩">
            <template slot-scope="scope">
              <span style="color:#6797EC;cursor:pointer" @click="detail(scope.row.a_e_w_id)">详情</span>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </el-col>
      <el-col :span="23">
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

    <base-dialog title="分配轨迹"  :isshow.sync="dialog.detail" width="600px">
      <el-table :data="detailList">
        <el-table-column label="维持条件" prop="name"></el-table-column>
        <el-table-column label="当前业绩" prop="value"></el-table-column>
        <el-table-column label="维持指标" prop="norm"></el-table-column>
        <el-table-column label="差额" prop="subtraction"></el-table-column>
        <el-table-column label="完成度" prop="is_reach">
          <template slot-scope="scope">
            <span v-if="scope.row.is_reach">完成</span>
            <span v-if="!scope.row.is_reach">未完成</span>
          </template>
        </el-table-column>
      </el-table>
    </base-dialog>
  </div>
</template>

<script>
import SelectChoose from '@/components/select/SelectChoose'
import SelectJobGrade from '@/components/select/SelectJobGrade'
import common from '@/tools/common'
import query from '@/mixin/query'
import BaseDialog from '@/components/base/BaseDialog'
import moment from 'moment'

export default {
  mixins: [query],
  components: {
    BaseDialog,
    SelectChoose,
    SelectJobGrade
  },
  data () {
    return {
      searchData: {
        search_month: moment().format('YYYY-MM')
      },
      currSelected: null,
      tableData: {
        data: [],
        total: 0,
        current_page: 1,
        perPage: 10
      },
      dialog: {
        detail: false
      },
      detailList: []
    }
  },

  methods: {
    async query (page = 1) {
      this.searchData.perPage = 10
      this.searchData.page = page
      let ret = await this.$axios.send('EXAMINE_WARN_LIST', this.searchData)
      if (ret && ret.status_code === 0) {
        this.tableData = ret.result.listData
      }
    },

    async detail (id) {
      let data = {
        id: id
      }
      let ret = await this.$axios.send('EXAMINE_WARN_DETAIL', data)
      if (ret && ret.status_code === 0) {
        this.dialog.detail = true
        this.detailList = ret.result.a_e_w_data
      }
    },

    async excel () {
      let action = '/examine/warn/export'
      let config = {
        responseType: 'blob'
      }
      let ret = await this.$axios.post(action, this.searchData, config)
      if (ret && ret.status_code === 0) {
        this.loading = false
        this.$message.success('导入成功')
      } else {
        common.downloadFile(ret, '考核预警.xlsx')
      }
    }
  }
}
</script>
