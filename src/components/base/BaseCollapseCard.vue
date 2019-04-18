<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1" class="customer-title">
        <template slot="title" >
          <span v-if="title" class="title">{{title}}</span>
          <div class="btn">
            <slot name="btn"></slot>
          </div>
        </template>
        <div class="container-body">
          <slot></slot>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      activeName: '1'
    }
  }
}
</script>

<style scoped>

.title {
  color: #000;
  font-size: 16px;
  padding-left: 20px;
}

.btn {
  position: absolute;
  right: 80px;
}

.container-body {
  margin-top: 20px;
}

.customer-title /deep/ .el-collapse-item__header.is-active {
  border-bottom: 1px solid #DCDFE6
}
</style>
