<template>
  <div>
    <section class="header-title">{{$route.name}}

      <span class="fr">
        <el-upload class="import-btn" v-has="'PC_IMPORT'" action="upload" :http-request="upload" :show-file-list="false" :accept="'.xls, .xlsx'">
            <el-button type="primary"  size="small">导入</el-button>
        </el-upload>
      </span>
      <span class="fr">
        <a v-has="'PC_EXPORT'" class="el-button download-btn el-button--primary el-button--small download-btn" :href="`${baseUrl}template/产品佣金费率导入.xlsx`" download="产品佣金费率导入.xlsx" type="primary" size="small">导入模板下载</a>
      </span>
    </section>
    <el-row class="pd20">
      <el-form :model="formData">
        <el-row>
          <el-col :span="8">
            <el-form-item label="产品名称：">
              {{formData.p_name}}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="基本法：">
              <el-select v-model="formData.rule_id">
                <el-option label="基本法1" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="佣金方案：">
              <span v-if="isNew">默认方案</span>
              <el-radio-group v-model="formData.r_default" v-else>
                <el-radio-button v-for="item in Dict.PRODUCT_PLAN" :label="item.value"  :key="item.value">
                  {{item.label}}
                  <span v-if="isDefault === item.value">(使用中)</span>
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="formData.r_default !== 1">
          <el-col :span="8">
            <el-form-item label="开始时间：">
              <el-date-picker
                v-model="formData.r_start"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束时间：">
              <el-date-picker
                v-model="formData.r_end"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="缴费年限：">
              <el-input-number v-model="rowNum" @change="rowChange" class="el-number" :min="1" :max="30" label="描述文字"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保单年度：">
              <el-input-number v-model="colNum" @change="colChange" class="el-number" :min="1" :max="10" label="描述文字"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col class="mb15" :span="24">
          <span style="color: red; font-size: 14px">提示：行和列可以自由调整，保单年度最多 10 年，缴费年限最多 30 年。佣金费率没有值默认为 0。</span>
        </el-col>
        <el-col :span="24" class="mb15">
          <el-table
            :data="formData.r_data"
            border
            style="width: 100%">
            <template v-for="(header, index) in formData.headers">
              <el-table-column v-if="index === 0" min-width="150" :label="header.label" :key="header.prop">
                <template slot-scope="scope">
                  <el-input class="w50" v-model="scope.row[header.prop]" size="small" :maxlength="2" ></el-input> 年缴
                </template>
              </el-table-column>
              <el-table-column v-if="index !== 0" min-width="150" :label="header.label" :key="header.prop">
                <template slot-scope="scope">
                   <el-input class="w50" v-model="scope.row[header.prop]" size="small" :maxlength="3">
                     <i slot="suffix"  class="el-input__icon select-input-suffix">%</i>
                   </el-input>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </el-col>
        <el-col :span="24" class="tc">
          <el-button type="primary" v-has="'PRODUCT_RATE_UPDATE'" @click="save">保存</el-button>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import Common from '@/tools/common'

