<!-- 产品列表 -->
<template>
  <div>
    <section class="header-title">{{$route.name}}</section>
    <div class="mb30"></div>
    <el-form :model="searchData" label-width="120px" class="common-padding">
      <el-row>
          <el-col :span="8">
            <el-form-item label="机构选择">
              <SelectChoose v-model="searchData.o_id" placeholder=""></SelectChoose>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组织名称">
              <el-input v-model="searchData.t_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="考核前职级">
              <el-input v-model="searchData.a_e_before_jg_name" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理人工号">
              <el-input v-model="searchData.ag_job_number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理人姓名">
              <el-input v-model="searchData.ag_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="考核月份">
              <el-date-picker
                placeholder="选择月份"
                value-format="yyyy-MM"
                v-model="searchData.a_e_time"
                :picker-options="disablePickerOptions"
                type="month"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="">
              <el-button type="primary" class="fl mr10"  v-has="'EXAMINE_RESULT_LIST'" @click="query(1)">查询</el-button>
              <el-upload class="import-btn fl mr10" action="upload" :http-request="upload" :show-file-list="false" :accept="'.xls, .xlsx'">
                <span v-has="'EXAMINE_RESULT_IMPORT'">
                  <el-button type="primary" size="medium">考核轨迹导入</el-button>
                </span>
              </el-upload>

              <a v-has="'EXAMINE_RESULT_EXPORT'" class="el-button el-button--primary el-button--medium no-underline fl"  :href="`${baseUrl}template/考核结果导入模板.xlsx`" download="考核结果导入模板.xlsx" type="primary" size="small">导入模板下载</a>
            </el-form-item>
          </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-col :span="24">
        <div class="common-padding">
        <el-table :data="tableData.data" highlight-current-row border >
          <el-table-column  prop="ag_job_number" label="代理人工号"></el-table-column>
          <el-table-column  prop="ag_name" label="代理人姓名"></el-table-column>
          <el-table-column prop="o_name" label="机构名称"></el-table-column>
          <el-table-column prop="t_name" label="组织名称"></el-table-column>
          <el-table-column prop="a_e_before_jg_name" label="考核前职级"></el-table-column>
          <el-table-column prop="a_e_after_jg_name" label="考核后职级"></el-table-column>
          <el-table-column prop="a_e_time" label="考核月份" ></el-table-column>
          <el-table-column label="考核轨迹">
            <template slot-scope="scope">
              <span style="color:#6797EC;cursor:pointer" @click="detail(scope.row)">详情</span>
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
      <el-table :data="detailList" style="padding-bottom: 50px;">
        <el-table-column label="考核日期" prop="a_e_time"></el-table-column>
        <el-table-column label="考核期职级" prop="a_e_before_jg_name"></el-table-column>
        <el-table-column label="考核后职级" prop="a_e_after_jg_name"></el-table-column>
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
        a_e_time: moment().format('YYYY-MM')
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

  created () {
    this.init()
  },

  methods: {
    init () {
      this.baseUrl = window.resourceBaseUrl
    },
    async query (page = 1) {
      this.searchData.perPage = 10
      this.searchData.page = page
      let ret = await this.$axios.send('EXAMINE_RESULT_LIST', this.searchData)
      if (ret && ret.status_code === 0) {
        this.tableData = ret.result
      }
    },

    async detail (row) {
      let ret = await this.$axios.send('EXAMINE_RESULT_DETAIL', {ag_id: row.ag_id}, {id: row.a_e_id})
      if (ret && ret.status_code === 0) {
        this.detailList = ret.result
        this.dialog.detail = true
      }
    },

    async upload (params) {
      this.loading = true
      let fileObject = params.file
      let action = '/examine/result/import'
      let form = new FormData()
      form.append('file', fileObject)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'},
        responseType: 'blob'
      }
      let ret = await this.$axios.post(action, form, config)
      if (ret && ret.status_code === 0) {
        this.loading = false
        this.$message.success('考核轨迹导入完成')
      } else {
        this.$message.error('导入失败')
        common.downloadFile(ret, '错误数据.xlsx')
      }
    }
  }
}
</script>

<style scoped>
  .pr10 {
    padding-right: 10px;
  }
</style>
