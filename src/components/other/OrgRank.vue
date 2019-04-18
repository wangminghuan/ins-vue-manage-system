<template>
  <div>
    <p class="rank-title">机构业绩排名</p>
    <el-row :gutter="16" class="rank-item" v-for="(item, index) in list" :key="item.o_id" >
      <el-col :span="2" class="rank-index" :class="{'index1': index === 0, 'index2': index === 1, 'index3': index ===2}">{{index + 1}}</el-col>
      <el-col :span="13" class="rank-name">{{item.o_name}}</el-col>
      <el-col :span="8" class="tr rank-num">{{parseFloat(item.premium).toLocaleString('en-US')|zero}}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    }
  },
  filters: {
    zero (value) {
      if (value.indexOf('.') < 0) {
        value += '.00'
      }
      return value
    }
  }
}
</script>
<style lang="scss" scoped>
.rank-list {
  .rank-title {
    color: #303133;
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 36px;
  }

  .rank-item {
    height: 22px;
    line-height: 22px;
    margin: 11px 10px;
    padding-left: 20px;

    .rank-name {
      font-weight: 500;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      padding-left: 15px !important
    }

    .rank-num {
      color: #606266
    }
  }

  .rank-index {
    width: 22px;
    height: 22px;
    border-radius: 11px;
    background: #E6E6E6;
    color: #303133;
    text-align: center;
    padding-left: 6.5px !important;
  }

  .index1 {
    color: #fff;
    background: #F8C750;
  }

  .index2 {
    color: #fff;
    background: #B4C4E1
  }

  .index3 {
    background: #C8A985;
    color: #fff
  }
}
</style>
