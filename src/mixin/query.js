/*
 * @Author: zhangxiaoda
 * @Date: 2018-10-09 11:50:10
 * @Last Modified by: zhangxiaoda
 * @Last Modified time: 2019-02-27 14:41:05
 * @Desc 查询页面公用方法
 */

export default {
  activated () {
    if (this.tableData.data.length > 0) {
      this.query()
    }
  },
  methods: {

    /**
     * 表格分页处理事件
     * @param {*} page
     */
    handleCurrentChange (page) {
      this.tableData.current_page = page
      this.query(page)
    },

    /**
     * 表格选中处理事件
     * @param {*} currentRow
     * @param {*} oldCurrentRow
     */
    tableItemSelect (currentRow, oldCurrentRow) {
      if (currentRow) currentRow.selected = true
      this.currSelected = currentRow
      if (oldCurrentRow) oldCurrentRow.selected = false
    }
  }
}
