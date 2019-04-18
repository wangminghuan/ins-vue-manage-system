<!-- 产品录入 -->
<template>
  <div>
    <section class="header-title mb30">{{$route.name}}</section>
    <el-form ref="formData" :model="formData" label-width="100px" :rules="Rule.PRODUCT_EDIT" class="common-padding">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="产品代码" prop="p_code">
            <el-input v-model="formData.p_code" :maxlength="20"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保险公司" prop="c_id">
            <select-company v-model="formData.c_id" :editType='editType' ></select-company>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品名称" prop="p_name">
            <el-input v-model="formData.p_name" :maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="产品简称" prop="p_short_name">
            <el-input v-model="formData.p_short_name" :maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="销售状态" prop="p_status">
            <el-select v-model="formData.p_status"  class="w100">
              <el-option v-for="item in Dict.PRODUCT_STATUS" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主附险类型" prop="p_property">
            <el-select v-model="formData.p_property"  class="w100">
              <el-option v-for="item in Dict.PRODUCT_PROPERTY" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="产品类型" prop="p_type">
            <el-select v-model="formData.p_type"  class="w100">
              <el-option v-for="item in Dict.PRODUCT_TYPE" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="起始承保年龄" prop="p_start_age">
            <el-input v-model="formData.p_start_age" :maxlength="3"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="8">
          <el-form-item label="截止承保年龄" prop="p_end_age">
            <el-input v-model="formData.p_end_age" :maxlength="3"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="继续率" prop="p_r13_type">
            <el-select v-model="formData.p_r13_type" placeholder="">
              <el-option>请选择</el-option>
              <el-option v-for="item in Dict.IS_CONTINUE" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-left: 25px;" class="mb20">
          <el-tabs v-model="activeName">
              <el-tab-pane label="保险责任" name="duty">
                <el-input
                  type="textarea"
                  :rows="20"
                  :autosize="{ minRows: 15, maxRows: 20}"

                  v-model="formData.p_duty">
                </el-input>
              </el-tab-pane>
              <el-tab-pane label="投保规则" name="rule">
                <el-input
                  type="textarea"
                  :rows="20"
                  :autosize="{ minRows: 15, maxRows: 20}"

                  v-model="formData.p_rule">
                </el-input>
              </el-tab-pane>
              <el-tab-pane label="免责条款" name="disclaimer">
                <el-input
                  type="textarea"
                  :rows="20"
                  :autosize="{ minRows: 15, maxRows: 20}"

                  v-model="formData.p_disclaimer">
                </el-input>
              </el-tab-pane>
              <el-tab-pane label="详细条款" name="detail">
                <el-input
                  type="textarea"
                  :rows="20"
                  :autosize="{ minRows: 15, maxRows: 20}"

                  v-model="formData.p_detail">
                </el-input>
              </el-tab-pane>
              <el-tab-pane label="病种描述" name="disease">
                <el-input
                  type="textarea"
                  :rows="20"
                  :autosize="{ minRows: 15, maxRows: 20}"

                  v-model="formData.p_disease">
                </el-input>
              </el-tab-pane>
              <el-tab-pane label="险种描述" name="insurance">
                <el-input
                  type="textarea"
                  :rows="20"
                  :autosize="{ minRows: 15, maxRows: 20}"

                  v-model="formData.p_insurance">
                </el-input>
              </el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col :span="24" class="tc" style="padding-bottom:20px;">
          <el-button type="primary" v-if="id === '0'" v-has="'PRODUCT_MANAGE_ADD'" @click="save">保存</el-button>
          <el-button type="primary" v-else v-has="'PRODUCT_MANAGE_UPDATE'" @click="save">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import SelectCompany from '@/components/select/SelectCompany.vue'
import edit from '@/mixin/edit'

export default {
  mixins: [edit],
  components: {
    SelectCompany
  },
  data () {
    return {
      activeName: 'duty',
      formData: {
        p_name: '',
        p_short_name: '',
        p_code: '',
        p_status: '',
        p_property: '',
        p_type: '',
        p_start_age: '',
        p_end_age: '',
        p_bao_type: '',
        p_bao_time: '',
        p_pay_type: '',
        p_pay_time: '',
        p_pay_way: '',
        p_duty: '',
        p_rule: '',
        p_disclaimer: '',
        p_detail: '',
        p_disease: '',
        p_insurance: ''
      },
      id: null
    }
  },

  created () {
    this.init()
    this.validators()
  },

  methods: {
    async init () {
      this.id = this.$route.params.id
      this.editType = this.id === '0' ? 'add' : 'update'
      if (this.id !== '0') {
        await this.getDetail(this.id)
      }
    },
    async save () {
      let valid = await this.$refs.formData.validate()
      if (valid) {
        if (this.id === '0') {
          let ret = await this.$axios.send('PRODUCT_MANAGE_ADD', this.formData)
          if (ret && ret.status_code === 0) {
            this.$message.success('保存成功')
            this.reset()
          }
        } else {
          let ret = await this.$axios.send('PRODUCT_MANAGE_UPDATE', this.formData, {p_id: this.id})
          if (ret && ret.status_code === 0) {
            this.$message.success('保存成功')
            this.$router.go(-1)
          }
        }
      }
    },

    reset () {
      this.$refs.formData.resetFields()
      this.formData.p_bao_time = ''
      this.formData.p_pay_time = ''
      let vm = this
      setTimeout(() => {
        vm.$refs.formData.resetFields()
      }, 200)
    },

    async getDetail (id) {
      let ret = await this.$axios.send('PRODUCT_MANAGE_DETAIL', '', {p_id: this.id})
      if (ret && ret.status_code === 0) {
        this.formData = ret.result
      }
    },

    /**
     * 保险期间类型组件切换下拉菜单是,需要根据状态动态添加校验,清空值
     */
    changeBaoType (value) {
      if (value === 0) {
        this.formData.p_bao_time = ''
      }
    },

    validators () {
      let vm = this
      this.Rule.PRODUCT_EDIT.p_pay_type[1] = {
        trigger: 'blur',
        message: '缴费期间的值不能为空',
        validator: (rule, value, callback) => {
          if (!vm.formData.p_pay_time) {
            callback(new Error())
          } else {
            callback()
          }
        }
      }

      this.Rule.PRODUCT_EDIT.p_bao_type[1] = {
        validator: function (rule, value, callback) {
          if (vm.formData.p_bao_type !== 0 && !vm.formData.p_bao_time) {
            callback(new Error())
          } else {
            callback()
          }
        },
        trigger: ['blur'],
        message: '保险期间的值不能为空'
      }
    }
  }
}
</script>
