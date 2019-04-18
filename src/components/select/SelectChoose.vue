<!-- 机构选择 -->
<template>
<div>
  <el-select v-model="myValue"  class="input-width" :placeholder="placeholder" @change="change" :disabled="disabled">
    <el-option
    v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value">
    </el-option>
  </el-select>
</div>
</template>

<script>
export default {
  props: ['value', 'placeholder', 'disabled'],
  data () {
    return {
      myValue: '',
      options: []
    }
  },
  watch: {
    value (val) {
      this.myValue = val
    }
  },
  methods: {
    change (val) {
      this.$emit('input', this.myValue)
    },
    async getReqData () {
      let res = await this.$axios.send('SELECT_ORGANI_LIST', {
        o_name: '',
        o_g_id: '',
        o_status: ''
      })
      if (res.status_code === 0) {
        let title, id
        res.result.map(item => {
          title = item.o_name
          id = item.o_id
          this.options.push({ value: id, label: title })
        })
      }
    }
  },
  created () {
    this.myValue = this.value || ''
    this.getReqData()
  }
}
</script>
