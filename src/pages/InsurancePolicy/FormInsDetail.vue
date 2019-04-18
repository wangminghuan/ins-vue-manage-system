<template>
  <div>
    <section class="header-title">{{$route.name}}</section>

    <el-card class="p20">
      <el-form :model="formData" label-suffix="：" v-if="Object.keys(formData).length > 0">
        <div class="detail-item">
          <p class="detail-title">基本信息</p>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="保险公司">{{formData.c_name}}</el-form-item>
            </el-col>
            <el-col :span="8" v-if="actionType === 1">
              <el-form-item label="投保单">{{formData.tb_code}}</el-form-item>
            </el-col>
            <el-col :span="8" v-if="actionType === 2">
              <el-form-item label="保单">{{formData.bd_code}}</el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="detail-item">
          <p class="detail-title">代理人</p>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="代理人工号">{{formData.ag_job_number}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代理人名称">{{formData.ag_name}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="销售机构代码">{{formData.o_code}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="销售机构名称">{{formData.o_name}}</el-form-item>
            </el-col>
            <el-col :span="8" v-if="actionType === 1">
              <el-form-item label="投保日期">{{formData.tb_date}}</el-form-item>
            </el-col>
            <el-col :span="8" v-if="actionType === 2">
              <el-form-item label="生效日期">{{formData.bd_time}}</el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="detail-item">
          <p class="detail-title">投保人</p>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名">{{formData.tb_name}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件类型">{{formData.tb_id_type|dict('CARD_TYPE')}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码">{{formData.tb_id_number}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别">{{formData.tb_sex|dict('GENDER')}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生日期">{{formData.tb_birthday}}</el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="证件有效期">
                <span v-if="formData.tb_id_longtime === 1">长期</span>
                <span v-if="formData.tb_id_longtime === 0">{{formData.tb_id_date}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工作单位">{{formData.tb_company}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职业工种">{{formData.tb_job}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码">{{formData.tb_phone}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮编">{{formData.tb_postcode}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱">{{formData.tb_email}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="详细地址">{{formData.tb_addr}}</el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="detail-item">
          <p class="detail-title">被保人</p>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="与投保人关系">{{formData.bb_tb_relation|dict('PERSON_RELATION')}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名">{{formData.recognizee.ir_name}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件类型">{{formData.recognizee.ir_id_type|dict('CARD_TYPE')}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码">{{formData.recognizee.ir_id_number}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别">{{formData.recognizee.ir_sex|dict('GENDER')}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生日期">{{formData.recognizee.ir_birthday}}</el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="证件有效期">
                <span v-if="formData.recognizee.ir_id_longtime === 0">{{formData.recognizee.ir_id_date}}</span>
                <span v-if="formData.recognizee.ir_id_longtime === 1">长期</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工作单位">{{formData.recognizee.ir_company}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职业工种">{{formData.recognizee.ir_job}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码">{{formData.recognizee.ir_phone}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮编">{{formData.recognizee.ir_postcode}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱">{{formData.recognizee.ir_email}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="详细地址">{{formData.recognizee.ir_addr}}</el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="detail-item">
          <p class="detail-title">受益人</p>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="受益人类型">{{formData.f_type|dict('BENEFICIARY')}}</el-form-item>
            </el-col>
          </el-row>
          <template v-if="formData.f_type === 1">
            <el-row v-for="(item, index) in formData.favoree" :key="item.name">
              <el-col :span="8">
                <el-form-item >第 {{index  + 1}} 受益人</el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="收益比例">{{item.f_percent}}%</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名">{{item.f_name}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件类型">{{item.f_id_type|dict('CARD_TYPE')}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码">{{item.f_id_number}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别">{{item.f_sex|dict('GENDER')}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出生日期">{{item.f_birthday}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号">{{item.f_phone}}</el-form-item>
              </el-col>
            </el-row>
          </template>
        </div>

        <div class="detail-item">
          <p class="detail-title">险种资料</p>
          <el-row v-for="item in formData.products" :key="item.name">
            <el-col :span="24">
              <el-form-item label="险种类型">{{item.sp_property|dict('PRODUCT_TYPE')}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="险种代码">{{item.p_code}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="险种名称">{{item.p_name}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保险期间">
                <span v-if="item.sp_bao_type === 0">{{item.sp_bao_type|dict('PRODUCT_BAO_TYPE')}}</span>
                <span v-else-if="item.sp_bao_type === 1">{{item.sp_bao_type|dict('PRODUCT_BAO_TYPE')}} - {{item.sp_bao_time}} 岁</span>
                <span v-else>{{item.sp_bao_time}} {{item.sp_bao_type|dict('PRODUCT_BAO_TYPE')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="缴费期间">
                <span v-if="item.sp_pay_type === 1">{{item.sp_pay_type|dict('PRODUCT_PAY_TYPE')}} {{item.sp_pay_time}} 岁</span>
                <span v-if="item.sp_pay_type === 2">{{item.sp_pay_time}} 年</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="缴费方式">{{item.sp_pay_way|dict('PRODUCT_PAY_WAY')}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="基本保险金额">{{item.sp_money}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保费">{{item.sp_premium}}</el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="detail-item">
          <p class="detail-title">缴费信息</p>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="首期保费合计">{{formData.pay_first}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户户主">{{formData.pay_name}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户银行">{{formData.pay_bank_name}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行卡号">{{formData.pay_account}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="逾期未付">
                <span v-if="formData.overdue_status === -1"></span>
                <span v-else>{{formData.overdue_status|dict('OVERDUE_STATUS')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="common-btn">
              <el-button type="primary" @click="close">关闭</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    actionType: {
      type: Number
    }
  },
  data () {
    return {
      id: null,
      formData: {}
    }
  },

  created () {
    this.id = this.$route.params.id
    this.init()
  },

  methods: {
    async init () {
      await this.getDetail()
    },

    close () {
      window.close()
    },

    async getDetail () {
      let ret = await this.$axios.send('TB_MANAGE_DETAIL', '', {s_id: this.id})
      if (ret && ret.status_code === 0) {
        this.formData = ret.result
      }
    }
  }
}
</script>

<style scoped>
  .p20 {
    padding: 20px;
  }

  .detail-title {
    margin-top: 20px;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .detail-item {
    border-bottom: 1px #DCDFE6 solid
  }
</style>
