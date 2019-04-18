<!--
  组织关系管理
  机构选择 请求接口
  组织状态 组织级别 默认写死
  页面类名：
  Organi 代替 OrganizationList
-->
<template>
  <div class="organizationList">
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
          <el-form-item label="组织名称">
            <el-input v-model="searchData.t_name" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="组织代码">
            <el-input v-model="searchData.t_code" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="组织状态">
            <el-select v-model="searchData.t_status" >
              <el-option
                v-for="item in Dict.AGENCY_ORGANI_STATUS"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="组织级别">
            <el-select v-model="searchData.t_grade" >
              <el-option
                v-for="item in Dict.AGENCY_ORGANI_LEVEL"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主管姓名">
            <el-input v-model="searchData.ag_name" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上级组织名称">
            <el-input v-model="searchData.t_pname" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary" @click="handleSearchList" v-has="'TEAM_MANAGE_LIST'">查询</el-button>
            <el-button type="success" @click="jumpNewAreaPage(1)" v-has="'TEAM_MANAGE_ADD_AREA'">新增区</el-button>
            <el-button type="success" @click="jumpNewAreaPage(2)" v-has="'TEAM_MANAGE_ADD_DEPA'">新增部</el-button>
            <el-button type="warning" :disabled="!isDisabled" @click="jumpnewDetailPage" v-has="'TEAM_MANAGE_PUT'">修改</el-button>
            <el-button type="danger" :disabled="!isDisabled" @click="handleCancel" v-has="'TEAM_MANAGE_DELECT'">注销</el-button>
            <el-button type="primary" :disabled="!isDisabled" @click="handleMove('formRule')" v-has="'TEAM_MANAGE_MOVE'">迁移</el-button>
            <el-button type="info" @click="handleReset" v-has="'TEAM_MANAGE_LIST'">重置</el-button>
            <!-- <el-button type="primary">迁移</el-button> -->
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
        <template slot-scope="scope">
          <el-radio :label="true" v-model="scope.row.selected">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="机构名称" prop="o_name"></el-table-column>
      <el-table-column min-width="120" label="组织名称">
        <template slot-scope="scope">
          <HasDetail :href="`#/app/Organization/Detail?id=${scope.row.t_id}`" marker="TEAM_MANAGE_DETAIL">{{scope.row.t_name}}</HasDetail>
          <!-- <span class="organi" v-has="'TEAM_MANAGE_DETAIL'" @click="jumpdetail(scope.row)">{{scope.row.t_name}}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="组织代码" prop="t_code"></el-table-column>
      <el-table-column label="组织级别" >
        <template slot-scope="scope">
          <span>{{scope.row.t_grade|dict('AGENCY_ORGANI_LEVEL')}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="上级组织名称" prop="t_pname"></el-table-column>
      <el-table-column label="组织成员">
        <template slot-scope="scope">
          <span class="organi"  @click="jumpPersonPage(scope.row)">{{scope.row.ag_count}}</span>
        </template>
      </el-table-column>
      <el-table-column label="主管姓名" prop="t_ag_name"></el-table-column>
      <el-table-column label="组织状态" >
        <template slot-scope="scope">
          <span>{{scope.row.t_status|dict('AGENCY_ORGANI_STATUS')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="建立日期" prop="t_create">
        <template slot-scope="scope">
          <span>{{(scope.row.t_create).replace(/\-/g,'.')}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="注销日期" prop="t_close">
        <template slot-scope="scope">
          <span>{{(scope.row.t_close).replace(/\-/g,'.')}}</span>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- 分页 start-->
    <section class="footer-page">
      <div class="common-paging">
        <el-pagination
          v-if="sumTotal"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="sumTotal">
        </el-pagination>
      </div>
    </section>
    </section>
    <!-- 迁移 弹框 -->
    <BaseDialog :title="dialogAgentMove.title" :isshow.sync="dialogAgentMove.sendDialog" width="528px" height="auto">
      <section class="dialog-agentmove">
        <el-form :model="formRule" ref="formRule" :rules="Rule.ORGANI_MOVE" label-width="190px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="变更后所属机构" prop="o_new_id">
                <SelectChoose v-model="formRule.o_new_id"></SelectChoose>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="变更后组织级别" prop="t_g_new_id">
                <el-select v-model="formRule.t_g_new_id" :disabled="tgradedisable" @change="levelChange">
                  <el-option
                    v-for="item in Dict.AGENCY_ORGANI_LEVEL"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24" v-if="controlShow">
              <el-form-item label="变更后上级组织代码" prop="t_new_idsub">
                <el-input v-model="formRule.t_new_idsub" :disabled="formRule.t_g_new_id === 1" @blur="handleBlur"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="controlShow">
              <el-form-item label="变更后上级组织名称">
                <el-input v-model="formRule.t_name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="迁移原因" prop="mv_reason">
                <el-input v-model="formRule.mv_reason" maxlength="20" type="textarea"  class="input-marginmove textareainput"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <section slot="footer" class="footername">
        <el-button type="primary" @click="handlePassSave('formRule')">确 定</el-button>
        <el-button  @click="dialogAgentMove.sendDialog = false" >取 消</el-button>
      </section>
    </BaseDialog>
  </div>
</template>

<script>
import getData from '@/mixin/getData'
import bus from '@/tools/eventbus'
import BaseDialog from '@/components/base/BaseDialog'
import HasDetail from '@/components/other/HasDetail.vue'
import SelectChoose from '@/components/select/SelectChoose'
export default {
  name: 'OrganizationList',
  mixins: [getData],
  components: {
    BaseDialog,
    SelectChoose,
    HasDetail
  },
  data () {
    return {
      currentPage: 1,
      dialogAgentMove: {title: '组织关系迁移', sendDialog: false},
      tgradedisable: false,
      controlShow: true,
      formRule: {
        t_new_id: '',
        o_new_id: '',
        t_new_idsub: '',
        t_name: '',
        t_g_new_id: '',
        mv_reason: ''
      },
      sumTotal: '',
      isDisabled: false,
      searchData: {
        o_id: '',
        t_name: '',
        t_code: '',
        t_status: '',
        t_grade: '',
        ag_name: '',
        t_pname: '',
        page: 1
      },
      listId: {},
      tableData: []
    }
  },
  methods: {
    // 选择table
    handleSelectTable (currentRow, oldCurrentRow) {
      if (currentRow) {
        currentRow.selected = true
        this.listId = currentRow
        this.isDisabled = true
      }
      if (oldCurrentRow) {
        oldCurrentRow.selected = false
      }
    },
    // 跳转详情页
    jumpdetail (item) {
      let link = (window.location.href).replace('List', 'Detail')
      const href = this.$router.resolve({
        name: `${link}`,
        params: {
          id: item.t_id
        }
      })
      window.open(href.location.name + `?id=${href.location.params.id}`, '_blank')
      // this.$router.push({path: './Detail', query: {id: this.listId.t_id}})
    },
    async getData () {
      let res = await this.$axios.send('TEAM_MANAGE_LIST', this.searchData)
      if (res.status_code === 0) {
        this.tableData = res.result.data
        this.sumTotal = res.result.total
      }
    },
    jumpPersonPage (obj) {
      bus.$once('getPageOjb', msg => {
        if (msg) { bus.$emit('pageValue', obj) }
      })
      this.$router.push({name: '代理人管理', query: {id: 1}})
    },
    // 点击查询
    async handleSearchList () {
      this.currentPage = 1
      this.searchData.page = 1
      this.isDisabled = false
      this.getData()
    },
    // 注销组织
    handleCancel () {
      this.$confirm('确定注销该组织？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await this.$axios.send('TEAM_MANAGE_DELECT', '', {$id: this.listId.t_id})
        if (res.status_code === 0) {
          this.$message({
            type: 'success',
            message: '注销成功'
          })
          this.getData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 迁移 变更后组织代码
    async handleBlur (e) {
      if (e.target.value) {
        let res = await this.$axios.send('ORGANI_MANAGE_SHOWCODE', '', {$code: e.target.value})
        if (res.status_code === 0) {
          this.formRule.t_new_id = res.result.t_id
          this.formRule.t_name = res.result.t_name
        } else {
          this.formRule.t_new_id = ''
          this.formRule.t_name = ''
        }
      }
    },
    // 迁移 弹框
    handleMove (formName) {
      this.$refs[formName].resetFields()
      this.Rule.ORGANI_MOVE.t_new_idsub[0].required = true
      this.formRule = {
        t_new_id: '',
        o_new_id: '',
        t_new_idsub: '',
        t_name: '',
        t_g_new_id: '',
        mv_reason: ''
      }
      if (this.listId.t_grade === 1) {
        this.tgradedisable = true
        this.controlShow = false
      } else {
        this.controlShow = true
        this.tgradedisable = false
      }
      this.formRule.t_g_new_id = this.listId.t_grade
      this.dialogAgentMove.sendDialog = true
    },
    // 迁移 确定btn
    async handlePassSave (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.formRule.t_id = this.listId.t_id
          let res = await this.$axios.send('TEAM_MANAGE_MOVE', this.formRule)
          if (res.status_code === 0) {
            this.tableData.map(item => {
              if (item.t_id === this.listId.t_id) {
                item.t_status = '2'
              }
            })
            this.$message({
              type: 'success',
              message: `操作成功`
            })
            this.dialogAgentMove.sendDialog = false
          }
        } else {
          return false
        }
      })
    },
    // 重置
    handleReset () {
      this.searchData = {
        o_id: '',
        t_name: '',
        t_code: '',
        t_status: '',
        t_grade: '',
        ag_name: '',
        t_pname: '',
        page: 1
      }
    },
    // 新增区
    jumpNewAreaPage (val) {
      this.$router.push({path: './OrganizationNewArea', query: {id: val}})
    },
    // 修改
    jumpnewDetailPage () {
      let area = this.listId.t_id
      let newarea = this.listId.t_grade
      this.$router.push({path: './OrganizationNewArea', query: {value: area, name: newarea}})
    },
    // 分页点击事件
    handleCurrentChange (obj) {
      this.currentPage = obj
      this.searchData.page = this.currentPage
      this.getData()
    },

    /**
     *  组织迁移时,区部展示字段需要重置默认值
     *  如果 1 : 区,2 : 部
     *  如果组织机构是部级,那么变更后上级组织机构代码必填
     */
    levelChange (value) {
      if (value === 2) {
        this.Rule.ORGANI_MOVE.t_new_idsub[0].required = true
      } else {
        this.Rule.ORGANI_MOVE.t_new_idsub[0].required = false
        this.formRule.t_new_idsub = ''
        this.$refs['formRule'].clearValidate('t_new_idsub')
      }
    }
  }
}
</script>

<style lang="scss">
.organizationList{
  .organi{
    color:#6797EC;
    cursor:pointer;
  }
  .dialog-agentmove{
    margin-top: 40px;
  }
  .textareainput textarea{
    resize: none;
    width: 230px;
    height: 145px;
  }
  .footername{
    text-align:center;
    height: 60px;
    box-sizing: border-box;
  }
}
</style>
