<!-- 机构类型 -->
<template>
<div>
<el-form-item label="机构类型" prop="o_g_id">
  <el-select v-model="myValue"  class="input-width" @change="change" :disabled="disabled">
    <el-option
    v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value">
    </el-option>
  </el-select>
</el-form-item>
</div>
</template>

<script>
export default {
  props: ['value', 'disabled'],
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
      let res = await this.$axios.send('ORGANI_LEVER_LIST')
      if (res.status_code === 0) {
        let title, id
        res.result.map(item => {
          title = item.o_g_name
          id = item.o_g_id
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
