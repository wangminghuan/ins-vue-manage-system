webpackJsonp([7],{"9AS5":function(e,t){},WoSg:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Xxa5"),n=a.n(r),l=a("exGp"),o=a.n(l),s=a("Z1YF"),i={data:function(){var e=void 0;return{ruleForm:{},options:[],search_t_ids:[],loading:!1,tableData:[],pageNumber:{valuecurrentPage:1,currentPage:1,sumtotal:""},pickerOptions2:{disabledDate:function(t){if(e){var a=e.getFullYear()-1,r=e.getFullYear()+1+"-"+(e.getMonth()+1)+"-"+e.getDate(),n=a+"-"+(e.getMonth()+1)+"-"+e.getDate(),l=new Date(r),o=new Date(n);return t.getTime()>l||t.getTime()<o}},onPick:function(t){t.maxDate;var a=t.minDate;e=a},shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]}}},methods:{handleSearch:function(){this.getData()},handleExil:function(){var e=this;return o()(n.a.mark(function t(){var a,r,l;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return(a=s.a.clone(e.ruleForm)).dateRange&&2===a.dateRange.length?(a.search_time_start=a.dateRange[0],a.search_time_end=a.dateRange[1]):(a.search_time_start="",a.search_time_end=""),e.search_t_ids.length>0&&(a.search_t_ids=e.search_t_ids.join(",")),delete a.dateRange,delete a.page,r={headers:{"Content-Type":"multipart/form-data"},responseType:"blob"},t.next=8,e.$axios.post("/exportTeamPerformance",a,r);case 8:l=t.sent,s.a.downloadFile(l,"组织业绩统计结果.xlsx");case 10:case"end":return t.stop()}},t,e)}))()},handleSelectionChange:function(e){for(var t=[],a=0;a<e.length;a++)t.push(e[a].t_id);this.search_t_ids=t},handleCurrentChange:function(e){this.pageNumber.currentPage=e,this.ruleForm.page=this.pageNumber.currentPage,this.getData()},remoteMethod:function(e){""!==e&&(this.loading=!0)},getReqData:function(){var e=this;return o()(n.a.mark(function t(){var a,r,l;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.send("SELECT_ORGANI_LIST",{o_name:"",o_g_id:"",o_status:""});case 2:0===(a=t.sent).status_code&&(r=void 0,l=void 0,a.result.map(function(t){r=t.o_name,l=t.o_id,e.options.push({value:l,label:r})}));case 4:case"end":return t.stop()}},t,e)}))()},getData:function(){var e=this;return o()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.ruleForm.dateRange&&2===e.ruleForm.dateRange.length?(e.ruleForm.search_time_start=e.ruleForm.dateRange[0],e.ruleForm.search_time_end=e.ruleForm.dateRange[1]):(e.ruleForm.search_time_start="",e.ruleForm.search_time_end=""),e.ruleForm.page=e.pageNumber.currentPage,t.next=4,e.$axios.send("TEAM_KPI",e.ruleForm);case 4:0===(a=t.sent).status_code&&(e.tableData=a.result.listData.data,e.pageNumber.sumtotal=a.result.listData.total,e.pageNumber.valuecurrentPage=e.pageNumber.currentPage);case 6:case"end":return t.stop()}},t,e)}))()}},created:function(){this.getReqData()}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"statisticalOrganizationResult"},[a("section",{staticClass:"header-title"},[e._v("组织业绩统计")]),e._v(" "),a("section",{staticClass:"static-head common-padding"},[a("el-form",{attrs:{model:e.ruleForm,"label-width":"100px"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"机构选择"}},[a("el-select",{attrs:{filterable:"",loading:e.loading,"remote-method":e.remoteMethod},model:{value:e.ruleForm.search_oid,callback:function(t){e.$set(e.ruleForm,"search_oid",t)},expression:"ruleForm.search_oid"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"组织名称"}},[a("el-input",{model:{value:e.ruleForm.search_t_name,callback:function(t){e.$set(e.ruleForm,"search_t_name",t)},expression:"ruleForm.search_t_name"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"组织代码"}},[a("el-input",{model:{value:e.ruleForm.search_t_code,callback:function(t){e.$set(e.ruleForm,"search_t_code",t)},expression:"ruleForm.search_t_code"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"统计周期"}},[a("el-date-picker",{attrs:{placeholder:"选择月份","value-format":"yyyy-MM-dd","picker-options":e.pickerOptions2,type:"daterange"},model:{value:e.ruleForm.dateRange,callback:function(t){e.$set(e.ruleForm,"dateRange",t)},expression:"ruleForm.dateRange"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:""}},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"TEAM_KPI",expression:"'TEAM_KPI'"}],attrs:{type:"primary"},on:{click:function(t){return e.handleSearch(e.ruleForm)}}},[e._v("查询")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"TEAM_EXPORT",expression:"'TEAM_EXPORT'"}],attrs:{type:"success"},on:{click:e.handleExil}},[e._v("导出")])],1)],1)],1)],1)],1),e._v(" "),a("section",{staticClass:"static-table common-padding"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%","text-align":"center"},attrs:{data:e.tableData,border:"",height:"500"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{fixed:"",type:"selection",width:"80",label:"全选"}}),e._v(" "),a("el-table-column",{attrs:{prop:"date",label:"序号"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.$index+10*(e.pageNumber.valuecurrentPage-1)+1))]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"机构名称","min-width":"100",prop:"o_name"}}),e._v(" "),a("el-table-column",{attrs:{label:"组织代码","min-width":"100",prop:"t_code"}}),e._v(" "),a("el-table-column",{attrs:{label:"组织名称","min-width":"120",prop:"t_name"}}),e._v(" "),a("el-table-column",{attrs:{label:"承保件数","min-width":"120",prop:"policy_count"}}),e._v(" "),a("el-table-column",{attrs:{label:"规模保费",prop:"policy_premium"}}),e._v(" "),a("el-table-column",{attrs:{label:"标准保费",prop:"standard_premium"}}),e._v(" "),a("el-table-column",{attrs:{label:"新增人力",prop:"new_count"}}),e._v(" "),a("el-table-column",{attrs:{label:"有效人力",prop:"valid_count"}})],1)],1),e._v(" "),a("section",{staticClass:"footer-page"},[a("section",{staticClass:"common-paging"},[e.pageNumber.sumtotal?a("el-pagination",{attrs:{"current-page":e.pageNumber.currentPage,"page-size":10,layout:"total, prev, pager, next, jumper",total:e.pageNumber.sumtotal},on:{"current-change":e.handleCurrentChange}}):e._e()],1)])])},staticRenderFns:[]};var u=a("VU/8")(i,c,!1,function(e){a("9AS5")},"data-v-6424b30e",null);t.default=u.exports}});