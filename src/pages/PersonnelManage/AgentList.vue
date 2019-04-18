<!--
  代理人管理
  Agent 代替 AgentList
-->
<template>
  <div class="agentList">
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
          <el-form-item label="代理人姓名">
            <el-input v-model="searchData.ag_name"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代理人职级">
            <el-select v-model="searchData.jg_id"  >
              <el-option
                v-for="item in optionFrom"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24"></el-col>
        <el-col :span="8">
          <el-form-item label="推荐人">
            <el-input v-model="searchData.ref_id"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入司时间">
            <el-date-picker
              v-model="searchData.ag_join_date"
              value-format="yyyy-MM-dd"
              type="date"
              >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工号">
            <el-input v-model="searchData.ag_job_number"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="任职状态">
            <el-select v-model="searchData.ag_status"  >
              <el-option
                v-for="item in Dict.PERSON_AGENT_STATUS"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属组织">
            <el-input v-model="searchData.t_id"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="直接主管">
            <el-input v-model="searchData.ag_leader"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人员代码">
            <el-input v-model="searchData.ag_code"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary" @click="handleSearch" v-has="'AGENT_MENAGE_LIST'">查询</el-button>
            <el-button type="warning" :disabled="isDisabled" @click="jumpEditPage" v-has="'AGENT_MANAGE_EDIT'">修改</el-button>
            <el-button type="danger" :disabled="isDisabled" @click="handleBack('ruleForm')" v-has="'AGENT_MANAGE_DIMISSION'">离司申请</el-button>
            <el-button type="primary" :disabled="isDisabled" @click="handleMove('formRule')" v-has="'AGENT_MANAGE_MOVE'">迁移</el-button>
            <el-button type="info" @click="handleReset" v-has="'AGENT_MENAGE_LIST'">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- table start -->
    <section class="common-padding">
      <el-table
        :data="tableData"
        height="500"
        border style="width: 100%;text-align: center;"
        highlight-current-row
        @current-change="handleSelectTable">
        <el-table-column label="选择" prop="name" width="80">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.selected" :label="true">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="工号" prop="ag_job_number"></el-table-column>
        <el-table-column min-width="120" label="姓名">
          <template slot-scope="scope">
             <HasDetail :href="`#/app/Agent/Detail?id=${scope.row.ag_id}`" marker="AGENT_MANAGE_DETAIL">{{scope.row.ag_name}}</HasDetail>
              <!-- <span class="agent-name" v-has="'AGENT_MANAGE_DETAIL'" @click="jumpDetail(scope.row)">{{scope.row.ag_name}}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="人员代码" prop="ag_code"></el-table-column>
        <el-table-column min-width="120" label="所属机构" prop="o_name"></el-table-column>
        <el-table-column min-width="120" label="所属组织名称" prop="t_name"></el-table-column>
        <el-table-column label="职级" prop="jg_name"></el-table-column>
        <el-table-column label="推荐人" prop="ref_name"></el-table-column>
        <el-table-column label="直接主管" prop="ag_leader"></el-table-column>
        <el-table-column label="任职状态" prop="ag_status"></el-table-column>
        <el-table-column label="入司日期" prop="ag_join_date"></el-table-column>
      </el-table>
    </section>
    <!-- 分页 -->
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
    <!-- 离司弹框 -->
    <BaseDialog :title="dialogSet.title" :isshow.sync="dialogSet.sendDialog" width="429px" height="375px">
      <section class="dialog-center">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="离司原因" class="clear-marginbottom" style="margin-left:27px;"></el-form-item>
            </el-col >
            <el-col :span="24">
              <el-form-item label="" class="clear-marginbottom">
                <el-radio v-model="type" label="1">个人原因</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="" class="clear-marginbottom">
                <el-radio v-model="type" label="2">考核不通过</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="" class="clear-marginbottom">
                <el-radio v-model="type" label="3">开除</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="" class="clear-marginbottom">
                <el-radio v-model="type" label="4">其他</el-radio>
                <el-input v-if="isShowInput" maxlength="20" v-model="ruleForm.reason" class="input-width input-marginleft"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <section slot="footer" class="footer">
        <el-button type="primary" @click="dialogSave('ruleForm')">确 定</el-button>
        <el-button  @click="dialogSet.sendDialog = false" >取 消</el-button>
      </section>
    </BaseDialog>
    <!-- 迁移 弹框 -->
    <BaseDialog :title="dialogAgentMove.title" :isshow.sync="dialogAgentMove.sendDialog" width="528px" height="671px">
      <section class="dialog-agentmove">
        <el-form :model="formRule" ref="formRule" :rules="Rule.AGENT_MOVE" label-width="190px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="迁入组织代码" prop="t_code">
                <el-input v-model="formRule.t_code"  @blur="handleGetCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="迁入后职级" prop="after_jg_id">
                <el-select v-model="formRule.after_jg_id"  >
                    <el-option
                      v-for="item in optionFrom"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="迁入组织名称">
                <el-input v-model="formRule.u_agentName"  disabled ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="迁入组织主管代码">
                <el-input v-model="formRule.u_code"  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="迁入组织主管名称">
                <el-input v-model="formRule.u_name"  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="迁移原因" prop="reason">
                <el-input v-model="formRule.reason" maxlength="50" type="textarea"  class="input-marginmove textareainput"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <section slot="footer" class="footer">
        <el-button type="primary" @click="handlePassSave('formRule')">确 定</el-button>
        <el-button  @click="dialogAgentMove.sendDialog = false" >取 消</el-button>
      </section>
    </BaseDialog>
  </div>
</template>

