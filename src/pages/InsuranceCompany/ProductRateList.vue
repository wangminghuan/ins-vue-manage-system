<!-- 产品佣金费率管理 -->
<template>
  <div>
    <section class="header-title">{{$route.name}}</section>
    <div class="mb30"></div>
    <el-form :model="searchData" label-width="120px" class="common-padding">
      <el-row>
        <el-col :span="8">
          <el-form-item label="保险公司">
            <select-company v-model="searchData.search_cid"></select-company>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品名称">
            <el-input v-model="searchData.search_name" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品代码">
            <el-input v-model="searchData.search_code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary"  @click="query(1)" v-has="'PRODUCT_RATE_LIST'">查询</el-button>
            <el-button type="warning" :disabled="!currSelected" @click="rateEdit" v-has="'PRODUCT_RATE_UPDATE'">佣金费率设置</el-button>
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
          <el-table-column min-width="180" label="产品名称" prop="p_name"></el-table-column>
          <el-table-column min-width="240"  label="保险公司" prop="c_name"></el-table-column>
          <el-table-column min-width="180"  label="产品代码" prop="p_code"></el-table-column>
          <el-table-column min-width="80"  label="产品类型" prop="p_type">
            <template slot-scope="scope">
              {{scope.row.p_type|dict('PRODUCT_TYPE')}}
            </template>
          </el-table-column>
          <el-table-column min-width="80"  label="主附险类型" prop="p_property">
            <template slot-scope="scope">
              {{scope.row.p_property|dict('PRODUCT_PROPERTY')}}
            </template>
          </el-table-column>
          <el-table-column min-width="75" label="佣金费率方案">
            <template slot-scope="scope" v-if="scope.row.rate_set !== 0">
              <el-button type="text" @click="showDetail(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </el-col>
      <el-col :span="23" class="common-paging tr">
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

    <base-dialog title="产品佣金费率"  :isshow.sync="dialog" width="900px" height="auto">
      <section class="dialog-center log">
        <el-table
            :data="dialogData.r_data"
            border
            style="width: 100%">
            <template v-for="(header, index) in dialogData.headers">
              <el-table-column v-if="index === 0" :label="header.label" :key="header.prop">
                <template slot-scope="scope">
                  {{scope.row[header.prop]}} 年缴
                </template>
              </el-table-column>
              <el-table-column v-if="index !== 0" :label="header.label" :key="header.prop">
                <template slot-scope="scope">
                   {{scope.row[header.prop] || 0}} <span v-if="scope.row[header.prop]">%</span>
                </template>
              </el-table-column>
            </template>
          </el-table>
      </section>
    </base-dialog>
  </div>
</template>

<script>
import SelectCompany from '@/components/select/SelectCompany.vue'
import BaseDialog from '@/components/base/BaseDialog'
import Query from '@/mixin/query'

export default {
  name: 'ProductCommissionList',
  mixins: [Query],
  components: {
    SelectCompany,
    BaseDialog
  },
  data () {
    return {
      searchData: {},
      currSelected: null,
      dialog: false,
      dialogData: {
        headers: [],
        r_data: []
      },
      tableData: {
        data: [],
        total: 0,
        current_page: 1,
        perPage: 10
      },
      multipleSelection: []
    }
  },

  methods: {
    async query (page = 1) {
      this.searchData.perPage = 10
      this.searchData.page = page
      let ret = await this.$axios.send('PRODUCT_RATE_LIST', this.searchData)
      if (ret && ret.status_code === 0) {
        this.tableData = ret.result.listData
      }
    },

    rateEdit () {
      this.$router.push({name: '产品佣金费率设置', params: {id: this.currSelected.p_id, p_name: this.currSelected.p_name}})
    },

    coefficientAdd () {
      let flag = this.multipleSelection.some(function (item) {
        return item.coefficient_set === 1
      })

      if (flag) {
        this.$message.error('部分数据已设定折标数据,不能再批量设定中出现')
        return
      }

      let data = []

      for (let i = 0; i < this.multipleSelection.length; i++) {
        let item = {
          p_id: this.multipleSelection[i].p_id,
          p_name: this.multipleSelection[i].p_name
        }

        data.push(item)
      }

      if (sessionStorage) {
        sessionStorage.setItem('coefficient', JSON.stringify(data))
      }

      this.$router.push({name: '产品折标系数设置', params: {id: 0}})
    },

    coefficientUpdate (item) {
      let data = [item]
      if (sessionStorage) {
        sessionStorage.setItem('coefficient', JSON.stringify(data))
      }

      this.$router.push({name: '产品折标系数设置', params: {id: item.p_id}})
    },

    handleSelectionChange (val) {
      this.multipleSelection = val
    },

    async showDetail (item) {
      console.log(item)
      let ret = await this.$axios.send('PRODUCT_RATE_DETAIL', {p_id: item.p_id, rule_id: 1})
      if (ret && ret.status_code === 0) {
        this.dialog = true
        let headers = []
        let rData = ret.result.r_data
        this.dialogData.r_data = ret.result.r_data
        if (rData[0]) {
          let len = Object.keys(rData[0]).length
          for (let i = 0; i < len; i++) {
            let item = {
              label: i === 0 ? '缴费年限' : `第 ${i} 年`,
              prop: i === 0 ? 'year' : `rate${i}`
            }
            headers.push(item)
          }
          this.dialogData.headers = headers
        }
      }
    }
  }
}
</script>

<style  scoped>
.dialog-center {
  overflow: auto;
  max-height: 400px;
  margin-bottom: 60px;
}
</style>
