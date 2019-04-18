<!-- 组织列表 -->
<template>
<div>
  <el-select v-model="myValue" :placeholder="placeholder" class="input-width" @change="change" :disabled="marker">
    <el-option
    v-for="item in options"
    :key="item.t_id"
    :label="item.t_name"
    :value="item.t_id">
    </el-option>
  </el-select>
</div>
</template>

<script>
export default {
  props: ['value', 'placeholder', 'id', 'disabled'],
  data () {
    return {
      options: [],
      myValue: '',
      searchData: {
        o_id: '',
        t_name: '',
        t_code: '',
        t_status: '',
        t_grade: '',
        ag_name: '',
        t_pname: ''
      }
    }
  },
  watch: {
    value (val) {
      setTimeout(() => {
        this.myValue = val
      }, 0)
    },
    id (val) {
      let num = this.$route.params.id
      let name = this.$route.params.name
      this.searchData.o_id = val
      if (val) {
        this.getReqData()
      }
      if (Number(num) === 0 || name === '待入司') { this.myValue = '' }
    }
  },
  computed: {
    marker () {
      if (!this.id || this.disabled) { return true }
    }
  },
  methods: {
    change (val) {
      this.$emit('input', this.myValue)
    },
    async getReqData () {
      let res = await this.$axios.send('TEAM_MANAGE_LIST', this.searchData)
      if (res.status_code === 0) {
        this.options = res.result
      }
    }
  },
  created () {
    this.myValue = this.value || ''
  }
}
</script>
