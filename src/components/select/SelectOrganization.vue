<template>
  <div>
    <el-select v-model="myValue" :placeholder="placeholder" class="w100" @change="change" clearable :disabled="disabled">
      <el-option v-if="isShowNull" :label="'请选择'" :value="''"></el-option>
      <el-option v-for="item in list" :value="item.o_id" :label="item.o_name" :key="item.o_id"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: ['value', 'placeholder', 'isShowNull', 'disabled'],
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
      let ret = await this.$axios.send('SELECT_ORGANI_LIST', {o_name: '', o_g_id: '', o_status: 1})
      if (ret && ret.status_code === 0) {
        this.list = ret.result
      }
    },

    change () {
      this.$emit('input', this.myValue)
    }
  },

  watch: {
    value (newValue) {
      this.myValue = newValue
    }
  }
}
</script>
