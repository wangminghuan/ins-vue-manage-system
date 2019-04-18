<!--
  机构录入 机构修改
-->
<template>
  <div class="agencyEdit">
    <section class="header-title">{{isShowid?'机构修改':'机构录入'}}</section>
    <div class="mb30"></div>
    <el-form :model="formData" :rules="Rule.ORAGN_CREATE" ref="formData" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构名称" prop="o_name" >
            <el-input v-model="formData.o_name"   :disabled="disabled" :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <SelectAgency v-model="formData.o_g_id" :disabled="disabled"></SelectAgency>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上级机构" >
            <el-select v-model="formData.o_pid" filterable   :disabled="disabled">
              <el-option
                v-for="item in orginOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24"></el-col>
        <el-col :span="8">
          <el-form-item label="负责人姓名" prop="o_user">
            <el-input v-model="formData.o_user" :maxlength="10" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属地区" prop="o_province">
            <!-- <Vuearea :isShow="isShowArea" :disabled="disabled" v-model="textnam" :placeholder="'请选择地区'"></Vuearea> -->
            <el-cascader
              v-if="isShowArea"
              placeholder="请选择地区"
              :options="options"
              filterable
              v-model="textnam"
              change-on-select
              :disabled="disabled"
              @change="handledata"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号" prop="o_phone">
            <el-input v-model="formData.o_phone"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成立时间" prop="o_create">
            <el-date-picker
              :disabled="disabled"
              v-model="formData.o_create"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="date"
              >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="o_status">
             <el-select v-model="formData.o_status"  >
                <el-option
                  v-for="item in Dict.AGENCY_STATUS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="common-btn" style="padding: 60px 0 42px;">
          <el-button type="primary" v-if="isShowid" @click="handleSave('formData')" v-has="'ORGANI_MANAGE_UPDATE'">保存</el-button>
          <el-button type="primary" v-else @click="handleSave('formData')" v-has="'ORGANI_MANAGE_ADD'">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Vuearea from '@/components/base/VueareaLinkage'
import SelectAgency from '@/components/select/SelectAgency'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
export default {
  components: {
    Vuearea,
    SelectAgency
  },
  data () {
    return {
      options: regionData,
      textnam: [],
      isShowArea: true,
      isShowid: Number(this.$router.currentRoute.query.id),
      formData: {
        o_name: '',
        o_g_id: '',
        o_pid: '',
        o_user: '',
        o_phone: '',
        o_province: '',
        o_city: '',
        o_area: '',
        o_create: '',
        o_status: ''
      },
      orginOption: []
    }
  },
  watch: {
    formDataOgid (val) {
      if (this.isShowid) return
      this.getRequireData(val)
      this.formData.o_pid = ''
    }
  },
  computed: {
    disabled () {
      if (this.isShowid) {
        return true
      }
    },
    formDataOgid () {
      return this.formData.o_g_id
    }
  },
  methods: {
    handledata (val) {
      let array = ['o_province', 'o_city', 'o_area']
      for (let k in val) {
        this.formData[array[k]] = CodeToText[val[k]]
      }
    },
    // 更新录入
    updataInput (formName) {
      this.$refs[formName].resetFields()
      this.formData.o_province = ''
      this.formData.o_city = ''
      this.formData.o_area = ''
      this.textnam = []
      this.formData.o_id = ''
      this.formData.o_pid = ''
      this.isShowArea = false
      setTimeout(() => { this.isShowArea = true }, 0)
    },
    // 保存
    async handleSave (formName) {
      this.handledata(this.textnam)
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // this.formData.o_pid = this.formData.o_id
          let res
          if (this.isShowid) { // 更新
            res = await this.$axios.send('ORGANI_MANAGE_UPDATE', this.formData, {$id: this.isShowid})
          } else {
            res = await this.$axios.send('ORGANI_MANAGE_ADD', this.formData)
          }
          if (res.status_code === 0) {
            if (this.isShowid) { this.$router.push({path: 'List'}) } else { this.updataInput('formData') }
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          }
        } else {
          return false
        }
      })
    },
    // 请求上级机构列表
    async getRequireData (val) {
      this.orginOption = []
      let res = await this.$axios.send('SELECT_ORGANI_SUPER', {o_g_id: val || ''})
      if (res.status_code === 0) {
        let title, id
        res.result.map(item => {
          title = item.o_name
          id = item.o_id
          this.orginOption.push({ value: id, label: title })
        })
      }
    },
    // init数据回填
    async dataCallBack () {
      let res = await this.$axios.send('ORGANI_MANAGE_DETAIL', '', {$id: this.isShowid})
      if (res.status_code === 0) {
        let backData = res.result
        let num1, num2, num3
        if (backData.o_province) {
          num1 = TextToCode[backData.o_province].code
        } else if (backData.o_city) {
          num2 = TextToCode[backData.o_province][backData.o_city].code
        } else if (backData.o_area) {
          num3 = TextToCode[backData.o_province][backData.o_city][backData.o_area].code
        }
        this.textnam = [num1, num2, num3]
        this.formData = backData
        this.orginOption.push({ value: backData.o_pid, label: backData.o_pname })
      }
    }
  },
  created () {
    if (this.isShowid) { // 数据回填
      this.dataCallBack()
    } else {
      this.getRequireData()
    }
  }
}
</script>

<style lang="scss">
.agencyEdit{
  .area-select.large{
    width: 230px;
  }
}
</style>
