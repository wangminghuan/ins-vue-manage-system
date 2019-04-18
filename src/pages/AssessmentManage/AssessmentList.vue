<!-- 产品列表 -->
<template>
  <div>
    <section class="header-title">{{$route.name}}</section>
    <div class="mb30"></div>
    <el-form :model="searchData" label-width="120px" class="common-padding">
      <el-row>
          <el-col :span="8">
            <el-form-item label="机构选择">
              <SelectChoose v-model="searchData.o_id" placeholder=""></SelectChoose>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组织名称">
              <el-input v-model="searchData.t_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="考核前职级">
              <el-input v-model="searchData.jg_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理人工号">
              <el-input v-model="searchData.ag_job_number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理人姓名">
              <el-input v-model="searchData.ag_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="考核月份">
              <el-date-picker
                placeholder="选择月份"
                value-format="yyyy-MM"
                v-model="searchData.a_e_time"
                :picker-options="disablePickerOptions"
                type="month"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="考核建议">
              <el-select v-model="searchData.a_e_result" placeholder="">
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="item in Dict.ASSESS_SUGGEST" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否考核保护">
                <el-select v-model="searchData.a_e_is_protection" placeholder="">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="item in Dict.IS_PROTECTION" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="">
              <el-button type="primary"  v-has="'EXAMINE_LIST'" @click="query(1)">查询</el-button>
              <el-button type="warning"  v-has="'EXAMINE_DISPOSE'" @click="assessment(1)" >考核确认</el-button>
              <el-button type="warning"  v-has="'EXAMINE_DISPOSE_CONFIRM'" @click="assessment(2)">修改</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="false">
               <!-- 测试按钮 -->
              <el-button type="danger"   @click="test(1)">调用考核预警脚本</el-button>
              <el-button type="danger"   @click="test(2)">调用21日生成考核建议结果脚本</el-button>
              <el-button type="danger"   @click="test(3)">调用26日处理考核建议处理结果关闭及默认执行动作的脚本 </el-button>
              <el-button type="danger"   @click="test(4)">调用生成薪资记录的脚本</el-button>
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
          <el-table-column prop="o_name" label="机构名称"></el-table-column>
          <el-table-column prop="t_name" label="组织名称"></el-table-column>
          <el-table-column  prop="ag_job_number" label="代理人工号"></el-table-column>
          <el-table-column  prop="ag_name" label="代理人姓名"></el-table-column>
          <el-table-column prop="a_e_time" label="考核月份" ></el-table-column>
          <el-table-column prop="jg_name" label="考核前职级"></el-table-column>
          <el-table-column prop="a_e_result" label="考核建议" >
            <template slot-scope="scope">
              {{scope.row.a_e_result|dict('ASSESS_SUGGEST')}}
            </template>
          </el-table-column>
          <el-table-column prop="a_e_is_protection" label="是否考核保护">
            <template slot-scope="scope">
              {{scope.row.a_e_is_protection|dict('IS_PROTECTION')}}
            </template>
          </el-table-column>
          <el-table-column prop="a_e_jg_name" label="考核确认职级"></el-table-column>
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

    <base-dialog :title="dialog.title" :isshow.sync="dialog.assessment" width="450px">
      <div>
        <el-form v-model="assessmentData">
          <p class="pl40">业绩明细</p>
          <el-form-item  class="pl80" :label="item.name" v-for="item in assessmentData.a_e_d_data" :key="item.name">
            {{item.value}}
          </el-form-item>
          <p class="pl40">考核确认</p>
          <el-form-item class="pl80" label="考核前职级">{{assessmentData.a_e_before_jg_name}}</el-form-item>
          <el-form-item class="pl80" label="考核预测">{{assessmentData.a_e_result|dict('ASSESS_SUGGEST')}}</el-form-item>
          <el-form-item class="pl80" label="是否考核保护">
            <el-radio-group v-model="assessmentData.a_e_is_protection">
              <el-radio :label="item.value" v-for="item in Dict.IS_PROTECTION" :key="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="pl80" label="职级确认">
            <select-job-grade v-model="assessmentData.a_e_jg_id" @jgName='setJGName'></select-job-grade>
          </el-form-item>
          <el-form-item class="tc pt20" label="">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="dialog.assessment = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </base-dialog>

    <base-dialog :title="dialog.title" :isshow.sync="dialog.confirm" width="350px" height="210px">
      <p  class="pl40">确定调整该人员职级为{{assessmentData.a_e_jg_name}}？</p>
      <p class="pl40 red" v-if="updateType === 1">本月26号生效，生效之后不允许修改</p>
      <section slot="footer" class="footer">
        <el-button type="primary" @click="assessmentAction">确 定</el-button>
        <el-button @click="dialog.confirm = false">取 消</el-button>
      </section>
    </base-dialog>
  </div>