<script>
import getData from '@/mixin/getData'
import bus from '@/tools/eventbus'
import HasDetail from '@/components/other/HasDetail.vue'
import BaseDialog from '@/components/base/BaseDialog'
import SelectChoose from '@/components/select/SelectChoose'
export default {
  name: 'AgentList',
  mixins: [getData],
  components: {
    BaseDialog,
    HasDetail,
    SelectChoose
  },
  data () {
    return {
      dialogSet: {title: '离司申请', sendDialog: false},
      dialogAgentMove: {title: '迁移', sendDialog: false},
      type: '',
      isShowInput: false,
      ruleForm: {reason: ''},
      pageValue: {},
      formRule: {
        t_code: '',
        u_agentName: '',
        after_jg_id: '',
        u_code: '',
        u_name: '',
        reason: ''
      },
      searchData: {
        o_id: '',
        ag_name: '',
        jg_id: '',
        ref_id: '',
        ag_join_date: '',
        ag_job_number: '',
        ag_status: '',
        t_id: '',
        ag_leader: '',
        ag_code: '',
        page: 1
      },
      searchForm: {
        o_name: '',
        o_g_id: '',
        o_status: ''
      },
      sumTotal: '',
      isDisabled: true,
      listId: {},
      currentPage: 1,
      tableData: [],
      optionFrom: []
    }
  },
  watch: {
    type (val) {
      if (Number(val) === 4) {
        this.isShowInput = true
      } else {
        this.ruleForm.reason = ''
        this.isShowInput = false
      }
    }
  },
  methods: {
    async getData () {
      if (!this.searchData.ag_join_date) {
        this.searchData.ag_join_date = ''
      };
      let res = await this.$axios.send('AGENT_MENAGE_LIST', this.searchData)
      if (res.status_code === 0) {
        this.tableData = res.result.data
        this.sumTotal = res.result.total
        this.isDisabled = true
      }
    },
    // 查询
    async handleSearch () {
      this.currentPage = 1
      this.searchData.page = 1
      this.getData()
    },
    // 修改
    jumpEditPage () {
      this.$router.push({name: '代理人修改', params: {id: this.listId.ag_id, name: this.listId.ag_status}})
    },
    // 重置
    handleReset () {
      this.searchData = {
        o_id: '',
        ag_name: '',
        jg_id: '',
        ref_id: '',
        ag_join_date: '',
        ag_job_number: '',
        ag_status: '',
        t_id: '',
        ag_leader: '',
        ag_code: '',
        page: 1
      }
    },
    // 离司
    handleBack (formName) {
      this.dialogSet.sendDialog = true
      this.type = ''
    },
    // 迁移
    handleMove (formName) {
      this.$refs[formName].resetFields()
      this.formRule = {
        t_code: '',
        u_agentName: '',
        after_jg_id: '',
        u_code: '',
        u_name: '',
        reason: ''
      }
      this.dialogAgentMove.sendDialog = true
    },
    // 列表跳转详情
    jumpDetail (item) {
      let link = (window.location.href).replace('List', 'Detail')
      const href = this.$router.resolve({
        name: `${link}`,
        params: {
          id: item.ag_id
        }
      })
      window.open(href.location.name + `?id=${href.location.params.id}`, '_blank')
      // window.location.href = href.location.name + `?id=${href.location.params.id}`
      // this.$router.push({path: './Detail', query: {id: item.o_id}})
    },
    // 弹框提交
    async dialogSave (formName) {
      this.ruleForm.ag_id = this.listId.ag_id
      this.ruleForm.type = this.type
      let res = await this.$axios.send('AGENT_MANAGE_DIMISSION', this.ruleForm)
      if (res.status_code === 0) {
        this.tableData.map(ctx => {
          if (ctx.ag_id === this.listId.ag_id) {
            ctx.ag_status = '预离司'
          }
        })
        this.$message({
          type: 'success',
          message: `操作成功`
        })
        this.dialogSet.sendDialog = false
      }
    },
    // 组织代码查名称
    async handleGetCode () {
      if (!this.formRule.t_code) { return }
      let res = await this.$axios.send('ORGANI_MANAGE_SHOWCODE', '', {$code: this.formRule.t_code})
      if (res.status_code === 0) {
        this.formRule.u_agentName = res.result.t_name
        this.formRule.u_code = res.result.ag_code
        this.formRule.u_name = res.result.t_ag_name
      }
    },
    // 迁移提交
    handlePassSave (formName) {
      this.formRule.ag_id = this.listId.ag_id
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await this.$axios.send('AGENT_MANAGE_MOVE', this.formRule)
          if (res.status_code === 0) {
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
      this.currentPage = obj
      this.searchData.page = this.currentPage
      this.getData()
    },
    // 获取代理人职级
    async getLevelManageData () {
      let res = await this.$axios.send('SELECT_AGENT_LEVEL_LIST')
      if (res.status_code === 0) {
        let title, id
        res.result.map(item => {
          title = item.j_g_name
          id = item.j_g_id
          this.optionFrom.push({'value': id, 'label': title})
        })
      }
    }
  },
  created () {
    this.getLevelManageData()
    bus.$once('pageValue', msg => {
      this.searchData.o_id = msg.o_id
      this.searchData.t_id = msg.t_name
      this.searchData.ag_status = 1
      this.getData()
    })
    bus.$emit('getPageOjb', 1)
  }
}
</script>

<style lang="scss">
.agentList{
  .agent-table{
    background: #fff;
  }
  .agent-name{
    color: #6797EC;
    cursor: pointer;
  }
  .dialog-center{
    width: 100%;
    margin-top:17px;
  }
  .dialog-agentmove{
    margin-top: 40px;
  }
  .clear-marginbottom{
    margin-bottom: 0 !important;
  }
  .input-marginleft{
    margin-left: 32px;
  }
  .textareainput textarea{
    resize: none;
    width: 230px;
    height: 145px;
  }
}
</style>
