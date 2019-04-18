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
          <el-form-item label="投保单号">
            <el-input v-model="searchData.search_tb_code" ></el-input>
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
          <el-form-item label="投保单状态">
            <el-select v-model="searchData.search_status" class="w100" >
              <el-option :label="'请选择'" :value="''"></el-option>
              <template v-for="dict in Dict.TB_STATUS">
                <el-option v-if="dict.value < 6" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary" v-has="'TB_MANAGE_LIST'" @click="query(1)">查询</el-button>
            <el-button type="warning" v-has="'TB_MANAGE_UPDATE'" :disabled="!currSelected" @click="edit">修改</el-button>
            <el-button type="primary" v-has="'TB_MANAGE_CHANGE_STATUS'" :disabled="!currSelected"  @click="changeStatusDiglog">状态变更</el-button>
            <el-button type="primary" v-has="'TB_MANAGE_TO_POLICY'" :disabled="!currSelected" @click="toPolicDiglog">转为保单</el-button>
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
          <el-table-column min-width="200" label="机构名称" prop="o_name"></el-table-column>
          <el-table-column min-width="240" label="保险公司" prop="c_name"></el-table-column>
          <el-table-column min-width="180" label="投保单号" prop="tb_code">
            <template slot-scope="scope">
              <has-detail marker="TB_MANAGE_DETAIL" :href="`#/app/InsuranceSlip/Detail/${scope.row.s_id}`">{{scope.row.tb_code}}</has-detail>
            </template>
          </el-table-column>
          <el-table-column min-width="80" label="投保人" prop="tb_name"></el-table-column>
          <el-table-column min-width="80" label="被保人" prop="ir_name"></el-table-column>
          <el-table-column min-width="80" label="代理人" prop="ag_name"></el-table-column>
          <el-table-column min-width="120"  label="投保日期" prop="tb_date"></el-table-column>
          <el-table-column  min-width="80" label="投保状态" prop="tb_status">
            <template slot-scope="scope">
              {{scope.row.tb_status|dict('TB_STATUS')}}
            </template>
          </el-table-column>
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

    <base-dialog title="状态变更"  :isshow.sync="dialog.changeStatus" width="475px" height="275px">
      <section class="dialog-center pt20">
        <el-form :model="changeStatusForm" ref="changeStatusForm" label-width="120px" label-suffix="：">
          <el-row >
            <el-col :span="24" >
              <el-form-item label="状态变更前" class="clear-marginbottom">
                <span v-if="currSelected"> {{currSelected.tb_status|dict('TB_STATUS')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24" >
              <el-form-item label="状态变更后" class="clear-marginbottom" prop="tb_status" :rules="[{ required: true, message: '状态变更后还未选择', trigger: 'change' }]">
                <el-radio-group v-model="changeStatusForm.tb_status">
                  <el-row>
                    <el-col :span="24" class="mb20">
                      <el-radio :label="0">待核保</el-radio>
                      <el-radio :label="1">核保前撤单</el-radio>
                      <el-radio :label="2">拒单</el-radio>
                    </el-col>
                    <el-col :span="24">
                      <el-radio :label="3">承保前撤单 </el-radio>
                      <el-radio :label="4">无效投保单</el-radio>
                      <el-radio :label="5">待承保</el-radio>
                    </el-col>
                  </el-row>
                </el-radio-group>
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

    <base-dialog title="转为保单"  :isshow.sync="dialog.toPolic" width="475px" height="275px">
      <section class="dialog-center pt20">
        <el-form :model="toPolicForm" ref="toPolicForm" :rules="Rule.TO_POLICY" label-width="100px" label-suffix="：">
          <el-row >
            <el-col :span="16" :offset="3">
              <el-form-item label="保单号" class="clear-marginbottom" prop="bd_code">
                <el-input v-model="toPolicForm.bd_code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16" :offset="3">
              <el-form-item label="生效日期" class="clear-marginbottom" prop="bd_time">
                <el-date-picker
                  v-model="toPolicForm.bd_time"
                  value-format="yyyy-MM-dd"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <section slot="footer" class="footer">
        <el-button type="primary" @click="toPolic">确 定</el-button>
        <el-button @click="dialog.toPolic = false" >取 消</el-button>
      </section>
    </base-dialog>
  </div>
</template>

<script>
import query from '@/mixin/query'
import HasDetail from '@/components/other/HasDetail.vue'
import SelectCompany from '@/components/select/SelectCompany.vue'
import SelectOrganization from '@/components/select/SelectOrganization.vue'
import BaseDialog from '@/components/base/BaseDialog'
import { Message } from 'element-ui'

export default {
  name: 'InsuranceSlipList',
  mixins: [query],
  components: {
    SelectCompany,
    SelectOrganization,
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
        toPolic: false,
        changeStatus: false
      },
      changeStatusForm: {
        tb_status: ''
      },
      toPolicForm: {
        bd_code: '',
        bd_time: ''
      },
      currSelected: null
    }
  },

  methods: {
    async query (page = 1) {
      this.searchData.perPage = 10
      this.searchData.page = page
      let ret = await this.$axios.send('TB_MANAGE_LIST', this.searchData)
      if (ret && ret.status_code === 0) {
        this.tableData = ret.result.listData
      }
    },

    async edit () {
      this.$router.push({name: '投保单修改', params: {id: this.currSelected.s_id, actionType: 0}})
    },

    changeStatusDiglog () {
      this.dialog.changeStatus = true
      this.changeStatusForm.tb_status = ''
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
        this.query()
      }
    },

    toPolicDiglog () {
      this.dialog.toPolic = true
    },

    async toPolic () {
      let valid = await this.$refs.toPolicForm.validate()
      if (valid) {
        this.toPolicForm.s_id = this.currSelected.s_id
        let ret = await this.$axios.send('TB_MANAGE_TO_POLICY', this.toPolicForm)
        if (ret && ret.status_code === 0) {
          Message.success('状态变更成功')
        }

        this.dialog.toPolic = false
        this.query()
      }
    }
  }
}
</script>