export default {
  data () {
    return {
      baseUrl: '',
      isDefault: 1,
      formData: {
        r_default: 0,
        rule_id: 1,
        p_name: ''
      },
      isNew: true,
      rowNum: 5,
      colNum: 5,
      id: null
    }
  },

  created () {
    this.baseUrl = window.resourceBaseUrl
    this.init()
  },

  methods: {
    async init () {
      this.id = this.$route.params.id
      await this.getDetail()
    },

    async getDetail () {
      let ret = await this.$axios.send('PRODUCT_RATE_DETAIL', {p_id: this.id, rule_id: 1})
      if (ret && ret.status_code === 0) {
        if (Array.isArray(ret.result) || ret.result.r_data === '') {
          this.isNew = true
          ret.result = {
            r_data: this.initFormData(),
            p_name: this.$route.params.p_name,
            r_default: 1
          }
        } else {
          this.isNew = false
        }
        this.buildFormData(ret.result)
        this.isDefault = this.result.r_default
      }
    },

    async save () {
      let start = new Date(this.formData.r_start)
      let end = new Date(this.formData.r_end)
      if (end.getTime() - start.getTime() < 0) {
        this.$message.error('结束日期不能小于开始日期')
        return
      }
      let set = new Set()
      for (let i = 0; i < this.formData.r_data.length; i++) {
        let item = this.formData.r_data[i]
        if (item.year) {
          let year = parseInt(item.year)
          if (year < 0 || year > 30 || set.has(year)) {
            this.$message.error('缴费年限介于 1 到 30 之间，并且不能重复')
            return
          }
          set.add(year)
        }
      }

      let params = {
        p_id: this.id,
        r_data: JSON.stringify(this.formData.r_data),
        r_start: this.formData.r_start,
        r_end: this.formData.r_end,
        r_default: this.formData.r_default,
        rule_id: this.formData.r_rule
      }
      let ret = await this.$axios.send('PRODUCT_RATE_UPDATE', params)
      if (ret && ret.status_code === 0) {
        this.$message.success('保存成功')
        this.$router.go(-1)
      }
    },

    buildFormData (result) {
      if (!Array.isArray(result)) {
        this.formData = result
      }
      this.formData.r_default = result.r_default || 0
      this.formData.r_rule = 1
      let data = result.r_data
      if (Array.isArray(data) && data.length > 0) {
        let row = data.length
        let col = Object.keys(data[0]).length
        let headers = []
        for (let i = 0; i < col; i++) {
          let item = {
            label: i === 0 ? '缴费年限' : `第 ${i} 个保单年度`,
            prop: i === 0 ? 'year' : `rate${i}`
          }
          headers.push(item)
        }

        this.formData.headers = headers
        this.rowNum = row
        this.colNum = col - 1
      }
    },

    initFormData () {
      let body = []
      let col = this.colNum + 1
      for (let i = 0; i < this.rowNum; i++) {
        let item = {
          year: i + 1
        }
        for (let j = 1; j < col; j++) {
          item[`rate${j}`] = ''
        }
        body.push(item)
      }
      return body
    },

    initHeaderData () {
      let headers = []
      let col = this.colNum + 1
      for (let i = 0; i < col; i++) {
        let item = {
          label: i === 0 ? '缴费年限' : `第 ${i} 个保单年度`,
          prop: i === 0 ? 'year' : `rate${i}`
        }
        headers.push(item)
      }

      return headers
    },

    rowChange (num) {
      this.rowNum = num
      if (num < this.formData.r_data.length) {
        this.formData.r_data = this.formData.r_data.splice(0, num)
      }

      let data = this.initFormData()
      this.formData.r_data = Object.assign(data, this.formData.r_data)
    },

    colChange (num) {
      if (num < 1) return
      this.formData.headers = this.initHeaderData()
      let data = this.initFormData()
      for (let i = 0; i < data.length; i++) {
        let item = data[i]
        let origin = this.formData.r_data[i] ? this.formData.r_data[i] : {}
        for (let key in item) {
          if (origin.hasOwnProperty(key)) {
            data[i][key] = origin[key]
          }
        }
      }

      this.formData.r_data = data
    },

    async upload (params) {
      this.loading = true
      let fileObject = params.file
      let action = '/importProRate'
      let form = new FormData()
      form.append('file', fileObject)
      form.append('p_id', this.id)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'},
        responseType: 'blob'
      }
      let ret = await this.$axios.post(action, form, config)
      console.log(ret)
      if (ret && ret.status_code === 0) {
        this.loading = false
        this.$message.success('导入成功')
        this.init()
      } else {
        Common.downloadFile(ret, '错误数据.xlsx')
      }
    }
  }
}
</script>

<style scoped>
  .import-btn {
    margin-left: 10px;
  }

  .download-btn {
    text-decoration: none;
  }

</style>
