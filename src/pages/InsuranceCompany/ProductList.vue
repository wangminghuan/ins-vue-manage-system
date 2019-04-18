<!-- 产品列表 -->
<template>
  <div>
    <section class="header-title">{{$route.name}}</section>
    <div class="mb30"></div>
    <el-form :model="searchData" label-width="120px" class="common-padding">
      <el-row>
        <el-col :span="8">
          <el-form-item label="保险公司">
            <select-company v-model="searchData.search_cid" ></select-company>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品名称">
            <el-input v-model="searchData.search_name" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主附险类型">
            <el-select class="w100" v-model="searchData.search_property" >
              <el-option :label="'请选择'" :value="''"></el-option>
              <el-option v-for="item in Dict.PRODUCT_PROPERTY" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24"></el-col>
        <el-col :span="8">
          <el-form-item label="销售状态">
            <el-select class="w100" v-model="searchData.search_status" >
              <el-option :label="'请选择'" :value="''"></el-option>
              <el-option v-for="item in Dict.PRODUCT_STATUS" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary" @click="query(1)" v-has="'PRODUCT_MANAGE_LIST'">查询</el-button>
            <el-button type="warning" :disabled="!currSelected" @click="edit" v-has="'PRODUCT_MANAGE_UPDATE'">修改</el-button>
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
          <el-table-column min-width="180" label="产品代码" prop="p_code"></el-table-column>
          <el-table-column min-width="240" label="保险公司" prop="c_name"></el-table-column>
          <el-table-column min-width="80" label="产品类型" prop="p_type">
            <template slot-scope="scope" >
              <span>{{scope.row.p_type|dict('PRODUCT_TYPE')}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="80"  label="主附险类型" prop="p_property">
            <template slot-scope="scope">
              <span>{{scope.row.p_property|dict('PRODUCT_PROPERTY')}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="80"  label="销售状态" prop="p_status">
            <template slot-scope="scope">
              <span>{{scope.row.p_status|dict('PRODUCT_STATUS')}}</span>
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
  </div>
</template>

<script>
import SelectCompany from '@/components/select/SelectCompany.vue'

import query from '@/mixin/query'
export default {
  name: 'ProductList',
  mixins: [query],
  components: {
    SelectCompany
  },
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
      let ret = await this.$axios.send('PRODUCT_MANAGE_LIST', this.searchData)
      if (ret && ret.status_code === 0) {
        this.tableData = ret.result.listData
      }
    },

    edit () {
      let id = this.currSelected.p_id
      this.$router.push({name: '产品修改', params: {id: id}})
    }
  }
}
</script>
