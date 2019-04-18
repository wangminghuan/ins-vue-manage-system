<!-- 代理人录入 -->
<template>
  <div>
    <section class='header-title'>{{id=='0'?'代理人录入':'代理人修改'}}

      <span class="fr" v-if="id==='0'">
        <el-upload class="import-btn" action="upload" :http-request="upload" :show-file-list="false" :accept="'.xls, .xlsx'">
          <span><el-button type="primary" size="small" v-has="'AGENT_MANAGE_IMPORT'">批量导入</el-button></span>
        </el-upload>
      </span>

      <span class="fr" v-if="id==='0'">
        <a class="el-button el-button--primary el-button--small download-btn" v-has="'AGENT_MANAGE_EXPORT'" :href="`${baseUrl}template/代理人导入数据模板.xlsx`" download="代理人导入数据模板.xlsx" type="primary" size="small">导入模板下载</a>
      </span>
    </section>

    <el-form :model='formData' label-width='120px' :rules='Rule.AGENT_EDIT' ref="formData">
      <div class='entry-boder'>
        <base-collapse-card title='基本信息'>
          <el-row class='pr20'>
            <el-col :span='8'>
              <el-form-item label='姓名' prop='ag_name'>
                <el-input v-model='formData.ag_name' :maxlength="10" :disabled="isDisabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='证件类型' prop='ag_id_type'>
                <el-select v-model='formData.ag_id_type' @change='idTypeChange(formData.ag_id_type, Rule.AGENT_EDIT.ag_id_number)' :disabled="isDisabled">
                  <el-option v-for='item in Dict.CARD_TYPE' :key='item.value' :value='item.value' :label='item.label'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='证件号码' prop='ag_id_number'>
                <el-input v-model='formData.ag_id_number' @blur="handleGenderYears" :maxlength="20" :disabled="isDisabled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='pr20'>
            <el-col :span='8'>
              <el-form-item label='性别' prop='ag_sex'>
                <el-select v-model='formData.ag_sex' :disabled="isDisabled">
                  <el-option v-for='item in Dict.GENDER' :key='item.value' :value='item.value' :label='item.label'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='出生日期' prop='ag_birthday'>
                <el-date-picker
                  :disabled="isDisabled"
                  v-model='formData.ag_birthday'
                  value-format='yyyy-MM-dd'
                  type='date'
                   >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='民族' prop='ag_nation'>
                <select-nation v-model='formData.ag_nation' :disabled="isDisabled"></select-nation>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='pr20'>
            <el-col :span='8'>
              <el-form-item label='文化程度' prop='ag_education'>
                <el-select v-model='formData.ag_education'    >
                  <el-option v-for='item in Dict.AG_EDUCATION' :key='item.value' :value='item.value' :label='item.label'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='婚姻状态' prop='ag_married'>
                <el-select v-model='formData.ag_married'    >
                  <el-option v-for='item in Dict.AG_MARRIED' :key='item.value' :value='item.value' :label='item.label'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='籍贯' prop='ag_native'>
                <el-input v-model='formData.ag_native' :maxlength="50" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='pr20'>
            <el-col :span='8'>
              <el-form-item label='手机号' prop='ag_phone'>
                <el-input v-model='formData.ag_phone'  ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='详细地址' prop='ag_address'>
                <el-input v-model='formData.ag_address' :maxlength="50" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='邮箱' prop="ag_email">
                <el-input type="email" v-model='formData.ag_email' ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </base-collapse-card>
      </div>

      <div class='entry-boder'>
        <base-collapse-card title='公司信息'>
          <el-row class='pr20'>
            <el-col :span='8'>
              <el-form-item label='工号' prop='ag_job_number'>
                <el-input v-model='formData.ag_job_number' :maxlength="30" :disabled="isDisabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='合同号码' prop='ag_contract_number'>
                <el-input v-model='formData.ag_contract_number' :maxlength="30" :disabled="isDisabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='所属机构' prop='o_id'>
                <SelectOrganization v-model='formData.o_id' :disabled="isDisabled"></SelectOrganization>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='pr20'>
            <el-col :span='8'>
              <el-form-item label='所属组织' prop='t_id'>
                <SelectOrganList v-model='formData.t_id' :id="formData.o_id" :disabled="isDisabled"></SelectOrganList>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='入司时间' prop='ag_join_date'>
                <el-date-picker
                :disabled="isDisabled"
                  v-model="formData.ag_join_date"
                  value-format="yyyy-MM-dd"
                  type="date"
                  >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='在职状态' prop='ag_status'>
                <el-select v-model='formData.ag_status' disabled>
                  <el-option v-for='item in Dict.AG_STATUS' :key='item.value' :value='item.value' :label='item.label'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='pr20'>
            <el-col :span='8'>
              <el-form-item label='当前职级' prop='jg_id'>
                <select-job-grade v-model='formData.jg_id' :disabled="isDisabled"></select-job-grade>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='推荐人工号' prop='ref_job_number'>
                <el-input v-model='formData.ref_job_number' clearable @blur="handleBlur"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='推荐人'>
                <el-input v-model='formData.ref_name' disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='pr20'>
            <el-col :span='8'>
              <el-form-item label='直接主管' prop='ag_leader' >
                <el-select v-model="formData.ag_id" filterable clearable :disabled="disabled">
                <el-option
                  v-for="item in optionsData"
                  :key="item.ag_id"
                  :label="item.ag_name"
                  :value="item.ag_id">
                  <span style="float: left">{{ item.ag_name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.ag_job_number }}</span>
                </el-option>
              </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='考核时间' prop='ag_assess_time'>
                <el-date-picker
                  :disabled="isDisabled"
                  v-model='formData.ag_assess_time'
                  value-format='yyyy-MM-dd'
                  type='date'>
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='行政主管' prop='ag_director'>
                <el-input v-model='formData.ag_director' :maxlength="10" :disabled="isDisabled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='pr20'>
            <el-col :span='8'>
              <el-form-item label='入司职级' prop='initial_jg_id'>
                <select-job-grade v-model='formData.initial_jg_id' :disabled="isDisabled"></select-job-grade>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='二次入司' prop='ag_rejoin'>
                <el-select v-model='formData.ag_rejoin' :disabled="isDisabled" >
                  <el-option v-for='item in Dict.AG_REJOIN' :key='item.value' :value='item.value' :label='item.label'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='分部' prop='ag_branch'>
                <el-input v-model='formData.ag_branch' :maxlength="20" :disabled="isDisabled" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='pr20'>
            <el-col :span='8'>
              <el-form-item label='备注' prop='ag_remark'>
                <el-input v-model='formData.ag_remark' :maxlength="50" :disabled="isDisabled" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </base-collapse-card>
      </div>

      <div class='entry-boder'>
        <base-collapse-card title='其他信息'>
          <el-row class='pr20'>
            <el-col :span='8'>
              <el-form-item label='银行账号' prop='ag_bank_account'>
                <el-input v-model='formData.ag_bank_account' :maxlength="25"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='开户行' prop='ag_bank'>
                <select-bank v-model='formData.ag_bank' ></select-bank>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='执业证号' prop='ag_license_number'>
                <el-input v-model='formData.ag_license_number' :maxlength="30"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='执业证有效期' prop='ag_license_date'>
                <el-date-picker
                  v-model='formData.ag_license_date'
                  value-format='yyyy-MM-dd'
                  type='date'>
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </base-collapse-card>
      </div>

      <div class='entry-boder'>
        <base-collapse-card title='紧急联系人'>
          <el-row class='pr20'>
            <el-col :span='8'>
              <el-form-item label='姓名' prop='ag_contact_name'>
                <el-input v-model='formData.ag_contact_name' :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label='手机号' prop='ag_contact_phone'>
                <el-input v-model='formData.ag_contact_phone' ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </base-collapse-card>
      </div>
      <div class='tc common-btn'>
        <el-button v-if="id" type='success' @click="save('formData')" v-has="'AGENT_MANAGE_EDIT'">保存</el-button>
        <el-button v-else type='success' @click="save('formData')" v-has="'AGENT_MANAGE_ADD'">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import common from '@/tools/common.js'
