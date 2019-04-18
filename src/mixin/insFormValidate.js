import BaseCollapseCard from '@/components/base/BaseCollapseCard.vue'
import Validator from '@/config/validator'
import Common from '@/tools/common'

export default {
  components: {
    BaseCollapseCard
  },

  props: {
    editData: {
      type: Object
    }
  },

  data () {
    return {
      formData: {}
    }
  },

  methods: {
    getData () {
      // this.$refs.formData.validate(valid => {
      //   return new Promise((resolve, reject) => {
      //     if (valid) {
      //       resolve(this.formData)
      //     } else {
      //       reject(new Error(false))
      //     }
      //   })
      // })
      return new Promise((resolve, reject) => {
        this.$refs.formData.validate(valid => {
          if (valid) {
            resolve(this.formData)
          } else {
            reject(new Error(false))
          }
        })
      })
    },

    // 如果证件类型选择是身份证,则添加校验,否则删除校验
    setIdNumberValidate (value, rule) {
      if (Array.isArray(rule)) {
        if (value === 0) {
          rule[1] = {
            validator: Validator.idCard,
            message: '身份证格式不正确',
            trigger: 'blur'
          }
        } else {
          rule.splice(1, 1)
        }
      }
    },

    // 根据身份证类型自动设置性别和出生日期
    setUserInfo (data, idCardKey, birthdayKey, sexKey) {
      let idCardNum = data[idCardKey]
      let info = Common.getPersonByIdCardNum(idCardNum)
      if (info) {
        data[sexKey] = info.sex
        data[birthdayKey] = info.birthday
      }
    }
  }
}
