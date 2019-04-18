<template>
  <div class="main-body">
    <el-row class="mb20">
      <el-col :span="24">
        <el-dropdown trigger="click" @visible-change="handleVisibleChange" placement="bottom-start" @command="selectOrg">
          <span class="el-dropdown-link">
            <span class="dorpdown-text">{{organization.o_name}}</span>
            <i class="el-icon--right dorpdown-text " :class="{'el-icon-caret-left': organization.visible_status, 'el-icon-caret-bottom': !organization.visible_status}"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in organizationList" :key="item.o_id" :command="index">{{item.o_name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-checkbox style="margin-left: 30px;" label="" @change="refresh" v-model="statis_type">含子机构</el-checkbox>
        <el-button type="primary" class="ml20 pd4" icon="el-icon-refresh" @click="refresh" circle  ></el-button>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="mb20">
      <el-col :span="8">
        <div class="card-item ">
          <p class="card-title"> 今日规模保费（元）
            <el-tooltip effect="dark" placement="right">
              <div slot="content">
                <p>“黄色”为当日已收到的实时规模保费</p>
                <p>“蓝色”为昨日收到的规模保费</p>
              </div>
              <i class="fr el-icon-question" style="z-index:10"></i>
            </el-tooltip>
          </p>
          <ICountUp
            class="card-money"
            :startVal="0"
            :endVal="todayData.today_premium"
            :decimals="decimals"
            :duration="duration"
          />
            <echarts-bar-type1 class="card-echarts" :yesterdy="todayData.yesterday_premium" :today="todayData.today_premium"></echarts-bar-type1>
          <p class="card-bottom">达到昨日的 {{todayData.diff_premium}}%</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card-item ">
          <p class="card-title"> 今日标准保费（元）
            <el-tooltip effect="dark" placement="right">
              <div slot="content">
                <p>“黄色”为当日已收到的实时标准保费</p>
                <p>“蓝色”为昨日收到的标准保费</p>
              </div>
              <i class="fr el-icon-question" style="z-index:10"></i>
            </el-tooltip>
          </p>
          <ICountUp
            class="card-money"
            :startVal="0"
            :endVal="todayData.today_standard"
            :decimals="decimals"
            :duration="duration"
          />
          <echarts-bar-type1 class="card-echarts" :yesterdy="todayData.yesterday_standard" :today="todayData.today_standard"></echarts-bar-type1>
          <p class="card-bottom">达到昨日的 {{todayData.diff_standard}}%</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card-item">
          <p class="card-title">保单数量（件）
            <el-tooltip effect="dark" placement="right">
              <div slot="content">
                <p>“黄色”为当日已承保的实时保单数量</p>
                <p>“蓝色”为昨日承保的保单数</p>
              </div>
              <i class="fr el-icon-question" style="z-index:10"></i>
            </el-tooltip>
          </p>
          <ICountUp
            class="card-money"
            :startVal="0"
            :endVal="todayData.today_num"
            :decimals="0"
            :duration="duration"
          />
          <echarts-bar-type1 class="card-echarts" :yesterdy="todayData.yesterday_num" :today="todayData.today_num"></echarts-bar-type1>
          <p class="card-bottom" v-if="todayData.today_num - todayData.yesterday_num >= 0">比昨日多 {{todayData.diff_num}} 单</p>
          <p class="card-bottom" v-if="todayData.today_num - todayData.yesterday_num < 0"> 比昨日少 {{Math.abs(todayData.diff_num)}} 单</p>
        </div>
      </el-col>
    </el-row>

    <el-row class="stat-tabs">
      <el-col :span="24">
        <div class="stat-tabs-bar">
          <el-radio-group v-model="statForm.show_type" class="stat-tabs-bar-checkbox" @change="getStat">
            <el-radio :label="0">按天</el-radio>
            <el-radio :label="1">按月</el-radio>
          </el-radio-group>
          <el-date-picker
            :clearable="false"
            v-model="statForm.dateRange"
            type="daterange"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            @change="getStat"
            :picker-options="pickerOptions"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <el-tabs v-model="activeName" @tab-click="handelTabsClick">
          <el-tab-pane label="规模保费" name="tab1">
            <echarts-bar-type3 v-if="activeName === 'tab1'" :type="0" :dateType="statForm.show_type" :data="statData"></echarts-bar-type3>
          </el-tab-pane>
          <el-tab-pane label="标准保费" name="tab2">
            <echarts-bar-type3 v-if="activeName === 'tab2'" :type="1" :dateType="statForm.show_type" :data="statData"></echarts-bar-type3>
          </el-tab-pane>
          <el-tab-pane label="保费对比" name="tab3">
            <echarts-bar-type4 v-if="activeName === 'tab3'" :type="2" :dateType="statForm.show_type" :data="statData"></echarts-bar-type4>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import EchartsBarType1 from '@/components/echarts/EchartsBarType1.vue'
import EchartsBarType2 from '@/components/echarts/EchartsBarType2.vue'
import EchartsBarType3 from '@/components/echarts/EchartsBarType3.vue'
import EchartsBarType4 from '@/components/echarts/EchartsBarType4.vue'
import Common from '@/tools/common'
import Cookie from 'js-cookie'
import ICountUp from 'vue-countup-v2'

