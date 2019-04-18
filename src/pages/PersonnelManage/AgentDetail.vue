<!--
  代理人详情页
  agentDet 代替 AgentDetail
-->
<template>
  <div class="agentDetail">
    <section class="header-title">{{$route.name}}</section>
     <div class="common-padding">
      <el-form>
        <div class="commont-borderbox">
          <el-row>
          <el-col :span="24">
            <el-form-item label="个人信息" class="common-subTitle"></el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名：">
              <span>{{listData.ag_name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型：">
              <span>{{listData.ag_id_type|dict('CARD_TYPE')}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码：">
              <span>{{listData.ag_id_number}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别：">
              <span>{{listData.ag_sex|dict('GENDER')}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期：">
              <span>{{listData.ag_birthday}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="民族：">
              <span>{{listData.ag_nation_name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码：">
              <span>{{listData.ag_phone}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="婚姻状态：">
              <span>{{listData.ag_married|dict('AG_MARRIED')}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="籍贯：">
              <span>{{listData.ag_native}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文化程度：">
              <span>{{listData.ag_education|dict('AG_EDUCATION')}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱：">
              <span>{{listData.ag_email}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        </div>
      </el-form>
      <el-form>
        <div class="commont-borderbox">
          <el-row>
          <el-col :span="24">
            <el-form-item label="公司信息" class="common-subTitle"></el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工号：">
              <span>{{listData.ag_job_number}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同编号：">
              <span>{{listData.ag_contract_number}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在机构：">
              <span>{{listData.o_name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属组织：">
              <span>{{listData.t_name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入司时间：">
              <span>{{listData.ag_join_date}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="在职状态：">
              <span>{{listData.ag_status|dict('AG_STATUS')}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前职级：">
              <span>{{listData.j_g_name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="推荐人：">
              <span>{{listData.ref_name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="直接主管：">
              <span>{{listData.ag_leader_name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="推荐人工号：">
              <span>{{listData.ref_job_number}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="考核时间：">
              <span>{{listData.ag_assess_time}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行政主管：">
              <span>{{listData.ag_director}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入司职级：">
              <span>{{listData.initial_j_g_name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="二次入司：">
              <span>{{listData.ag_rejoin|dict('AG_REJOIN')}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分部：">
              <span>{{listData.ag_branch}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注：">
              <span>{{listData.ag_remark}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        </div>
      </el-form>
      <el-form>
        <div class="commont-borderbox">
          <el-row>
          <el-col :span="24">
            <el-form-item label="其他信息" class="common-subTitle"></el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行账号：">
              <span>{{listData.ag_bank_account}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户行：">
              <span>{{listData.ag_bank_name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="执业证号：">
              <span>{{listData.ag_license_number}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="执业证有效期：">
              <span>{{listData.ag_license_date}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        </div>
      </el-form>
      <el-form>
        <div>
          <el-row>
            <el-col :span="24">
              <el-form-item label="紧急联系人" class="common-subTitle"></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名：">
                <span>{{listData.ag_contact_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号：">
                <span>{{listData.ag_contact_phone}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      </div>
    <el-col :span="24" class="common-btn">
    <el-button type="primary" @click="handleSave">关闭</el-button>
    </el-col>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mid: Number(this.$router.currentRoute.query.id),
      listData: {}
    }
  },
  methods: {
    handleSave () {
      window.close()
    },
    async getRequireData () {
      let res = await this.$axios.send('AGENT_MANAGE_DETAIL', '', {$ag_id: this.mid})
      if (res.status_code === 0) {
        this.listData = res.result
      }
    }
  },
  created () {
    this.getRequireData()
  }
}
</script>

<style lang="scss">

</style>