import BaseCollapseCard from '@/components/base/BaseCollapseCard.vue'
import SelectBank from '@/components/select/SelectBank'
import SelectNation from '@/components/select/SelectNation'
import SelectOrganization from '@/components/select/SelectOrganization'
import SelectOrganList from '@/components/select/SelectOrganList'
import SelectJobGrade from '@/components/select/SelectJobGrade'
import Validator from '@/config/validator'

export default {
  components: {
    BaseCollapseCard,
    SelectBank,
    SelectNation,
    SelectOrganization,
    SelectOrganList,
    SelectJobGrade
  },
  data () {
    return {
      baseUrl: '',
      optionsData: [],
      isSwitch: false,
      loading: false,
      name: '',
      formData: {
        ref_name: '',
        ag_name: '',
        ag_id_type: '',
        ag_sex: '',
        ag_id_number: '',
        ag_birthday: '',
        ag_nation: '',
        ag_education: '',
        ag_married: '',
        ag_native: '',
        ag_phone: '',
        ag_address: '',
        ag_email: '',
        ag_job_number: '',
        ag_contract_number: '',
        o_id: '',
        t_id: '',
        jg_id: '',
        ag_join_date: '',
        ref_id: '',
        ref_job_number: '',
        leader: '',
        ag_id: '',
        ag_leader: '',
        ag_status: '',
        ag_assess_time: '',
        ag_director: '',
        initial_jg_id: '',
        ag_rejoin: '',
        ag_branch: '',
        ag_remark: '',
        ag_bank_account: '',
        ag_bank: '',
        ag_license_number: '',
        ag_license_date: '',
        ag_contact_name: '',
        ag_contact_phone: ''
      },
      id: ''
    }
  },
  computed: {
    tid () {
      return this.formData.t_id
    },
    oid () {
      return this.formData.o_id
    },
    disabled () {
      if (this.formData.t_id && this.formData.o_id) {
        return false
      }
    },
    isDisabled () {
      if (this.name && this.name !== '待入司') {
        return true
      }
    }
  },
  methods: {
    // 身份证
    handleGenderYears (e) {
      let user = common.getPersonByIdCardNum(e.target.value)
      if (user) {
        this.formData.ag_birthday = user.birthday
        this.formData.ag_sex = user.sex
      } else {
        this.formData.ag_birthday = ''
        this.formData.ag_sex = null
      }
    },
    // 推荐人工号
    async handleBlur (e) {
      let value = e.target.value
      if (value) {
        let res = await this.$axios.send('TEAM_MANAGE_COMPETENT_SEARCH', '', {$jobnum: value})
        if (res.status_code === 0) {
          this.formData.ref_name = res.result.ag_name
          this.formData.ref_id = res.result.ag_id
        } else {
          this.formData.ref_job_number = ''
          this.formData.ref_name = ''
          this.formData.ref_id = ''
        }
      } else {
        this.formData.ref_job_number = ''
        this.formData.ref_name = ''
        this.formData.ref_id = ''
      }
    },
    // 获取直接主管
    async remoteData () {
      // this.optionsData = []

      let res = await this.$axios.send('SELECT_AGENTBY_NAME', {t_id: this.formData.t_id, o_id: this.formData.o_id})
      this.optionsData = res.result

      // this.formData.leader = ''
      // this.optionsData = []
    },
    // // 证件类型
    // idTypeChange (value) {
    //   if (value === 11) {
    //     this.isSwitch = true
    //   } else {
    //     this.isSwitch = false
    //   }
    // },

    idTypeChange (value, rule) {
      if (Array.isArray(rule)) {
        if (value === 11) {
          rule[1] = {
            validator: Validator.idCard,
            message: '身份证格式不正确',
            trigger: 'blur'
          }
        } else {
          rule.splice(1, 1)
        }
      }
    },

    async save (formData) {
      // this.formData.ag_leader = this.formData.leader
      this.formData.ag_leader = this.formData.ag_id
      this.$refs[formData].validate(async (valid) => {
        if (valid) {
          if (this.id === '0') {
            let ret = await this.$axios.send('AGENT_MANAGE_ADD', this.formData)
            if (ret && ret.status_code === 0) {
              this.$router.push({name: '代理人管理'})
              this.$message.success('添加成功')
            }
          } else {
            let ret = await this.$axios.send('AGENT_MANAGE_EDIT', this.formData, {ag_id: this.id})
            if (ret && ret.status_code === 0) {
              this.$router.push({name: '代理人管理'})
              this.$message.success('修改成功')
            }
          }
        } else {
          return false
        }
      })
    },
    async init () {
      this.id = this.$route.params.id
      this.name = this.$route.params.name
      if (this.id !== '0') {
        await this.getDetail()
        this.remoteData()
      } else {
        this.remoteData()
        let time = this.$moment().format('YYYY-MM-DD')
        this.formData.ag_join_date = time
        this.formData.ag_status = 0
      }
    },

    async getDetail () {
      let ret = await this.$axios.send('AGENT_MANAGE_DETAIL', '', {$ag_id: this.id})
      if (ret && ret.status_code === 0) {
        this.formData.ref_name = ret.result.ref_name
        this.formData.ref_id = ret.result.ref_id
        this.formData = ret.result
        if (ret.result.ag_assess_time.substring(0, 4) === '0000') {
          this.formData.ag_assess_time = ''
        }
        if (ret.result.ag_license_date.substring(0, 4) === '0000') {
          this.formData.ag_license_date = ''
        }
        if (ret.result.ag_join_date.substring(0, 4) === '0000') {
          this.formData.ag_join_date = ''
        }
        this.formData.ag_nation = Number(ret.result.ag_nation)
        this.formData.ag_bank = Number(ret.result.ag_bank)
        this.formData.t_id = ret.result.t_id
      }
    },

    async upload (params) {
      this.loading = true
      let fileObject = params.file
      let action = '/agent/storeMore'
      let form = new FormData()
      form.append('file', fileObject)
      form.append('action_type', this.actionType)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'},
        responseType: 'blob'
      }
      let ret = await this.$axios.post(action, form, config)
      if (ret && ret.status_code === 0) {
        this.loading = false
        this.$message.success('导入成功')
      } else {
        common.downloadFile(ret, '错误数据.xlsx')
      }
    }
  },
  mounted () {
    this.baseUrl = window.resourceBaseUrl
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.entry-boder{
  padding: 0 20px;
  border-bottom: 20px solid #F5F5F5;
}
.el-collapse{
  border-top: 0px !important;
  border-bottom: 0px !important;
}
.el-collapse-item__wrap{
  border-bottom: 0px !important;
}

.import-btn {
  margin-left: 10px;
}

.download-btn {
  text-decoration: none;
}
</style>
