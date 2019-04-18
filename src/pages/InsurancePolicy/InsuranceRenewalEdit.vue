<template>
  <div>
    <section class="header-title">{{$route.name}}</section>
    <div class="mb10"></div>
    <el-row class="pd20">
      <el-form :model="formData" label-suffix="：" label-position="left">
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构">{{formData.o_name}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保险公司">{{formData.c_name}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保单号">{{formData.bd_code}}</el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="投保人">{{formData.tb_name}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理人">{{formData.ag_name}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保单生效日期">{{formData.bd_time}}</el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="缴费期数">{{formData.total_pay_num}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已缴费次数">{{formData.pay_num}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="被保人">{{formData.ir_name}}</el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="上期缴费时间">{{formData.pay_last_time}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本期缴费时间">
              <el-date-picker
                v-model="formData.pay_current_time"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                type="date"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-for="product in formData.products" :key="product.s_id">
          <el-col :span="8">
            <el-form-item  :label="`${product.title}名称`">
              {{product.p_name}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="`${product.title}上期缴费`">
              {{product.last_premium}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="`${product.title}续期缴费`">
              <el-input class="w200px" v-model="product.ip_premium" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="tc">
            <el-button type="success" @click="save">保存</el-button>
            <el-button type="" @click="goback">返回</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </div>
</template>

<script>

export default {
  data () {
    return {
      id: null,
      formData: {
        pay_current_time: new Date()
      }
    }
  },

  created () {
    this.init()
  },

  methods: {
    async init () {
      this.id = this.$route.params.id
      if (this.id !== '0') {
        await this.getDetail()
      }
    },

    async getDetail () {
      let ret = await this.$axios.send('BD_RENEWAL_DETAIL', {s_id: this.id})
      if (ret && ret.status_code === 0) {
        for (let i = 0; i < ret.result.products.length; i++) {
          let item = ret.result.products[i]
          ret.result.products[i].ip_premium = item.last_premium
          ret.result.products[i].title = item.sp_property === 1 ? '主险' : '附加险'
        }
        this.formData = ret.result
      }
    },

    async save () {
      let data = this.buildData()
      let ret = await this.$axios.send('BD_RENEWAL_SAVE', data)
      if (ret && ret.status_code === 0) {
        this.$message.success(ret.message)
        this.$router.go(-1)
      }
    },

    goback () {
      this.$router.go(-1)
    },

    buildData () {
      let ret = {
        products: [],
        s_id: this.id,
        pay_current_time: this.formData.pay_current_time
      }
      for (let i = 0; i < this.formData.products.length; i++) {
        let item = {
          p_id: this.formData.products[i].p_id,
          ip_premium: this.formData.products[i].ip_premium,
          p_property: this.formData.products[i].p_property
        }

        ret.products.push(item)
      }

      return ret
    }
  }
}
</script>

<style scoped>
  .w200px {
    width: 200px !important;
  }
</style>
