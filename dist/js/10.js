webpackJsonp([10],{kxjX:function(e,t){},v7aw:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("Xxa5"),r=a.n(l),s=a("exGp"),o=a.n(s),n=a("Z1YF"),i=a("laOz"),_=a("gHwQ"),c=a("PJh5"),u=a.n(c),m={mixins:[a("PcmU").a],components:{SelectJobGrade:i.a,BaseDialog:_.a},data:function(){return{ruleForm:{a_p_time:u()().format("YYYY-MM")},options:[],loading:!1,tableData:[],search_ag_ids:[],pageNumber:{valuecurrentPage:1,currentPage:1,sumtotal:""},dialog:{detail:!1},detailList:{}}},methods:{query:function(){var e=this;return o()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.search_ag_ids=[],e.handleSearch(1);case 2:case"end":return t.stop()}},t,e)}))()},handleSearch:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return o()(r.a.mark(function a(){var l;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.ruleForm.page=t,a.next=3,e.$axios.send("COMMISSION_MANAGE_LIST",e.ruleForm);case 3:0===(l=a.sent).status_code&&(e.tableData=l.result.data,e.pageNumber.sumtotal=l.result.total,e.pageNumber.valuecurrentPage=t,e.toggleSelection(e.search_ag_ids[t]));case 5:case"end":return a.stop()}},a,e)}))()},toggleSelection:function(e){var t=this;e?e.forEach(function(e){for(var a=void 0,l=0;l<t.tableData.length;l++)e.a_p_id===t.tableData[l].a_p_id&&(a=l);var r=t.$refs.multipleTable,s=t.tableData;setTimeout(function(){r.toggleRowSelection(s[a],!0)},0)}):this.$refs.multipleTable.clearSelection()},detail:function(e){var t=this;return o()(r.a.mark(function a(){var l,s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return l={a_p_id:e},a.next=3,t.$axios.send("COMMISSION_MANAGE_DETAIL",l);case 3:(s=a.sent)&&0===s.status_code&&(t.detailList=s.result,t.dialog.detail=!0);case 5:case"end":return a.stop()}},a,t)}))()},handleExcel:function(){var e=this;return o()(r.a.mark(function t(){var a,l,s,o,i,_,c;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=[],e.search_ag_ids.length>1)for(l=0;l<e.search_ag_ids.length;l++)if((s=e.search_ag_ids[l])&&Array.isArray(s))for(o=0;o<s.length;o++)a.push(s[o].a_p_id);return(i=n.a.clone(e.ruleForm)).a_p_ids=a,delete i.page,_={headers:{"Content-Type":"multipart/form-data"},responseType:"blob"},t.next=8,e.$axios.post("/payroll/export",i,_);case 8:c=t.sent,n.a.downloadFile(c,"薪资查询.xlsx");case 10:case"end":return t.stop()}},t,e)}))()},handleSelectionChange:function(e){this.search_ag_ids[this.pageNumber.currentPage]=e},handleCurrentChange:function(e){this.pageNumber.currentPage=e,this.ruleForm.page=this.pageNumber.currentPage,this.handleSearch(e)},remoteMethod:function(e){""!==e&&(this.loading=!0)},getReqData:function(){var e=this;return o()(r.a.mark(function t(){var a,l,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.send("SELECT_ORGANI_LIST",{o_name:"",o_g_id:"",o_status:""});case 2:0===(a=t.sent).status_code&&(l=void 0,s=void 0,a.result.map(function(t){l=t.o_name,s=t.o_id,e.options.push({value:s,label:l})}));case 4:case"end":return t.stop()}},t,e)}))()},reset:function(){this.ruleForm={a_p_time:u()().format("YYYY-MM")}}},created:function(){this.getReqData()}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"statisticalPersionResult"},[a("section",{staticClass:"header-title"},[e._v("佣金查询")]),e._v(" "),a("section",{staticClass:"static-head common-padding"},[a("el-form",{attrs:{model:e.ruleForm,"label-width":"100px"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"机构选择"}},[a("el-select",{attrs:{filterable:"",loading:e.loading,"remote-method":e.remoteMethod},model:{value:e.ruleForm.o_id,callback:function(t){e.$set(e.ruleForm,"o_id",t)},expression:"ruleForm.o_id"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"组织名称"}},[a("el-input",{model:{value:e.ruleForm.t_name,callback:function(t){e.$set(e.ruleForm,"t_name",t)},expression:"ruleForm.t_name"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"当前职级"}},[a("select-job-grade",{model:{value:e.ruleForm.jg_id,callback:function(t){e.$set(e.ruleForm,"jg_id",t)},expression:"ruleForm.jg_id"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"代理人工号"}},[a("el-input",{model:{value:e.ruleForm.ag_job_number,callback:function(t){e.$set(e.ruleForm,"ag_job_number",t)},expression:"ruleForm.ag_job_number"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"代理人姓名"}},[a("el-input",{model:{value:e.ruleForm.ag_name,callback:function(t){e.$set(e.ruleForm,"ag_name",t)},expression:"ruleForm.ag_name"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"薪酬月份"}},[a("el-date-picker",{attrs:{placeholder:"选择月份","value-format":"yyyy-MM","picker-options":e.disablePickerOptions,type:"month"},model:{value:e.ruleForm.a_p_time,callback:function(t){e.$set(e.ruleForm,"a_p_time",t)},expression:"ruleForm.a_p_time"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"任职状态"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.ruleForm.ag_status,callback:function(t){e.$set(e.ruleForm,"ag_status",t)},expression:"ruleForm.ag_status"}},e._l(e.Dict.PERSON_AGENT_STATUS,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:""}},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"COMMISSION_MANAGE_LIST",expression:"'COMMISSION_MANAGE_LIST'"}],attrs:{type:"primary"},on:{click:function(t){return e.query(1)}}},[e._v("查询")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"COMMISSION_MANAGE_EXPORT",expression:"'COMMISSION_MANAGE_EXPORT'"}],attrs:{type:"success"},on:{click:e.handleExcel}},[e._v("导出")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.reset}},[e._v("重置")])],1)],1)],1)],1)],1),e._v(" "),a("section",{staticClass:"static-table common-padding"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%","text-align":"center"},attrs:{data:e.tableData,border:"",height:"500"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{fixed:"",type:"selection",width:"80",label:"全选"}}),e._v(" "),a("el-table-column",{attrs:{prop:"date",label:"序号"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.$index+10*(e.pageNumber.valuecurrentPage-1)+1))]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"机构名称","min-width":"100",prop:"o_name"}}),e._v(" "),a("el-table-column",{attrs:{label:"组织名称","min-width":"100",prop:"t_name"}}),e._v(" "),a("el-table-column",{attrs:{label:"代理人工号","min-width":"120",prop:"ag_job_number"}}),e._v(" "),a("el-table-column",{attrs:{label:"代理人姓名","min-width":"120",prop:"ag_name"}}),e._v(" "),a("el-table-column",{attrs:{label:"当前职级","min-width":"120",prop:"jg_name"}}),e._v(" "),a("el-table-column",{attrs:{label:"任职状态",prop:"ag_status"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(e._f("dict")(t.row.ag_status,"PERSON_AGENT_STATUS"))+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"薪酬月份",prop:"a_p_time"}}),e._v(" "),a("el-table-column",{attrs:{label:"税前合计",prop:"a_p_money_before_commission"}}),e._v(" "),a("el-table-column",{attrs:{label:"缴纳增值税基数",prop:"a_p_VAT_base"}}),e._v(" "),a("el-table-column",{attrs:{label:"增值税",prop:"a_p_VAT"}}),e._v(" "),a("el-table-column",{attrs:{label:"城建税",prop:"a_p_construction_tax"}}),e._v(" "),a("el-table-column",{attrs:{label:"教育附加税",prop:"a_p_surtax_education"}}),e._v(" "),a("el-table-column",{attrs:{label:"地方教育附加税",prop:"a_p_surtax_local_education"}}),e._v(" "),a("el-table-column",{attrs:{label:"增值税附加合计",prop:"a_p_VAT_surtax_total"}}),e._v(" "),a("el-table-column",{attrs:{label:"应税所得",prop:"a_p_PIT_base"}}),e._v(" "),a("el-table-column",{attrs:{label:"个税基数"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row?a("span",[e._v("800")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"所得税",prop:"a_p_PIT"}}),e._v(" "),a("el-table-column",{attrs:{label:"税后实发",prop:"a_p_money_after_commission"}}),e._v(" "),a("el-table-column",{attrs:{label:"详情",prop:"a_p_money_after_commission"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{color:"#6797EC",cursor:"pointer"},on:{click:function(a){return e.detail(t.row.a_p_id)}}},[e._v("详情")])]}}])})],1)],1),e._v(" "),a("section",{staticClass:"footer-page"},[a("section",{staticClass:"common-paging"},[e.pageNumber.sumtotal?a("el-pagination",{attrs:{"current-page":e.pageNumber.currentPage,"page-size":10,layout:"total, prev, pager, next, jumper",total:e.pageNumber.sumtotal},on:{"current-change":e.handleCurrentChange}}):e._e()],1)]),e._v(" "),a("base-dialog",{attrs:{title:"薪资查看",isshow:e.dialog.detail,width:"400px"},on:{"update:isshow":function(t){return e.$set(e.dialog,"detail",t)}}},[a("el-form",{staticClass:"dialog-center",attrs:{model:e.detailList,"label-suffix":"："}},[a("el-form-item",{staticClass:"p100",attrs:{label:"初始年度佣金"}},[e._v(e._s(e.detailList.a_p_d_first_commission))]),e._v(" "),a("el-form-item",{staticClass:"p100",attrs:{label:"服务津贴"}},[e._v(e._s(e.detailList.a_p_d_service_allowance))]),e._v(" "),a("el-form-item",{staticClass:"p100",attrs:{label:"续期佣金"}},[e._v(e._s(e.detailList.a_p_d_renewal_commission))]),e._v(" "),a("el-form-item",{staticClass:"p100",attrs:{label:"推荐奖金"}},[e._v(e._s(e.detailList.a_p_d_commended))]),e._v(" "),a("el-form-item",{staticClass:"p100",attrs:{label:"管理佣金"}},[e._v(e._s(e.detailList.a_p_d_management_allowance))]),e._v(" "),a("el-form-item",{staticClass:"p100",attrs:{label:"育成奖金"}},[e._v(e._s(e.detailList.a_p_d_breed_bonus))]),e._v(" "),a("el-form-item",{staticClass:"p100",attrs:{label:"总计"}},[e._v(e._s(e.detailList.a_p_d_total))])],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(m,p,!1,function(e){a("kxjX")},"data-v-4b071f3e",null);t.default=d.exports}});