export default {
  components: {
    EchartsBarType1,
    EchartsBarType2,
    EchartsBarType3,
    EchartsBarType4,
    ICountUp
  },
  data () {
    return {
      activeName: 'tab1',
      statis_type: true,
      type: 0,
      dateRange: [],
      organization: {
        o_id: '',
        o_name: '请选择机构',
        visible_status: false // 下拉菜单状态
      },
      organizationList: [],
      todayData: {
        diff_num: 0,
        diff_premium: 0,
        diff_standard: 0,
        today_num: 0,
        today_premium: 0,
        today_standard: 0,
        yesterday_num: 0,
        yesterday_premium: 0,
        yesterday_standard: 0
      },
      powerData: {
        this_month: 0
      },
      statForm: {
        o_id: 0,
        premium_type: 0,
        show_type: 0,
        dateRange: []
      },
      statData: {},
      myInterval: {
        time: 10 * 60 * 1000,
        flag: null
      },
      startVal: 0,
      decimals: 2,
      duration: 2.5,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个年',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created () {
    this.init()
  },
  destroyed () {
    clearInterval(this.myInterval.flag)
    this.myInterval.flag = null
  },
  methods: {
    async init () {
      let timeStart = moment().subtract(6, 'd').format('YYYY-MM-DD')
      let timeEnd = moment().format('YYYY-MM-DD')
      this.statForm.dateRange = [timeStart, timeEnd]
      await this.getOrganList()
      this.getIndex()
      this.getStat()
      this.myInterval.flag = setInterval(function () {
        this.refresh()
      }.bind(this), this.myInterval.time)
    },

    toFixed (num) {
      num = parseFloat(num)
      num = !isNaN(num) ? parseFloat(parseFloat(num).toFixed(2)) : 0
      return num
    },

    async getIndex () {
      let statisType = this.statis_type ? 1 : 0
      let ret = await this.$axios.send('WELCOME_INDEX', {o_id: this.organization.o_id, statis_type: statisType})
      if (ret && ret.status_code === 0) {
        ret.result.todayData.today_premium = this.toFixed(ret.result.todayData.today_premium)
        ret.result.todayData.yesterday_premium = this.toFixed(ret.result.todayData.yesterday_premium)
        ret.result.todayData.diff_premium = this.toFixed(ret.result.todayData.diff_premium)
        ret.result.todayData.today_standard = this.toFixed(ret.result.todayData.today_standard)
        ret.result.todayData.yesterday_standard = this.toFixed(ret.result.todayData.yesterday_standard)
        ret.result.todayData.diff_standard = this.toFixed(ret.result.todayData.diff_standard)
        ret.result.todayData.today_num = this.toFixed(ret.result.todayData.today_num)
        ret.result.todayData.yesterday_num = this.toFixed(ret.result.todayData.yesterday_num)
        ret.result.todayData.diff_num = this.toFixed(ret.result.todayData.diff_num)
        this.todayData = ret.result.todayData
        this.powerData = ret.result.powerData
      }
    },

    async refresh () {
      this.getIndex()
      this.getStat()
    },

    async getStat () {
      let params = Common.clone(this.statForm)
      params.o_id = this.organization.o_id
      if (params.dateRange.length > 1) {
        params.time_start = params.dateRange[0]
        params.time_end = params.dateRange[1]
        params.statis_type = this.statis_type ? 1 : 0
      }
      delete params.dateRange
      let ret = await this.$axios.send('WELCOME_STAT', params)
      if (ret && ret.status_code === 0) {
        this.statData = ret.result
      }
    },
    async getOrganList () {
      let ret = await this.$axios.send('SELECT_ORGANI_LIST', {o_name: '', o_g_id: '', o_status: 1})
      if (ret && ret.status_code === 0) {
        this.organizationList = ret.result
        let user = Cookie.get('user')
        if (user) {
          let oId = JSON.parse(user).o_id
          for (let i = 0; i < ret.result.length; i++) {
            let item = ret.result[i]
            if (oId === 0 && item.o_pid === 0) {
              this.organization.o_id = item.o_id
              this.organization.o_name = item.o_name
              break
            }
            if (oId === item.o_id) {
              this.organization.o_id = item.o_id
              this.organization.o_name = item.o_name
              break
            }
          }
        }
      }
    },
    handleVisibleChange (v) {
      this.organization.visible_status = !this.organization.visible_status
    },
    selectOrg (index) {
      this.organization.o_id = this.organizationList[index].o_id
      this.organization.o_name = this.organizationList[index].o_name
      this.getStat(0)
      this.getIndex()
    },
    async handelTabsClick (item) {
      this.statForm.premium_type = item.index
      await this.getStat()
    }
  }
}
</script>

<style scoped>
.main-body {
  background: #f5f5f5;
}

.stat-tabs {
  background: #fff;
  padding: 20px;
  position: relative
}

.stat-tabs-bar {
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 2
}
.stat-tabs-bar-checkbox {
  padding-right: 15px
}
.dorpdown-text {
  font-size: 20px;
  font-weight: 500;
}

.card-item {
  height: 180px;
  padding: 20px;
  position: relative;
  background: #fff;
}

.card-title {
  font-size: 14px;
  color: #606266;
  margin-top: 0;
  margin-bottom: 8px;
}

.card-echarts {
  height: 100px;
}

.card-bottom {
  font-size: 14px;
  position: absolute;
  bottom: 5px;
  color: #606266
}

.card-money {
  font-size: 30px;
  font-weight: 500;
  margin: 0;
}

.pd4 {
  padding: 4px !important
}

.stat-tabs-bar /deep/ .el-radio+.el-radio {
  margin-left: 10px;
}

.el-checkbox /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #606266;
}

.el-dropdown-menu /deep/ .el-dropdown-menu__item {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  width: 228px;
}
</style>
