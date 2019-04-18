<template>
  <div>
    <section class="header-title mb20">{{$route.name}}</section>
    <el-form :model="formData" ref="formData" label-width="120px" :rules="Rule.COMPANY_EDIT" class="common-padding">
      <el-row>
        <el-col :span="8">
          <el-form-item label="保险公司全称" prop="c_name">
            <el-select v-model="formData.c_name" :disabled="id !=='0'" class="w100" @change="companyChange">
              <el-option v-for="dict in systemCompanyList" :key="dict.ic_id" :label="dict.ic_name" :value="dict.ic_name" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保险公司简称" prop="c_short_name">
            <el-input v-model="formData.c_short_name" disabled="" :maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保险公司代码" prop="c_code">
            <el-input v-model="formData.c_code" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合作状态" prop="c_status">
            <el-select class="w100" v-model="formData.c_status" >
              <el-option :label="'请选择'" :value="''"></el-option>
              <el-option v-for="item in Dict.COMPANY_STATUS" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="渠道服务电话" prop="c_tel">
            <el-input v-model="formData.c_tel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="合约期限" prop="dateRange">
              <el-date-picker
                v-model="formData.dateRange"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="tc" style="padding-bottom:20px;">
          <el-button type="primary" @click="save" v-if="id !== '0'" v-has="'COMPANY_MANAGE_EDIT'">保存</el-button>
          <el-button type="primary" @click="save" v-else v-has="'COMPANY_MANAGE_ADD'">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {Message} from 'element-ui'
import Common from '@/tools/common'
import edit from '@/mixin/edit'

export default {
  mixins: [edit],
  data () {
    return {
      formData: {
        c_name: '',
        c_short_name: '',
        c_code: '',
        c_tel: '',
        c_start: '',
        c_end: '',
        dateRange: []
      },
      id: null,
      systemCompanyList: []
    }
  },

  created () {
    this.init()
  },

  methods: {
    async init () {
      this.getSystemCompanyList()
      this.id = this.$route.params.id
      if (this.id !== '0') {
        await this.getItem(this.id)
      }
    },

    async save () {
      let ret = null
      let valid = await this.$refs.formData.validate()
      if (valid) {
        let params = Common.clone(this.formData)
        if (this.formData.dateRange && this.formData.dateRange.length > 0) {
          params.c_start = this.formData.dateRange[0]
          params.c_end = this.formData.dateRange[1]
        } else {
          params.c_start = ''
          params.c_end = ''
        }

        delete params.dateRange
        if (this.id === '0') {
          ret = await this.$axios.send('COMPANY_MANAGE_ADD', params)
          if (ret && ret.status_code === 0) {
            this.$refs.formData.resetFields()
            Message.success('添加成功')
            this.$refs.formData.resetFields()
          }
        } else {
          ret = await this.$axios.send('COMPANY_MANAGE_EDIT', params, {c_id: this.id})
          if (ret && ret.status_code === 0) {
            this.formData = {}
            Message.success('修改成功')
            this.$router.go(-1)
          }
        }
      }

      return ret
    },

    async getItem (id) {
      let ret = await this.$axios.send('COMPANY_MANAGE_DETAIL', '', {c_id: id})
      if (ret.status_code === 0) {
        if (ret.result.c_start) {
          ret.result.dateRange = [ret.result.c_start, ret.result.c_end]
        }
        this.formData = ret.result
      }
    },

    async getSystemCompanyList () {
      let ret = await this.$axios.send('SELECT_SYSTEM_COMPANY_LIST')
      if (ret && ret.status_code === 0) {
        this.systemCompanyList = ret.result
      }
    },

    companyChange (value) {
      let filter = this.systemCompanyList.filter(item => item.ic_name === value)
      if (filter.length > 0) {
        let item = filter[0]
        this.formData.c_short_name = item.ic_short_name
        this.formData.c_code = item.ic_code
      }
    }
  }
}
</script>
