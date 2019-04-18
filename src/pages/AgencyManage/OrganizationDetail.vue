<!--
    组织详情
    Organiza 代替 OrganizationDetail
-->
<template>
<div class="organizationDetail">
<section class="header-title">组织详情</section>
<div class="mb30"></div>
<el-form label-width="120px">
<el-row>
<el-col :span="8">
<el-form-item label="所属机构：">
<span>{{detailData.o_name}}</span>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="所属基本法：">
<span>{{detailData.r_id|dict('AGENCY_ORGANI_LAW')}}</span>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="上级组织：">
<span>{{detailData.t_pname}}</span>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="上级组织级别：">
<span>{{detailData.t_pgrade}}</span>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="组织状态：">
<span>{{detailData.t_status|dict('AGENCY_ORGANI_STATUS')}}</span>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="组织代码：">
<span>{{detailData.t_code}}</span>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="组织名称：">
<span>{{detailData.t_name}}</span>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="组织级别：">
<span>{{detailData.t_grade}}</span>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="主管名称：">
<span>{{detailData.t_ag_name}}</span>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="主管职级：">
<span>{{detailData.t_ag_job_grade}}</span>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="建立日期：">
<span>{{detailData.t_create}}</span>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="手机号码：">
<span>{{detailData.t_ag_phone}}</span>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="邮政编码：">
<span>{{detailData.t_postcode}}</span>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="是否直辖：">
<span>{{detailData.t_directly}}</span>
</el-form-item>
</el-col>
<el-col :span="24">
<el-form-item label="联系地址：">
<span>{{detailData.t_addr}}</span>
</el-form-item>
</el-col>
<el-col :span="24">
<el-form-item label="备注：">
<span>{{detailData.t_remark}}</span>
</el-form-item>
</el-col>
<el-col :span="24" class="common-btn">
<el-button type="primary" @click="handleSave">关闭</el-button>
</el-col>
</el-row>
</el-form>
</div>
</template>

<script>
export default {
  data () {
    return {
      m_id: Number(this.$router.currentRoute.query.id),
      detailData: {}
    }
  },
  methods: {
    // 返回
    handleSave () {
      window.close()
    },
    // 请求数据
    async getRequireData () {
      let res = await this.$axios.send('TEAM_MANAGE_DETAIL', '', { $id: this.m_id })
      if (res.status_code === 0) {
        this.detailData = res.result
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
