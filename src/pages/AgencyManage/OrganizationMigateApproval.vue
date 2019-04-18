<!--
  组织关系迁移审核
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
                v-if="item.value<3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary" @click="handleSearch" v-has="'ORGANI_MANAGE_AUDIT'">查询</el-button>
            <el-button type="success" :disabled="isDisabled || listId.mv_status === 2" @click="handleAuit(1)" v-has="'ORGANT_MANAGE_MOVEAUDITPASS'">审核通过</el-button>
            <el-button type="success" :disabled="isDisabled || listId.mv_status === 2" @click="handleAuit(2)" v-has="'ORGANT_MANAGE_MOVEAUDITNOPASS'">审核不通过</el-button>
            <el-button type="warning" :disabled="isDisabled" @click="handleAuit(3)" v-has="'ORGANT_MANAGE_MOVEAUDITTOPASS'">撤回审核</el-button>
            <el-button type="info" @click="handleReset" v-has="'ORGANI_MANAGE_AUDIT'">重置</el-button>
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
        <el-table-column label="选择" width="90" fixed>
            <template slot-scope="scope">
              <el-radio v-model="scope.row.selected" :label="true">&nbsp;</el-radio>
            </template>
        </el-table-column>
        <el-table-column label="序号" width="60">
          <template slot-scope="scope">{{(scope.$index+(pagingObj.valuecurrentPage-1)*10)+1}}</template>
        </el-table-column>
        <el-table-column label="组织代码" prop="t_code"></el-table-column>
        <el-table-column label="组织名称" prop="t_name"></el-table-column>
        <el-table-column label="原机构名称" prop="pre_o_name"></el-table-column>
        <el-table-column label="原上级组织名称" prop="pre_t_name"></el-table-column>
        <el-table-column label="原上级组织级别" prop="pre_t_grade">
          <template slot-scope="scope">
            <span v-if="scope.row.pre_t_grade">{{scope.row.pre_t_grade|dict('AGENCY_ORGANI_LEVEL')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="变更后所属机构" prop="after_o_name"></el-table-column>
        <el-table-column label="变更后上级组织名称" prop="after_t_name"></el-table-column>
        <el-table-column label="变更后上级组织级别" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.after_t_grade">{{scope.row.after_t_grade|dict('AGENCY_ORGANI_LEVEL')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="迁移申请时间" prop="mv_time"></el-table-column>
        <el-table-column label="申请人" prop="mv_apply_u_name"></el-table-column>
        <el-table-column label="迁移原因" prop="mv_reason"></el-table-column>
        <el-table-column label="迁移状态" prop="mv_status">
          <template slot-scope="scope">
            <span>{{scope.row.mv_status|dict('AGENCY_MOVE_STATUS')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核时间" prop="mv_audit_time"></el-table-column>
        <el-table-column label="审核人" prop="mv_audit_u_name"></el-table-column>
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
  mixins: [getData],
  components: {
    SelectChoose
  },
  data () {
    return {
      searchData: {
        status: 'audit',
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
      listId: {},
      isDisabled: true,
      tableData: []
    }
  },
  methods: {
    // 请求
    async getData () {
      let res = await this.$axios.send('ORGANI_MANAGE_AUDIT', this.searchData)
      if (res.status_code === 0) {
        this.tableData = res.result.data
        this.pagingObj.sumTotal = res.result.total
        this.pagingObj.valuecurrentPage = this.pagingObj.currentPage
      }
    },
    // 查询
    async handleSearch () {
      this.isDisabled = true
      this.getData()
    },
    // 审核
    async handleAuit (num) {
      let auitObj = {
        status: 'audit',
        mv_audit_remark: '',
        mv_status: num
      }
      let name
      if (num === 1) {
        name = '审核通过'
      } else if (num === 2) {
        name = '审核不通过'
      } else {
        name = '撤回审核'
      }
      this.$confirm(`确定该组织迁移${name}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await this.$axios.send('ORGANT_MANAGE_MOVEAUDITPASS', auitObj, {$mv_id: this.listId.mv_id})
        if (res.status_code === 0) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.tableData.map(item => {
            if (item.mv_id === this.listId.mv_id) {
              if (num === 2) {
                item.mv_status = '2'
              } else if (num === 3) {
                item.mv_status = '1'
              } else if (num === 1) {
                if (this.tableData.length - 1 === 0) { this.searchData.page = this.pagingObj.currentPage - 1 }
                this.getData()
              }
            }
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 重置
    handleReset () {
      this.searchData = {
        status: 'audit',
        o_old_id: '',
        t_code: '',
        t_name: '',
        ag_code: '',
        t_ag_name: '',
        mv_status: '',
        page: 1
      }
    },
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
      this.searchData.page = this.pagingObj.currentPage
      this.getData()
    }
  }
}
</script>

<style scoped>
</style>
