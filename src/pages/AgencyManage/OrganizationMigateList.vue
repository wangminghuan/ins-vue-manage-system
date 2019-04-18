<!--
  组织关系迁移记录
-->
<template>
  <div>
    <section class="header-title">{{$route.name}}</section>
    <div class="mb30"></div>
    <el-form :model="searchData" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="原机构选择">
            <SelectChoose v-model="searchData.o_old_id"></SelectChoose>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="组织代码">
            <el-input v-model="searchData.t_code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="组织名称">
            <el-input v-model="searchData.t_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主管代码">
            <el-input v-model="searchData.ag_code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主管姓名">
            <el-input v-model="searchData.t_ag_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="迁移状态">
            <el-select v-model="searchData.mv_status">
              <el-option
                v-for="item in Dict.AGENCY_MOVE_STATUS"
                v-if="item.value ==2 || item.value ==4 ||item.value ==5"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary" @click="getData" v-has="'ORGANI_MANAGE_AUDIT_RECODE'">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="common-padding">
      <el-table
        :data="tableData"
        border style="width: 100%;text-align: center;"
        >
        <el-table-column label="序号" width="90">
          <template slot-scope="scope">{{(scope.$index+(pagingObj.valuecurrentPage-1)*10)+1}}</template>
        </el-table-column>
        <el-table-column label="组织代码" prop="t_code"></el-table-column>
        <el-table-column label="组织名称" prop="t_name"></el-table-column>
        <el-table-column label="原机构名称" prop="pre_o_name"></el-table-column>
        <el-table-column label="原上级组织名称" prop="pre_t_name"></el-table-column>
        <el-table-column label="原上级组织级别">
          <template slot-scope="scope">
            <span v-if="scope.row.pre_t_grade">{{scope.row.pre_t_grade|dict('AGENCY_ORGANI_LEVEL')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="变更后所属机构" prop="after_o_name"></el-table-column>
        <el-table-column label="变更后上级组织名称" prop="after_t_name" min-width="150"></el-table-column>
        <el-table-column label="变更后上级组织级别" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.after_t_grade">{{scope.row.after_t_grade|dict('AGENCY_ORGANI_LEVEL')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="迁移生效时间" prop="mv_update_time"></el-table-column>
        <el-table-column label="迁移状态">
          <template slot-scope="scope">
            <span>{{scope.row.mv_status|dict('AGENCY_MOVE_STATUS')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请人" prop="mv_apply_u_name"></el-table-column>
        <el-table-column label="审核人" prop="mv_audit_u_name"></el-table-column>
        <el-table-column label="复核人" prop="mv_audit_u_name_2"></el-table-column>
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
import getData from '@/mixin/getData'
import SelectChoose from '@/components/select/SelectChoose'
export default {
  name: 'OrganizationMigateList',
  mixins: [getData],
  components: {
    SelectChoose
  },
  data () {
    return {
      searchData: {
        status: 'record',
        o_old_id: '',
        t_code: '',
        t_name: '',
        ag_code: '',
        t_ag_name: '',
        mv_status: '',
        page: 1
      },
      pagingObj: {
        valuecurrentPage: 1,
        currentPage: 1,
        sumTotal: ''
      },
      tableData: []
    }
  },
  methods: {
    // 查询
    async getData () {
      let res = await this.$axios.send('ORGANI_MANAGE_AUDIT_RECODE', this.searchData)
      if (res.status_code === 0) {
        this.tableData = res.result.data
        this.pagingObj.sumTotal = res.result.total
        this.pagingObj.valuecurrentPage = this.pagingObj.currentPage
      }
    },
    // 分页点击事件
    handleCurrentChange (obj) {
      this.pagingObj.currentPage = obj
      this.searchData.page = this.pagingObj.currentPage
      this.getData()
    }
  }
}
</script>

<style scoped>
</style>
