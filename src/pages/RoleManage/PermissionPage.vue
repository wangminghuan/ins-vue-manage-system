<!--
  权限分配
  permis 代替 PermissionPage
-->
<template>
  <div class="permissionPage-wrap">
    <section class="header-title">权限分配</section>
    <section class="role-select">
        <span>角色选择</span>
        <el-select v-model="roleId" @change="getRoleDetail">
          <el-option
            v-for="item in roleList"
            :key="item.r_id"
            :label="item.r_name"
            :value="item.r_id">
          </el-option>
        </el-select>
      </section>
    <el-card class="pl20 pr20">
      <!-- table开始 -->
      <section class="pt20">
        <el-row class="level1-item">
          <el-col :span="20" :offset="4">
            <el-row class="level2-item">
              <el-col :span="6" class="level2-checkbox">
                <el-checkbox v-model="selectAll" class="tab subtable1" @change="selectAllAction">全选</el-checkbox>
              </el-col>
              <el-col :span="18" class="level3-checkbox">
                <div >功能权限</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row v-for="(level1, index1) in getLevel1(0)" :key="level1.id" class="level1-item">
          <el-col :span="4" class="level1-title">{{level1.name}}</el-col>
          <el-col :span="20" :offset="4">
            <el-checkbox-group v-model="r_permission">
              <el-row class="level2-item" v-for="(level2, index2) in getSubMenu(level1.id)" :key="level2.id">
                <el-col :span="6" class="level2-checkbox" >
                  <el-checkbox  :label="level2.marker" @change="changeLevel2(level1, level2)">{{level2.name}}</el-checkbox>
                </el-col>
                <el-col :span="18" class="level3-checkbox">
                  <el-checkbox v-for="(level3, index3) in level2.meta.btn" @change="changeLevel3(level2, level3)" :key="`${level3.marker}_${index1}_${index2}_${index3}`" :label="level3.marker">{{level3.name}}</el-checkbox>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </el-col>
        </el-row>

        <div class="save-btn tc">
          <el-button type="success" class="permis-btn" @click="handleSave" v-has="'USER_PERMIS_ASSIGN'">保存</el-button>
        </div>
      </section>
    </el-card>
  </div>
</template>

<script>
import menu from '@/config/menu'
import Common from '@/tools/common'
import whiteList from '@/config/whiteList'