</template>

<script>
import SelectChoose from '@/components/select/SelectChoose'
import SelectJobGrade from '@/components/select/SelectJobGrade'
import query from '@/mixin/query'
import BaseDialog from '@/components/base/BaseDialog'
import moment from 'moment'

export default {
  mixins: [query],
  components: {
    BaseDialog,
    SelectChoose,
    SelectJobGrade
  },
  data () {
    return {
      searchData: {
        a_e_result: '',
        a_e_is_protection: '',
        a_e_time: moment().format('YYYY-MM')
      },
      currSelected: null,
      updateType: 1, // 操作类型 1：考核修改 ， 2: 修改
      tableData: {
        data: [],
        total: 0,
        current_page: 1,
        perPage: 10
      },
      assessmentForm: {},
      assessmentData: {},
      dialog: {
        title: '考核确认',
        assessment: false,
        confirm: false
      },
      detailList: []
    }
  },

  created () {
    this.init()
  },

  methods: {
    init () {
      this.baseUrl = window.resourceBaseUrl
    },
    async query (page = 1) {
      this.searchData.perPage = 10
      this.searchData.page = page
      let ret = await this.$axios.send('EXAMINE_LIST', this.searchData)
      if (ret && ret.status_code === 0 && !Array.isArray(ret.result)) {
        this.tableData = ret.result
      }
    },

    async assessment (updateType) {
      this.updateType = updateType
      let data = {
        id: this.currSelected.a_e_id
      }
      let ret = await this.$axios.send('EXAMINE_DETAIL', '', data)
      if (ret && ret.status_code === 0) {
        this.dialog.assessment = true
        this.dialog.title = this.updateType === 1 ? '考核确认' : '确认修改'
        this.assessmentData = ret.result
        this.assessmentData.a_e_jg_id = this.assessmentData.a_e_jg_name ? '' : this.assessmentData.a_e_before_jg_id
      } else {
        this.assessmentData = {}
        this.assessmentData.a_e_d_data = []
      }
    },

    confirm () {
      this.dialog.title = this.updateType === 1 ? '考核确认' : '修改确认'
      this.dialog.assessment = false
      this.dialog.confirm = true
    },

    async assessmentAction () {
      let data = {
        a_e_jg_id: this.assessmentData.a_e_jg_id,
        a_e_jg_name: this.assessmentData.a_e_jg_name,
        a_e_is_protection: this.assessmentData.a_e_is_protection
      }
      let urlFlag = this.updateType === 1 ? 'EXAMINE_DISPOSE' : 'EXAMINE_DISPOSE_CONFIRM'
      let ret = await this.$axios.send(urlFlag, data, {id: this.currSelected.a_e_id})
      if (ret && ret.status_code === 0) {
        this.$message.success('操作成功')
        this.query(this.tableData.current_page)
      }

      this.dialog.confirm = false
    },

    setJGName (value) {
      this.assessmentData.a_e_jg_name = value
    },

    async test (type) {
      let data = {
        type: type
      }

      await this.$axios.send('RUN_TEST_SCRIPT', data)
      this.$message.success('执行成功')
    }
  }
}
</script>

<style scoped>
  .pl40{
    padding-left: 40px;
  }
  .pl80{
    padding-left: 80px;
  }

  .pt20 {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .el-form-item {
    margin-bottom: 10px !important;
  }

  .red {
    color: red;
    font-size: 14px;
  }
</style>
