<template>
  <div>
    <section class="header-title">{{$route.name}}</section>
    <div class="mb30"></div>
    <el-form :model="searchData" label-width="120px" class="common-padding">
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构选择">
            <select-organization v-model="searchData.search_oid" :isShowNull="true"></select-organization>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保险公司">
            <select-company v-model="searchData.search_cid" :isShowNull="true"></select-company>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保单号">
            <el-input v-model="searchData.search_bd_code" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投保人姓名">
            <el-input v-model="searchData.search_tb_name" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代理人姓名">
            <el-input v-model="searchData.search_ag_name" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保单状态">
            <el-select v-model="searchData.search_status" class="w100" >
              <el-option :label="'请选择'" :value="''"></el-option>
              <template v-for="dict in Dict.TB_STATUS">
                <el-option v-if="dict.value > 5" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary" v-has="'BD_RENEWAL_POLICY'" @click="query(1)">查询</el-button>
            <el-button type="primary" v-has="'BD_RENEWAL_SAVE'" :disabled="!currSelected" @click="renewalAction">续期缴费</el-button>
            <el-button type="primary" v-has="'BD_REDISTR_SAVE'" :disabled="!currSelected" @click="redistrDialog">再分配</el-button>
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
          <el-table-column min-width="180" label="机构名称" prop="o_name"></el-table-column>
          <el-table-column min-width="230" label="保险公司" prop="c_name"></el-table-column>
          <el-table-column min-width="180" label="保单号" prop="bd_code"></el-table-column>
          <el-table-column min-width="80" label="投保人" prop="tb_name"></el-table-column>
          <el-table-column min-width="80" label="被保人" prop="ir_name"></el-table-column>
          <el-table-column min-width="80" label="代理人" prop="ag_name"></el-table-column>
          <el-table-column min-width="120" label="保单生效日期" prop="bd_time"></el-table-column>
          <el-table-column min-width="80" label="保单状态" prop="tb_status">
            <template slot-scope="scope">
              {{scope.row.tb_status|dict('TB_STATUS')}}
            </template>
          </el-table-column>
          <el-table-column min-width="60"  label="已缴费次数" prop="pay_num"></el-table-column>
          <el-table-column min-width="120" label="上次缴费时间" prop="pay_current_time"></el-table-column>
          <el-table-column min-width="120" label="下次缴费时间" prop="next_pay_time"></el-table-column>
          <el-table-column min-width="60" label="缴费年限" prop="total_pay_num"></el-table-column>
        </el-table>
        </div>
      </el-col>
      <el-col :span="24" class="common-paging tr">
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

    <base-dialog title="再分配"  :isshow.sync="dialog.reassign" width="575px" height="575px">
      <section class="dialog-center pt20">
        <el-form :model="reassignForm" ref="reassignForm" :rules="Rule.BD_REASSIGN" label-width="130px" label-suffix="：">
          <el-row >
            <el-col :span="22" :offset="2" class="mb10">分配前：</el-col>
            <el-col :span="21" :offset="3" v-if="currSelected" class="mb10">
              <el-row >
                <el-col :span="24">
                  <el-form-item label="所属机构">
                    {{currSelected.o_name}}
                  </el-form-item>
                </el-col>
              </el-row>
               <el-row>
                <el-col :span="24">
                  <el-form-item label="保险公司">
                    {{currSelected.c_name}}
                  </el-form-item>
                </el-col>
              </el-row>
               <el-row>
                <el-col :span="24">
                  <el-form-item label="保单号">
                    {{currSelected.bd_code}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="投保人">
                    {{currSelected.tb_name}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="分配前代理人">
                    {{currSelected.ag_name}}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="22" :offset="2">分配后：</el-col>
            <el-col :span="21" :offset="3">
              <el-form-item label="分配类型" class="clear-marginbottom">
                <el-radio-group v-model="reassignForm.it_type">
                  <el-radio v-for="dict in Dict.ASSIGN_TYPE" :key="dict.vaule" :label="dict.value">{{dict.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="佣金比例" class="clear-marginbottom">
                50%
              </el-form-item>
              <el-form-item label="分配后代理人" class="clear-marginbottom">
                <el-select
                  class="agent-select"
                  v-model="reassignForm.new_ag_id"
                  filterable
                  remote
                  :remote-method="getAgentByCode">
                  <el-option
                    v-for="item in agentSelects"
                    :key="item.ag_id"
                    :label="item.ag_name"
                    :value="item.ag_id">
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.ag_job_number }}</span>
                      <span style="float: left">{{ item.ag_name }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <section slot="footer" class="footer">
        <el-button type="primary" @click="redistrAction">确 定</el-button>
        <el-button @click="dialog.reassign = false" >取 消</el-button>
      </section>
    </base-dialog>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import query from '@/mixin/query'
import SelectCompany from '@/components/select/SelectCompany.vue'
import SelectOrganization from '@/components/select/SelectOrganization.vue'
import BaseDialog from '@/components/base/BaseDialog'

export default {
  name: 'InsuranceRenewalList',
  mixins: [query],
  components: {
    SelectCompany,
    SelectOrganization,
    BaseDialog
  },
  data () {
    return {
      agentSelects: [],
      searchData: {
        search_status: ''
      },
      tableData: {
        data: [],
        total: 0,
        current_page: 1,
        perPage: 10
      },
      dialog: {
        reassign: false
      },
      reassignForm: {
        it_rate: '',
        it_type: 0,
        new_ag_id: ''
      },
      currSelected: null
    }
  },

  methods: {
    async query (page = 1) {
      this.searchData.perPage = 10
      this.searchData.page = page
      let ret = await this.$axios.send('BD_RENEWAL_POLICY', this.searchData)
      if (ret && ret.status_code === 0) {
        this.tableData = ret.result.listData
      }
    },

    async getAgentByCode (queryString, cb) {
      let user = JSON.parse(Cookie.get('user'))
      let ret = await this.$axios.send('AGENT_MENAGE_LIST', {ag_name: queryString, o_id: user.o_id})
      if (ret && ret.status_code === 0) {
        this.agentSelects = ret.result
      }
    },

    async renewalAction () {
      this.$router.push({name: '续期缴费', params: {id: this.currSelected.s_id}})
    },

    redistrDialog () {
      this.dialog.reassign = true
      this.$refs.reassignForm.resetFields()
    },

    async redistrAction () {
      this.reassignForm.s_id = this.currSelected.s_id
      this.$refs.reassignForm.validate(async (valid) => {
        if (valid) {
          this.reassignForm.it_rate = '50'
          let ret = await this.$axios.send('BD_REDISTR_SAVE', this.reassignForm)
          if (ret && ret.status_code === 0) {
            this.$message.success('再分配成功')
            this.dialog.reassign = false
            this.query()
          }
        }
      })
    }
  }
}
</script>
<style scoped>
.dialog-center /deep/ .el-form-item {
  margin-bottom: 3px !important;
}
</style>
