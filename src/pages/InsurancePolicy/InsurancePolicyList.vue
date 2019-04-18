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
        <el-col :span="24"></el-col>
        <el-col :span="8">
          <el-form-item label="险种信息">
            <select-all-product v-model="searchData.search_pid" :cid="searchData.search_cid"></select-all-product>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary" v-has="'BD_MANAGE_LIST'" @click="query(1)">查询</el-button>
            <el-button type="warning" v-has="'BD_MANAGE_UPDATE'" :disabled="!currSelected" @click="edit">修改</el-button>
            <el-button type="primary" v-has="'BD_POLICY_DATE_RETURN'" :disabled="!currSelected" @click="policyDateDiglog(1)">回执录入</el-button>
            <el-button type="primary" v-has="'BD_POLICY_DATE_RECEIPT'" :disabled="!currSelected" @click="policyDateDiglog(2)">回访录入</el-button>
            <el-button type="primary" v-has="'BD_MANAGE_CHANGE_STATUS'" :disabled="!currSelected" @click="changeStatusDiglog">状态变更</el-button>
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
          <el-table-column min-width="240" label="保险公司" prop="c_name"></el-table-column>
          <el-table-column min-width="180" label="保单号" prop="bd_code">
            <template slot-scope="scope">
              <has-detail :href="`#/app/InsurancePolicy/Detail/${scope.row.s_id}`" marker="BD_MANAGE_DETAIL">
                {{scope.row.bd_code}}
              </has-detail>
            </template>
          </el-table-column>
          <el-table-column min-width="200" label="机构名称" prop="o_name"></el-table-column>
          <el-table-column min-width="80" label="投保人" prop="tb_name"></el-table-column>
          <el-table-column min-width="80" label="被保人" prop="ir_name"></el-table-column>
          <el-table-column min-width="80" label="代理人" prop="ag_name"></el-table-column>
          <el-table-column min-width="80" label="保单状态" prop="tb_status">
            <template slot-scope="scope">
              {{scope.row.tb_status|dict('TB_STATUS')}}
            </template>
          </el-table-column>
          <el-table-column min-width="120" label="状态变更日期" prop="status_time"></el-table-column>
          <el-table-column min-width="120" label="投保日期" prop="tb_date"></el-table-column>
          <el-table-column min-width="120" label="承保日期" prop="bd_time"></el-table-column>
          <el-table-column min-width="120" label="回执日期" prop="receipt_date"></el-table-column>
          <el-table-column min-width="120" label="回访日期" prop="callback_date"></el-table-column>
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

    <base-dialog title="状态变更"  :isshow.sync="dialog.changeStatus" width="513px" height="375px">
      <section class="dialog-center pt20">
        <el-form :model="changeStatusForm" ref="changeStatusForm" label-width="120px" label-suffix="：">
          <el-row >
            <el-col :span="22" :offset="2">
              <el-form-item label="变更前状态" class="clear-marginbottom">
                <span v-if="currSelected"> {{currSelected.tb_status|dict('TB_STATUS')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="22" :offset="2">
              <el-form-item label="变更后状态" class="clear-marginbottom" prop="tb_status" :rules="[{ required: true, message: '状态变更后还未选择', trigger: 'change' }]">
                <el-radio-group v-model="changeStatusForm.tb_status">
                  <el-row>
                    <el-col :span="24" class="mb20">
                      <el-radio :label="6">生  效  中</el-radio>
                      <el-radio :label="7">欠费中止 </el-radio>
                      <el-radio :label="8">欠费终止</el-radio>
                    </el-col>
                    <el-col :span="24">
                      <el-radio :label="9">退保终止 </el-radio>
                      <el-radio :label="10">理赔终止</el-radio>
                      <el-radio :label="11">到期终止</el-radio>
                    </el-col>
                  </el-row>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="2">
              <el-form-item label="变更日期" class="clear-marginbottom" :rules="[{ required: true, message: '日期不能为空', trigger: 'change' }]">
                <el-date-picker
                  v-model="changeStatusForm.status_time"
                  value-format="yyyy-MM-dd"
                  type="date"
                  >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <section slot="footer" class="footer">
        <el-button type="primary" @click="changeStatus">确 定</el-button>
        <el-button @click="dialog.changeStatus = false" >取 消</el-button>
      </section>
    </base-dialog>

    <base-dialog :title="policyDateForm.title" :isshow.sync="dialog.policyDate" width="475px" height="475px">
      <section class="dialog-center pt20">
        <el-form :model="policyDateForm" ref="policyDateForm"  label-width="100px" label-suffix="：">
          <el-row >
            <el-col :span="16" :offset="3">
              <el-form-item label="保险公司" class="clear-marginbottom">
                <span v-if="currSelected">{{currSelected. c_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="16" :offset="3">
              <el-form-item label="保单号" class="clear-marginbottom">
                <span v-if="currSelected">{{currSelected.bd_code}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="16" :offset="3">
              <el-form-item label="机构名称" class="clear-marginbottom">
                <span v-if="currSelected">{{currSelected.o_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="16" :offset="3">
              <el-form-item label="投保人" class="clear-marginbottom">
                <span v-if="currSelected">{{currSelected.tb_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="16" :offset="3">
              <el-form-item :label="policyDateForm.title" class="clear-marginbottom" prop="new_date" :rules="[ { required: true, message: '日期不能为空', trigger: 'blur' }]">
                <el-date-picker
                  class="w100"
                  v-model="policyDateForm.new_date"
                  value-format="yyyy-MM-dd"
                  type="date"
                  >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <section slot="footer" class="footer">
        <el-button type="primary" @click="policyDateAction">确 定</el-button>
        <el-button @click="dialog.policyDate = false" >取 消</el-button>
      </section>
    </base-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import query from '@/mixin/query'
import HasDetail from '@/components/other/HasDetail.vue'
import SelectCompany from '@/components/select/SelectCompany.vue'
import SelectOrganization from '@/components/select/SelectOrganization.vue'
import SelectAllProduct from '@/components/select/SelectAllProduct.vue'
import BaseDialog from '@/components/base/BaseDialog'
import { Message } from 'element-ui'

export default {
  name: 'InsurancePolicyList',
  mixins: [query],
  components: {
    SelectCompany,
    SelectOrganization,
    SelectAllProduct,
    BaseDialog,
    HasDetail
  },
  data () {
    return {
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
        policyDate: false,
        changeStatus: false
      },
      changeStatusForm: {
        tb_status: ''
      },
      policyDateForm: {
        s_id: '',
        new_date: '',
        title: ''
      },
      currSelected: null
    }
  },

  methods: {
    async query (page = 1) {
      this.searchData.perPage = 10
      this.searchData.page = page
      let ret = await this.$axios.send('BD_MANAGE_LIST', this.searchData)
      if (ret && ret.status_code === 0) {
        this.tableData = ret.result.listData
      }
    },

    async edit () {
      this.$router.push({name: '保单修改', params: {actionType: 1, id: this.currSelected.s_id}})
    },

    changeStatusDiglog () {
      this.dialog.changeStatus = true
      this.$refs.changeStatusForm.resetFields()
    },

    async changeStatus () {
      let valid = await this.$refs.changeStatusForm.validate()
      if (valid) {
        this.changeStatusForm.s_id = this.currSelected.s_id
        let ret = await this.$axios.send('TB_MANAGE_CHANGE_STATUS', this.changeStatusForm)
        if (ret && ret.status_code === 0) {
          Message.success('状态变更成功')
        }

        this.dialog.changeStatus = false
        this.query(1)
      }
    },

    policyDateDiglog (type) {
      this.policyDateForm.title = type === 1 ? '回执日期' : '回访日期'
      this.$refs.policyDateForm.resetFields()
      this.dialog.policyDate = true
      this.policyDateForm.action_type = type
      this.policyDateForm.marker = type === 1 ? 'BD_POLICY_DATE_RETURN' : 'BD_POLICY_DATE_RECEIPT'
      let nowDate = ''
      if (type === 1) {
        nowDate = this.currSelected.receipt_date === '-' ? undefined : this.currSelected.receipt_date
      } else {
        nowDate = this.currSelected.callback_date === '-' ? undefined : this.currSelected.callback_date
      }

      this.policyDateForm.new_date = moment(nowDate).format('YYYY-MM-DD')
    },

    async policyDateAction () {
      let valid = await this.$refs.policyDateForm.validate()
      if (valid) {
        this.policyDateForm.s_id = this.currSelected.s_id
        let ret = await this.$axios.send(this.policyDateForm.marker, this.policyDateForm)
        if (ret && ret.status_code === 0) {
          this.$message.success(this.policyDateForm.title + '录入成功')
        }

        this.dialog.policyDate = false
        this.query(1)
      }
    }
  }
}
</script>