export default {
  data () {
    return {
      selectAll: false,
      roleId: '',
      roleList: [],
      r_permission: []
    }
  },
  created () {
    this.getRoleList()
  },

  activated () {
    this.getRoleList()
  },
  methods: {
    // 保存
    async handleSave () {
      let arr = []
      for (let i = 0; i < this.r_permission.length; i++) {
        if (this.r_permission[i]) {
          arr.push(this.r_permission[i])
        }
      }

      let params = {
        r_permission: arr
      }

      if (this.r_permission.length === 0) {
        this.$message.error('还没有选择权限')
        return
      }

      params.r_permission = params.r_permission.concat(whiteList) // 保存全显时合并白名单

      let ret = await this.$axios.send('USER_PERMIS_ASSIGN', params, {id: this.roleId})
      if (ret && ret.status_code === 0) {
        this.$message.success('权限保存成功')
      }
    },

    async getRoleList () {
      let res = await this.$axios.send('SELECT_ROLE_LIST')
      if (res && res.status_code === 0) {
        this.roleList = res.result
      }
    },

    /**
     * 如果二级菜单选中,则选中对应的一级和三级菜单
     * 如果二级菜单是取消选中,则去除对应的所有的三级菜单,一级菜下面没有对应的二级则取消选中
     */
    changeLevel2 (level1, level2) {
      let marker = level2.marker
      if (this.r_permission.includes(marker)) { // 如果选中,那么选中对应的子菜单
        for (let i = 0; i < level2.meta.btn.length; i++) {
          let btnMarker = level2.meta.btn[i].marker
          if (!this.r_permission.includes(btnMarker)) {
            this.r_permission.push(btnMarker)
          }
        }

        // 如果选中,则添加对应的一级菜单
        if (!this.r_permission.includes(level1.marker)) {
          this.r_permission.push(level1.marker)
        }
      } else { // 取消选择
        let level2Items = this.getSubMenu(level1.id)
        let flag = false
        for (let i = 0; i < level2Items.length; i++) {
          if (this.r_permission.includes(level2Items[i].marker)) {
            flag = true
          }
        }

        if (!flag) { // 如果第一级菜单中没有对应的二次菜单存在那么久删除次一级菜单对应的标记
          let index = this.r_permission.indexOf(level1.marker)
          if (index > -1) {
            this.r_permission.splice(index, 1)
          }
        }

        // 取消选中对应的三级三点
        for (let i = 0; i < level2.meta.btn.length; i++) {
          let item = level2.meta.btn[i]
          let index = this.r_permission.indexOf(item.marker)
          if (index > -1) {
            this.r_permission.splice(index, 1)
          }
        }
      }
    },

    /**
     * 如果对应的三级菜单选中,则选中对应的二级菜单,和对应的一级菜单
     */
    changeLevel3 (level2, level3) {
      let level2Marker = level2.marker
      let level3Marker = level3.marker
      let level1 = this.getMenuItemById(level2.pid)
      if (this.r_permission.includes(level3Marker)) { // 选中了 Level3 对应的 二级也选中
        // 选中对应的二级
        if (!this.r_permission.includes(level2Marker)) {
          this.r_permission.push(level2Marker)
        }

        // 选中对应的一级
        if (!this.r_permission.includes(level1.marker)) {
          this.r_permission.push(level1.marker)
        }
      } else { // 如果取消选择,判断第三极所在的兄弟是否选中,如果全无,则取消二级选中
        let flag = false
        for (let i = 0; i < level2.meta.btn.length; i++) {
          let item = level2.meta.btn[i]
          if (this.r_permission.includes(item.marker)) {
            flag = true
          }
        }

        if (!flag) { // 取消选中对应的二级菜单
          let index = this.r_permission.indexOf(level2Marker)
          this.r_permission.splice(index, 1)
        }

        // 取消对应的一级菜单
        let level2Items = this.getSubMenu(level1.id)
        flag = false
        for (let i = 0; i < level2Items.length; i++) {
          if (this.r_permission.includes(level2Items[i].marker)) {
            flag = true
          }
        }

        if (!flag) { // 如果第一级菜单中没有对应的二次菜单存在那么久删除次一级菜单对应的标记
          let index = this.r_permission.indexOf(level1.marker)
          if (index > -1) {
            this.r_permission.splice(index, 1)
          }
        }
      }
    },

    getMenuItemById (id) {
      let ret = {}
      let arr = menu.filter(item => item.id === id)
      if (arr.length > 0) {
        ret = arr[0]
      }

      return ret
    },

    selectAllAction (val) {
      this.r_permission = val ? Common.getRoleAllMarker() : []
    },

    async getRoleDetail () {
      let ret = await this.$axios.send('ROLE_MANAGE_DETAIL', '', {id: this.roleId})
      if (ret && ret.status_code === 0 && ret.result.r_permission) {
        for (let i = 0; i < whiteList.length; i++) {
          let index = ret.result.r_permission.indexOf(whiteList[i])
          if (index > -1) {
            ret.result.r_permission.splice(index, 1)
          }
        }
        this.r_permission = ret.result.r_permission || []
      }
    },

    getSubMenu (id) {
      return menu.filter(item => item.pid === id && !item.isSuper)
    },

    getLevel1 () {
      return menu.filter(item => item.pid === 0 && item.id !== 10)
    }
  }
}
</script>
<style scoped>

.level1-title{
  position: absolute;
  top: 30%;
  left: 40px;
}

.level1-item {
  border-bottom: 1px #DCDFE5 solid;
  position: relative;
}

.level2-item {
  border-left: 1px #DCDFE5 solid;
  padding-left: 20px;
  height: 40px;
  border-bottom: 1px #DCDFE5 solid;
}

.level1-item .level2-item:last-child {
  border-bottom: none
}

.level2-checkbox {
  border-right: 1px #DCDFE5 solid;
  height: 100%;
  padding-top: 10px;
}

.level3-checkbox {
  padding-left: 20px;
  height: 100%;
  padding-top: 10px;
}

.role-select {
  background: #f5f5f5;
  padding-bottom: 40px;
  padding-top: 20px;
}

.save-btn {
  padding-top: 50px;
  padding-bottom: 50px;
}

</style>
