<!-- 职级列表 -->
<template>
<div>
    <el-select v-model="myValue" :placeholder="placeholder" class="input-width" @change="change" :disabled="disabled">
      <el-option label="请选择" value=""></el-option>
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
      this.setJGName()
    }
  },
  methods: {
    change (val) {
      this.$emit('input', this.myValue)
      this.setJGName()
    },

    setJGName () {
      let jgName = ''
      if (this.options.length > 0) {
        for (let i = 0; i < this.options.length; i++) {
          let item = this.options[i]
          if (item.value === this.myValue) {
            jgName = item.label
            break
          }
        }
      }

      this.$emit('jgName', jgName)
    },
    async getReqData () {
      let res = await this.$axios.send('SELECT_AGENT_LEVEL_LIST')
      if (res.status_code === 0) {
        let title, id
        res.result.map(item => {
          title = item.j_g_name
          id = item.j_g_id
          this.options.push({ value: id, label: title })
        })
        this.setJGName()
      }
    }
  },
  created () {
    this.myValue = this.value || ''
    this.getReqData()
  }
}
</script>
