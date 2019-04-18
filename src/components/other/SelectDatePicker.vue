<template>
  <div>
      <el-input
      class="el-date-editor"
      :class="'el-date-editor--' + type"
      :readonly="!editable || readonly || type === 'dates'"
      :disabled="pickerDisabled"
      :size="pickerSize"
      :name="name"
      v-bind="firstInputId"
      v-if="!ranged"
      v-clickoutside="handleClose"
      :placeholder="placeholder"
      @focus="handleFocus"
      @keydown.native="handleKeydown"
      :value="displayValue"
      @input="value => userInput = value"
      @change="handleChange"
      @mouseenter.native="handleMouseEnter"
      @mouseleave.native="showClose = false"
      :validateEvent="false"
      suffix-icon="el-icon-date"
      ref="reference">
      <span slot="prepend">
        <slot name="select"></slot>
      </span>
    </el-input>
  </div>
</template>

<script>
import { DatePicker } from 'element-ui'
export default {
  extends: DatePicker
}
</script>

<style scoped>

</style>
