<template>
  <div>
    <el-select v-model="myValue" :placeholder="placeholder" class="w100" @change="change" clearable >
      <el-option v-if="isShowNull" :label="'请选择'" :value="''"></el-option>
      <el-option v-for="item in list" :value="item.p_id" :label="item.p_name" :key="item.p_id"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: ['value', 'placeholder', 'isShowNull', 'cid'],
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
      let ret = await this.$axios.send('SELECT_PRODUCT_LIST', {search_cid: this.cid || ''})
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
    },

    cid () {
      this.init()
      this.$emit('input', '')
    }
  }
}
</script>
