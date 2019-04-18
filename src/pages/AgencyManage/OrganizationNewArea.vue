<!--
    1 新增区
    2 新增部
    organ 代替 organizationNewArea
-->
<template>
  <div class="organizationNewArea">
    <section class="header-title">{{showName}}</section>
    <div class="mb30"></div>
    <el-form :model="ruleForm" :rules="Rule.ORAGN_CREATEAREA" ref="ruleForm" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构选择" prop="o_id">
            <SelectChoose v-model="ruleForm.o_id" :disabled="ISdisabled"></SelectChoose>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="isShowid===2">
          <el-form-item label="上级组织" ref="agenForm" prop="t_pid">
            <el-select v-model="ruleForm.t_pid"  @change="handleGetGrade" :disabled="ISdisabled">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="isShowid===2">
          <el-form-item label="上级组织级别" prop="t_p_grade">
            <el-select v-model="ruleForm.t_p_grade" disabled>
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
          <el-form-item label="所属基本法" prop="r_id">
            <el-select v-model="ruleForm.r_id"  :disabled="ISdisabled">
              <el-option
                v-for="item in Dict.AGENCY_ORGANI_LAW"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
          <el-col :span="8">
          <el-form-item label="组织名称" prop="t_name">
            <el-input v-model="ruleForm.t_name" :maxlength="20" :disabled="ISdisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="组织级别" prop="t_grade">
            <el-select v-model="ruleForm.t_grade" disabled>
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
          <el-form-item label="组织状态" prop="t_status">
            <el-select v-model="ruleForm.t_status" >
              <el-option
                v-for="item in Dict.AGENCY_ORGANI_STATE"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建立日期" prop="t_create">
            <el-date-picker
            :disabled="ISdisabled"
              v-model="ruleForm.t_create"
              value-format="yyyy-MM-dd"
              type="date"
              >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="isShowName">
            <el-form-item label="主管工号">
              <el-input v-model="ruleForm.ag_job_number"   @blur="handleblur"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8" v-if="isShowName">
            <el-form-item label="主管名称">
              <el-input v-model="ruleForm.ag_name"  ></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="邮政编码">
              <el-input v-model="ruleForm.t_postcode" :maxlength="6" ></el-input>
            </el-form-item>
        </el-col>
          <el-col :span="8" v-if="isShowid===2">
          <el-form-item label="是否直辖" prop="name">
            <el-select v-model="ruleForm.t_directly"  >
              <el-option
                v-for="item in Dict.AGENCY_ORGANI_DIRECTLY"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="isShowName">
            <el-form-item label="手机号码">
              <el-input v-model="ruleForm.ag_phone"  ></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="联系地址">
              <el-input v-model="ruleForm.t_addr" :maxlength="60" ></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <div class="orgin-note">
              <el-input v-model="ruleForm.t_remark" type="textarea" maxlength="60"  class="organ-textarea"></el-input>
              <span class="organ-font">({{isNum}}/60)</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary" size="medium" plain @click="handleSave('ruleForm')">保存</el-button>
            <el-button type="primary" size="medium" plain @click="handleGoBack">返回</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
      ruleForm: {
        type: Number(this.$router.currentRoute.query.id),
        o_id: '',
        r_id: '',
        t_name: '',
        t_grade: '',
        t_status: '',
        t_create: '',
        ag_job_number: '',
        ag_name: '',
        ag_phone: '',
        t_addr: '',
        t_postcode: '',
        t_remark: '',
        t_directly: ''
      },
      gradeData: [],
      options: [],
      searchData: {
        o_id: '',
        t_name: '',
        t_code: '',
        t_status: '',
        t_grade: '',
        ag_name: '',
        t_pname: ''
      },
      isShowid: Number(this.$router.currentRoute.query.id), // 1:新增区 2: 新增部
      isShowvalue: Number(this.$router.currentRoute.query.value),
      isShowName: Number(this.$router.currentRoute.query.name) // 1: 区 2：部
    }
  },
  watch: {
    handler (val) {
      if (val) {
        this.options = []
        this.getOrganizaData(val)
        if (this.ruleForm.t_pid) {
          this.ruleForm.t_pid = ''
          this.ruleForm.t_p_grade = ''
          // this.$refs[ruleForm].clearValidate('t_pid')
        }
      }
    }
  },
  computed: {
    handler () {
      return this.ruleForm.o_id
    },
    showName () {
      if (this.isShowid) {
        if (this.isShowid === 1) {
          return '新增组织(区)'
        }
        if (this.isShowid === 2) {
          return '新增组织(部)'
        }
      } else {
        if (this.isShowName === 1) {
          return '修改组织(区)'
        } else {
          return '修改组织(部)'
        }
      }
    },
    isNum () {
      if (this.ruleForm.t_remark) {
        return 60 - Number(this.ruleForm.t_remark.length)
      } else {
        return 60
      }
    },
    ISdisabled () {
      if (this.isShowName) {
        return true
      }
    }
  },
  methods: {
    handleGetGrade (val) {
      this.gradeData.map((res) => {
        if (this.ruleForm.t_pid === res.t_id) {
          this.ruleForm.t_p_grade = res.t_grade
        }
      })
    },
    // 主管工号
    handleblur (val) {
      let name = val.target.value
      if (name) {
        this.handleGetData(name)
      } else {
        this.ruleForm.ag_name = ''
        this.ruleForm.ag_phone = ''
      }
    },
    async handleGetData (name) {
      let res = await this.$axios.send('TEAM_MANAGE_COMPETENT_SEARCH', '', {$jobnum: name})
      if (res.status_code === 0) {
        this.ruleForm.ag_name = res.result.ag_name
        this.ruleForm.ag_phone = res.result.ag_phone
      } else {
        this.ruleForm.ag_name = ''
        this.ruleForm.ag_phone = ''
      }
    },
    // 请求上级组织
    async getOrganizaData (val) {
      this.searchData.t_grade = 1
      this.searchData.o_id = val
      let res = await this.$axios.send('TEAM_MANAGE_LIST', this.searchData)
      if (res.status_code === 0) {
        let title, id
        this.gradeData = res.result
        res.result.map(item => {
          title = item.t_name
          id = item.t_id
          this.options.push({'value': id, 'label': title})
        })
        // this.ruleForm.t_pid = ''
      }
    },
    // 保存
    async handleSave (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // this.ruleForm.t_postcode = this.ruleForm.t_postcode || 'null'
          // this.ruleForm.ag_phone = this.ruleForm.ag_phone || 'null'
          let res
          if (this.isShowName) { // 修改
            res = await this.$axios.send('TEAM_MANAGE_PUT', this.ruleForm, {$id: this.isShowvalue})
          } else {
            res = await this.$axios.send('TEAM_MANAGE_ADD_AREA', this.ruleForm)
          }
          if (res.status_code === 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            if (!this.isShowName) {
              this.ruleForm = {
                type: Number(this.$router.currentRoute.query.id),
                o_id: '',
                r_id: '',
                t_name: '',
                t_grade: '',
                t_status: '',
                t_create: '',
                ag_job_number: '',
                ag_name: '',
                ag_phone: '',
                t_addr: '',
                t_postcode: '',
                t_remark: '',
                t_directly: ''
              }
              this.$refs[formName].resetFields()
              this.Tgrade()
            } else {
              window.history.go(-1)
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 返回
    handleGoBack () {
      window.history.go(-1)
    },
    // 回填数据
    async getReqData () {
      let res = await this.$axios.send('TEAM_MANAGE_DETAIL', '', {$id: this.isShowvalue})
      if (res.status_code === 0) {
        res.result.ag_phone = res.result.t_ag_phone // 主管手机号
        res.result.ag_name = res.result.t_ag_name // 主管名称
        res.result.ag_job_number = res.result.t_ag_job_number
        this.ruleForm.t_p_grade = res.result.t_pgrade
        this.ruleForm = res.result
      }
    },
    // 回填组织级别
    Tgrade () {
      if (this.isShowName === 1) {
        this.ruleForm.t_grade = 1
      } else {
        this.ruleForm.t_grade = 2
      }
      if (this.isShowid === 1) {
        this.ruleForm.t_grade = 1
      }
      if (this.isShowid === 2) {
        this.ruleForm.t_grade = 2
      }
    }
  },
  created () {
    this.Tgrade()
    this.ruleForm.t_create = this.$moment().format('YYYY-MM-D')
    if (this.isShowName) {
      this.getReqData()
    }
  },
  activated () {
    this.getReqData()
  }
}
</script>

<style lang="scss">
.organizationNewArea {
  .orgin-note{
    width: 60%;
    height: 250px;
    position: relative;
    .organ-font{
      margin:10px;
      display: inline-block;
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 2;
    }
  }
  .organ-textarea{
    .el-textarea__inner{
      width: 100%;
      height: 250px;
      resize: none;
    }

  }
}

</style>

<style scoped>
.el-form-item /deep/ .el-form-item__content {
    line-height: 0
}
</style>
