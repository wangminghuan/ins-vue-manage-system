<!--
  机构管理
-->
<template>
  <div>
    <section class="header-title">{{$route.name}}</section>
    <div class="mb30"></div>
    <el-form :model="searchData" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构名称">
            <el-input v-model="searchData.o_name" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <SelectAgency v-model="searchData.o_g_id"></SelectAgency>
        </el-col>
        <el-col :span="8">
          <el-form-item label="机构状态">
            <el-select v-model="searchData.o_status"  class="input-width">
              <el-option
                v-for="item in Dict.AGENCY_STATUS"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary" @click="handleSearch" v-has="'SELECT_ORGANI_LIST'">查询</el-button>
            <el-button type="warning" :disabled="isDisabled" @click="handleEditl" v-has="'ORGANI_MANAGE_UPDATE'">修改</el-button>
            <el-button type="info" @click="handleReset" v-has="'SELECT_ORGANI_LIST'">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- table start -->
    <section class="common-padding">
      <el-table
        :data="tableData"
        border style="width: 100%;text-align: center"
        highlight-current-row
        @current-change="handleSelectTable"
        >
        <el-table-column label="选择" width="80">
          <template slot-scope="scope" >
            <el-radio  :label="true" v-model="scope.row.selected">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column min-width="120" label="机构名称" prop="o_name"></el-table-column>
        <el-table-column label="机构代码" prop="o_code"></el-table-column>
        <el-table-column min-width="90" label="机构类型" prop="o_g_name"></el-table-column>
        <el-table-column min-width="150" label="上级机构" prop="o_p_name"></el-table-column>
        <el-table-column label="负责人" prop="o_user"></el-table-column>
        <el-table-column label="联系电话" prop="o_phone"></el-table-column>
        <el-table-column label="所属地区">
          <template slot-scope="scope">
            <span>{{(scope.row.o_province)}}{{(scope.row.o_city)}}{{(scope.row.o_area)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="机构人数" prop="agent_num"></el-table-column>
        <el-table-column label="成立时间" >
          <template slot-scope="scope">
            <span>{{(scope.row.o_create).replace(/\-/g,'.')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.o_status|dict('AGENCY_STATUS')}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="footer-page">
        <div class="common-paging">
          <el-pagination
            v-if="sumtotal"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="sumtotal">
          </el-pagination>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SelectAgency from '@/components/select/SelectAgency'
export default {
  name: 'AgencyList',
  components: {
    SelectAgency
  },
  data () {
    return {
      searchData: {
        o_name: '',
        o_g_id: '',
        o_status: '',
        page: 1
      },
      isDisabled: true,
      listId: {},
      tableData: [],
      sumtotal: '',
      currentPage: 1,
      options: []
    }
  },
  methods: {
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
    },
    // 获取查询数据
    async getData () {
      this.listId = {}
      this.isDisabled = true
      let res = await this.$axios.send('SELECT_ORGANI_LIST', this.searchData)
      if (res.status_code === 0) {
        this.tableData = res.result.data
        this.sumtotal = res.result.total
      }
    },
    // 查询
    async handleSearch () {
      this.currentPage = 1
      this.searchData.page = 1
      this.getData()
    },
    // 重置
    handleReset () {
      this.searchData = {
        o_name: '',
        o_g_id: '',
        o_status: ''
      }
    },
    // 修改ORGANI_CHANGE
    async handleEditl () {
      this.$router.push({path: 'UPDATE', query: {id: this.listId.o_id}})
    },
    // 分页点击事件
    handleCurrentChange (obj) {
      this.currentPage = obj
      this.searchData.page = this.currentPage
      this.getData()
    }
  }
}
</script>
