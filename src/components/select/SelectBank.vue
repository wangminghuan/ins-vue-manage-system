<template>
  <div>
    <el-select v-model="myValue" :placeholder="placeholder" class="w100" @change="change" clearable :disabled="disabled">
      <el-option v-if="isShowNull" :label="'请选择'" :value="''"></el-option>
      <el-option v-for="(item, index) in list" :value="index" :label="item" :key="index"></el-option>
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
    this.myValue = Number.isNaN(parseInt(this.value)) ? '' : parseInt(this.value)
    this.init()
  },

  methods: {
    async init () {
      await this.getData()
    },

    async getData () {
      let ret = await this.$axios.send('SELECT_BANK_LIST')
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
      let num = parseInt(newValue)
      this.myValue = typeof num === 'number' && !Number.isNaN(num) ? num : null
    }
  }
}
</script>
