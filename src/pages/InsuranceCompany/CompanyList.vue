<!-- 保险公司列表 -->
<template>
  <div>
    <section class="header-title">{{$route.name}}</section>
    <div class="mb30"></div>
    <el-form :model="searchData" label-width="120px" class="common-padding">
      <el-row>
        <el-col :span="8">
          <el-form-item label="保险公司">
            <el-input v-model="searchData.search_name" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合作状态">
            <el-select class="w100" v-model="searchData.search_status" >
              <el-option :label="'请选择'" :value="''"></el-option>
              <el-option v-for="item in Dict.COMPANY_STATUS" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary" @click="query(1)" v-has="'COMPANY_MANAGE_LIST'">查询</el-button>
            <el-button type="warning" :disabled="!currSelected" @click="edit" v-has="'COMPANY_MANAGE_EDIT'">修改</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-col :span="24">
        <div class="common-padding">
        <el-table :data="tableData.data" highlight-current-row border @current-change="tableItemSelect">
          <el-table-column width="80" label="选择" fixed prop="name">
            <template slot-scope="scope">
              <el-radio :label="true" name="selected" v-model="scope.row.selected">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="50" type="index"></el-table-column>
          <el-table-column min-width="100" label="保险公司代码" prop="c_code"></el-table-column>
          <el-table-column min-width="180" label="保险公司名称" prop="c_name"></el-table-column>
          <el-table-column min-width="180" label="合约期限" prop="c_id">
            <template slot-scope="scope" >
              <span>{{scope.row.c_start}} - {{scope.row.c_end}} </span>
            </template>
          </el-table-column>
          <el-table-column min-width="80" label="合约状态" prop="c_status">
            <template slot-scope="scope" >
              <span>{{scope.row.c_status|dict('COMPANY_STATUS')}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="100" label="渠道电话" prop="c_tel"></el-table-column>
          <el-table-column min-width="140" label="添加时间" prop="add_time"></el-table-column>
        </el-table>
        </div>
      </el-col>
      <el-col :span="23" class="common-paging tr" >
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
  </div>
</template>

<script>
import query from '@/mixin/query'
export default {
  name: 'CompanyList',
  mixins: [query],
  data () {
    return {
      searchData: {},
      currSelected: null,
      tableData: {
        data: [],
        total: 0,
        current_page: 1,
        perPage: 10
      }
    }
  },

  methods: {
    async query (page = 1) {
      this.searchData.perPage = 10
      this.searchData.page = page
      let ret = await this.$axios.send('COMPANY_MANAGE_LIST', this.searchData)
      if (ret && ret.status_code === 0) {
        this.tableData = ret.result.listData
      }
    },

    edit () {
      let id = this.currSelected.c_id
      this.$router.push({name: '保险公司修改', params: {id: id}})
    }
  }
}
</script>

<style scoped>
</style>
