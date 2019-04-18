<!--
    eg:<Vuearea @chlidByValue="handlesave" :placeholder="'请选择地区'"></Vuearea>
-->
<template>
  <div>
    <!-- <area-cascader type='text' :disabled="disabled" v-if="isShow" :placeholders="placeholders" :placeholder='placeholder' :level='1' v-model="send_search_form.selected" :data="pcaa" @change="handledata">
    </area-cascader> -->
    <el-cascader
      :placeholder="placeholder"
      :options="options"
      filterable
      v-model="selectedOptions"
      change-on-select
      :disabled="disabled"
       @change="handledata"
    ></el-cascader>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { AreaSelect } from 'vue-area-linkage'
import { pcaa } from 'area-data'
export default {
  components: {
    AreaSelect
  },
  props: ['value', 'placeholder', 'isShow', 'disabled'],
  watch: {
    value (val) {
      console.log(val, 99)
      // this.selectedOptions = val
    }
  },
  data () {
    return {
      selectedOptions: [],
      options: regionData,
      pcaa: pcaa,
      placeholders: [' ', ' ', ' '],
      send_search_form: {
        orderCode: '',
        itemName: '',
        orderTime: [],
        consigneeName: '',
        state: '',
        selected: []
      }
    }
  },
  methods: {
    getCascaderObj (val, opt) {
      return val.map(function (value, index, array) {
        for (var itm of opt) {
          if (itm.value === value) { opt = itm.children; return itm }
        }
        return null
      })
    },
    handledata (val) {
      let num = this.getCascaderObj(val, regionData)
      console.log(num)
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="scss">
.area-cascader-wrap {
  .area-select {
    height: 38px;
    .area-selected-trigger{
      padding:0 15px;
    }
  }
}
</style>
