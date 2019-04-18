<!--
  组织关系变更记录
-->
<template>
  <div>
    <section class="header-title">{{$route.name}}</section>
    <div class="mb30"></div>
    <el-form :model="searchData" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构选择">
            <SelectChoose v-model="searchData.o_id"></SelectChoose>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="组织代码">
            <el-input v-model="searchData.abc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="组织名称">
            <el-input v-model="searchData.abc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="common-padding">
      <el-table
        :data="tableData"
        border style="width: 100%;text-align: center;"
        highlight-current-row
        @current-change="handleSelectTable">
       <el-table-column label="选择" prop="name" width="90" fixed>
            <template slot-scope="scope">
              <el-radio v-model="scope.row.selected" :label="true">&nbsp;</el-radio>
            </template>
        </el-table-column>
        <el-table-column label="序号" prop="name"></el-table-column>
        <el-table-column label="所属机构" prop="name"></el-table-column>
        <el-table-column label="组织代码" prop="name"></el-table-column>
        <el-table-column label="组织名称" prop="name"></el-table-column>
        <el-table-column label="前状态" prop="name"></el-table-column>
        <el-table-column label="后状态" prop="name"></el-table-column>
        <el-table-column label="变更时间" prop="name"></el-table-column>
        <el-table-column label="操作人" prop="name"></el-table-column>
        <el-table-column label="备注" prop="name"></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <section class="footer-page">
      <div class="common-paging">
        <el-pagination
          v-if="pagingObj.sumTotal"
          @current-change="handleCurrentChange"
          :current-page="pagingObj.currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="pagingObj.sumTotal">
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import SelectChoose from '@/components/select/SelectChoose'
export default {
  components: {
    SelectChoose
  },
  data () {
    return {
      searchData: {},
      pagingObj: {
        currentPage: 1,
        sumTotal: 400
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
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
    // 分页点击事件
    handleCurrentChange (obj) {
      this.pagingObj.currentPage = obj
      // this.searchData.page = this.currentPage
      // this.getData()
    }
  }
}
</script>

<style scoped>
</style>
