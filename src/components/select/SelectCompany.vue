<template>
  <div>
    <el-select :disabled="disabled" v-model="myValue" :placeholder="placeholder" class="w100" @change="change" clearable >
      <el-option v-if="isShowNull" :label="'请选择'" :value="''"></el-option>
      <el-option v-for="item in list" :value="item.c_id" :label="item.c_name" :key="item.c_id"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: ['value', 'placeholder', 'isShowNull', 'editType', 'disabled'],
  data () {
    return {
      myValue: '',
      list: []
    }
  },

  created () {
    this.myValue = this.value || ''
    this.init()
  },

  methods: {
    async init () {
      await this.getData()
    },

    async getData () {
      let params = {}
      if (this.editType === 'add') {
        params.search_status = 1
      }
      let ret = await this.$axios.send('SELECT_COMPANY_LIST', params)
      if (ret && ret.status_code === 0) {
        this.list = ret.result
      }
    },

    change () {
      this.$emit('input', this.myValue)
      this.$emit('change', this.myValue)
    }
  },

  watch: {
    value (newValue) {
      this.myValue = newValue
    }
  }
}
</script>
