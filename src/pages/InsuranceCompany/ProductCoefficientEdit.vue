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
              <el-radio-group v-if="id !== '0'" v-model="formData.c_default">
                <el-radio-button v-for="item in Dict.PRODUCT_PLAN" :label="item.value"  :key="item.value">{{item.label}}
                  <span v-if="isDefault === item.value">(使用中)</span>
                </el-radio-button>
              </el-radio-group>
              <span v-else>默认方案</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="formData.c_default === 0">
          <el-col :span="8">
            <el-form-item label="开始时间：">
              <el-date-picker
                v-model="formData.c_start"
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
                v-model="formData.c_end"
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
              <el-input-number v-model="rowNum" @change="rowChange" class="el-number" :min="1" :max="30"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="24" class="mb15">
          <el-table
            :data="formData.data"
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
                     <!-- <i slot="suffix"  class="el-input__icon select-input-suffix">%</i> -->
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
        c_default: 1,
        rule_id: 1
      },
      rowNum: 5,
      id: null,
      productList: []
    }
  },

  created () {
    this.baseUrl = window.resourceBaseUrl
    this.init()
  },

  methods: {
    async init () {
      this.id = this.$route.params.id + ''
      if (this.id === '0') {
        this.productList = JSON.parse(sessionStorage.getItem('coefficient'))
        this.buildFormData(this.productList)
      } else {
        this.productList = JSON.parse(sessionStorage.getItem('coefficient'))
        this.buildFormData(this.productList)
        await this.getDetail()
      }
    },

    async getDetail () {
      let ret = await this.$axios.send('PRODUCT_COEFFICIENT_DETAIL', {p_id: this.id, rule_id: this.formData.rule_id})
      if (ret && ret.status_code === 0) {
        ret.result.r_data = Array.isArray(ret.result.r_data) && ret.result.r_data.length !== 0 ? ret.result.r_data : this.initFormData()
        if (ret.result.c_data) {
          ret.result.c_data.map(item => {
            item.coefficient_0 = item.coefficient
          })
        }
        this.formData = ret.result
        this.isDefault = ret.result.c_default
        this.buildFormData(ret.result)
      }
    },

    async save () {
      // 短期方案需要校验日期的有效性,开始日期必须大于等于今天,结束日期必须大于开始日期
      if (this.formData.c_default === 0) {
        let start = new Date(this.formData.c_start)
        let end = new Date(this.formData.c_end)
        if (end.getTime() - start.getTime() < 0) {
          this.$message.error('结束日期不能小于开始日期')
          return
        }
      }

      console.log(this.formData)

      let set = new Set()
      for (let i = 0; i < this.formData.data.length; i++) {
        let item = this.formData.data[i]
        if (item.year) {
          let year = parseInt(item.year)
          if (year < 0 || year > 30 || set.has(year)) {
            this.$message.error('缴费年限介于 1 到 30 之间，并且不能重复')
            return
          }
          set.add(year)
        }
      }

      let data = []
      for (let i = 0; i < this.productList.length; i++) {
        let item = {
          p_id: this.productList[i].p_id,
          c_data: []
        }

        for (let j = 0; j < this.formData.data.length; j++) {
          let rate = {
            year: this.formData.data[j].year,
            coefficient: this.formData.data[j][`coefficient_${i}`]
          }
          item.c_data.push(rate)
        }
        data.push(item)
      }

      let params = {
        rule_id: this.formData.rule_id,
        c_default: this.formData.c_default,
        p_c_data: data,
        c_start: this.formData.c_start,
        c_end: this.formData.c_end
      }
      let ret = await this.$axios.send('PRODUCT_COEFFICIENT_UPDATE', params)
      if (ret && ret.status_code === 0) {
        this.$message.success('保存成功')
        this.$router.go(-1)
      }
    },

    buildFormData () {
      this.initHeaderData()
      this.initFormData()
    },

    initFormData () {
      let data = []
      let col = this.productList.length
      if (col) {
        for (let i = 0; i < this.rowNum; i++) {
          let item = {
            year: ''
          }
          for (let j = 0; j < col; j++) {
            item[`coefficient_${j}`] = ''
          }

          data.push(item)
        }
      }

      this.formData.data = data
      if (this.formData.c_data) {
        this.formData.data = Object.assign(this.formData.data, this.formData.c_data)
        delete this.formData.c_data
      }
    },

    initHeaderData () {
      let headers = [
        {label: '缴费年限', prop: 'year'}
      ]
      for (let i = 0; i < this.productList.length; i++) {
        let item = {
          label: this.productList[i].p_name,
          prop: `coefficient_${i}`
        }
        headers.push(item)
      }

      this.formData.headers = headers
    },

    rowChange (num) {
      this.rowNum = num
      if (num < this.formData.data.length) {
        this.formData.data = this.formData.data.splice(0, num)
      }
      let currData = Common.clone(this.formData.data)
      this.initFormData()
      this.formData.data = Object.assign(this.formData.data, currData)
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
