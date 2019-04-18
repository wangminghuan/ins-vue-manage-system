export default {
  login: {url: '/login', method: 'post'},
  session: {url: '/account/{id}', method: 'get'},

  // 首页
  WELCOME_INDEX: {url: '/index', method: 'get'}, // 首页今日昨日保费数据对比
  WELCOME_STAT: {url: '/indexStatistics', method: 'get'}, // 首页柱状保费统计、升降率及机构排名

  // 产品管理
  PRODUCT_MANAGE_ADD: {url: '/product', method: 'post'}, // 产品录入 - 新增
  SELECT_PRODUCT_LIST: {url: '/product', method: 'get'}, // 下拉菜单 - 获取保险产品列表
  PRODUCT_MANAGE_UPDATE: {url: '/product/{p_id}', method: 'put'}, // 产品录入 - 更新
  PRODUCT_MANAGE_DETAIL: {url: '/product/{p_id}', method: 'get'}, // 产品详情 - 查询
  PRODUCT_MANAGE_LIST: {url: '/prodList', method: 'get'}, // 产品维护 - 查询
  PRODUCT_RATE_LIST: {url: '/prodRateList', method: 'get'}, // 产品佣金费率 - 查询
  PRODUCT_RATE_DETAIL: {url: '/productRateInfo', method: 'get'}, // 获取编辑保险产品佣金费率的页面回填数据
  PRODUCT_RATE_UPDATE: {url: '/productRateSave', method: 'post'}, // 产品佣金费率录入 - 保存
  PRODUCT_COEFFICIENT_UPDATE: {url: '/productCoefficientSave', method: 'post'}, // 产品折标系数录入 - 保存
  PRODUCT_COEFFICIENT_DETAIL: {url: '/productCoefficientInfo', method: 'get'}, // 产品折标系数详情 - 保存
  SELECT_PRODUCT_BY_CODE: {url: '/prodByCode', method: 'get'}, // 下拉菜单 - 根据产品 code 查询产品
  PC_IMPORT: {url: ''}, // 产品佣金费率导入
  PC_EXPORT: {url: ''}, // 产品佣金费率导出

  // 机构管理-组织关系管理
  TEAM_MANAGE_LIST: {url: '/team', method: 'get'}, // 组织关系管理 - 查询
  TEAM_MANAGE_ADD_AREA: {url: '/team', method: 'post'}, // 新增区 - 保存
  TEAM_MANAGE_ADD_DEPA: {url: '/team', method: 'post'}, // 新增部 - 保存
  TEAM_MANAGE_DETAIL: {url: '/team/{$id}', method: 'get'}, // 组织详情 - 查询
  TEAM_MANAGE_DELECT: {url: '/team/{$id}', method: 'delete'}, // 组织关系管理 -注销
  TEAM_MANAGE_MOVE: {url: '/teamMove', method: 'post'}, // 组织关系管理 迁移
  TEAM_MANAGE_PUT: {url: '/team/{$id}', method: 'put'}, // 组织关系管理 - 修改
  TEAM_MANAGE_COMPETENT_SEARCH: {url: 'agent/getAgentByJobnumber/{$jobnum}', method: 'get'}, // 工号查询推荐人
  SELECT_ORGANI_SUPER: {url: 'organization/showUpList', method: 'get'}, // 下拉菜单 - 上级机构列表
  SELECT_ORGANI_LIST: {url: '/organization', method: 'get'}, // 下拉菜单 -机构列表 || 机构列表(页面) - 查询
  ORGANI_MANAGE_ADD: {url: '/organization', method: 'post'}, // 机构录入 - 新增
  ORGANI_MANAGE_UPDATE: {url: '/organization/{$id}', method: 'put'}, // 机构录入 - 更新
  ORGANI_MANAGE_DETAIL: {url: '/organization/{$id}', method: 'get'}, // 机构详情 - 查询
  ORGANI_LEVER_LIST: {url: '/organizationGrade', method: 'get'}, // 机构层级 - 查询
  ORGANI_LEVER_ADD: {url: '/organizationGrade', method: 'post'}, // 机构层级 - 新增
  ORGANI_LEVER_UPDATE: {url: '/organizationGrade/{id}', method: 'put'}, // 机构层级 - 修改
  ORGANI_LEVER_DELECT: {url: '/organizationGrade/{id}', method: 'delete'}, // 机构层级 - 删除
  ORGANI_MANAGE_SHOWCODE: {url: '/team/showByCode/{$code}', method: 'get'}, // 组织代码查组织名称
  ORGANI_MANAGE_AUDIT: {url: '/teamMove', method: 'get'}, // 组织关系迁移审核
  ORGANT_MANAGE_MOVEAUDITPASS: {url: '/teamMove/{$mv_id}', method: 'put'}, // 迁移审核通过
  ORGANT_MANAGE_MOVEAUDITNOPASS: {url: '/teamMove/{$mv_id}', method: 'put'}, // 迁移审核不通过
  ORGANT_MANAGE_MOVEAUDITTOPASS: {url: '/teamMove/{$mv_id}', method: 'put'}, // 迁移审核撤回审核
  ORGANI_MANAGE_AUDIT_REPEAT: {url: '/teamMove', method: 'get'}, // 组织关系迁移复核
  ORGANT_MANAGE_MOVEAUDITPASS_REPEAT: {url: '/teamMove/{$mv_id}', method: 'put'}, // 迁移复核通过
  ORGANT_MANAGE_MOVEAUDITNOPASS_REPEAT: {url: '/teamMove/{$mv_id}', method: 'put'}, // 迁移复核不通过
  ORGANT_MANAGE_MOVEAUDITTOPASS_REPEAT: {url: '/teamMove/{$mv_id}', method: 'put'}, // 迁移复核撤回审核
  ORGANI_MANAGE_AUDIT_RECODE: {url: '/teamMove', method: 'get'}, // 组织迁移完成记录列表

  // 人员管理
  AGENT_MENAGE_LIST: {url: '/agent', method: 'get'}, // 代理人管理-查询
  AGENT_MANAGE_ADD: {url: '/agent', method: 'post'}, // 代理人录入 - 新增
  AGENT_MANAGE_MOVE: {url: '/agentMove', method: 'post'}, // 代理人迁移申请
  AGENT_MANAGE_LIST: {url: '/agentMove', method: 'get'}, // 代理人迁移审批列表
  AGENT_MANAGE_MIGRATION: {url: '/agentMove/{$mv_id}', method: 'put'}, // 代理人迁移审批
  SELECT_MANAGE_REFEREES: {url: '/agent/getCompanyAgentsNameIDJobnumberByNameWhereNotIn_DJ_DRS_LS', method: 'get'}, // 推荐人查询
  SELECT_AGENTBY_NAME: {url: 'agent/getAgentsByNameInCompany', method: 'get'}, // 直接主管查询
  AGENT_MANAGE_EXPORT: {url: 'AGENT_MANAGE_EXPORT', method: 'get'}, // 导入模版下载
  AGENT_MANAGE_IMPORT: {url: 'AGENT_MANAGE_IMPORT', method: 'get'}, // 批量导入
  AGENT_MANAGE_EDIT: {url: '/agent/{ag_id}', method: 'put'}, // 代理人录入 - 更新
  AGENT_MANAGE_DIMISSION: {url: '/agentPropose', method: 'post'}, // 离司审批 - 审批
  AGENT_MANAGE_ENTRY: {url: '/agentPropose/approve/{id}', method: 'get'}, // 入司审批 - 审批
  AGENT_MANAGE_BATCH: {url: '/agentPropose/approveMore', method: 'get'}, // 入司审批||离司审批 - 批量审批
  AGENT_MANAGE_DETAIL: {url: '/agent/{$ag_id}', method: 'get'}, // 代理人详情 - 查询
  SELECT_AGENT_LEVEL_LIST: {url: '/jobGrade', method: 'get'}, // 职级设定 || 下拉菜单
  AGENT_LEVEL_ADD: {url: '/jobGrade', method: 'post'}, // 职级设定 - 新增
  AGENT_LEVEL_UPDATE: {url: '/jobGrade/{$id}', method: 'put'}, // 职级设定 - 更新
  AGENT_LEVEL_DELETE: {url: '/jobGrade/{$id}', method: 'delete'}, // 职级设定 - 删除
  AGENT_BATCH_Entry_LIST: {url: '/agentPropose', method: 'get'}, // 入司管理列表
  AGENT_BATCH_RESIGN_LIST: {url: '/agentPropose', method: 'get'}, // 离司管理列表

  // 保险公司
  COMPANY_MANAGE_LIST: {url: '/compList', method: 'get'}, // 保险公司维护 - 查询
  SELECT_COMPANY_LIST: {url: '/company', method: 'get'}, // 下拉菜单 - 查询全部保险公司列表
  SELECT_SYSTEM_COMPANY_LIST: {url: '/sysCompList', method: 'get'}, // 下拉菜单 - 查询全部保险公司列表
  COMPANY_MANAGE_ADD: {url: '/company', method: 'post'}, // 保险公司录入 - 新增
  COMPANY_MANAGE_EDIT: {url: '/company/{c_id}', method: 'put'}, // 保险公司录入 - 更新
  COMPANY_MANAGE_DETAIL: {url: '/company/{c_id}', method: 'get'}, // 保险公司 - 详情

  // 投保单
  TB_MANAGE_ADD: {url: '/policy', method: 'post'}, // 投保单录入 - 保存(新增)
  TB_MANAGE_UPDATE: {url: '/policy/{s_id}', method: 'put'}, // 投保单录入 - 保存(修改)
  TB_MANAGE_DETAIL: {url: '/policy/{s_id}', method: 'get'}, // 投保单详情 - 查询保单||投保单详情
  TB_MANAGE_LIST: {url: '/policy', method: 'get'}, // 投保单维护 - 查询
  TB_MANAGE_CHANGE_STATUS: {url: '/policyStatus', method: 'get'}, // 投保单维护  - 状态变更
  TB_MANAGE_TO_POLICY: {url: '/toPolicy', method: 'post'}, // 投保单维护 - 转为保单
  TB_EXPORT: {url: '/'},
  TB_IMPORT: {url: '/'},
  // 保单
  BD_MANAGE_ADD: {url: '/policy', method: 'post'}, // 保单录入 - 保存(新增)
  BD_MANAGE_UPDATE: {url: '/policy/{s_id}', method: 'put'}, // 保单录入 - 保存(修改)
  BD_MANAGE_LIST: {url: '/bdList', method: 'get'}, // 保单维护 - 查询
  BD_MANAGE_DETAIL: {url: '/policy/{s_id}', method: 'get'}, // 保单详情 - 查询保单||投保单详情
  BD_POLICY_DATE_RETURN: {url: '/policyDate', method: 'get'}, // 保单维护 - 保单回执回访日期录入
  BD_POLICY_DATE_RECEIPT: {url: '/policyDate', method: 'get'}, // 保单维护 - 保单回执回访日期录入
  BD_RENEWAL_POLICY: {url: '/renewalPolicy', method: 'get'}, // 续期表单维护 - 查询
  BD_RENEWAL_DETAIL: {url: '/renewalInfo', method: 'get'}, // 续期表单详情
  BD_RENEWAL_SAVE: {url: '/saveRenewal', method: 'post'}, // 保存保单续期数据
  BD_REASSIGN_LIST: {url: '/policyTransfer', method: 'get'}, // 再分配记录 - 查询
  BD_REDISTR_SAVE: {url: '/saveReassign', method: 'post'}, // 再分配记录 - 保存
  BD_REASSIGN_TRACK: {url: '/reassignLog', method: 'get'}, // 再分配记录历史轨迹 - 查询
  BD_MANAGE_CHANGE_STATUS: {url: '/policyStatus', method: 'get'}, //  保单维护 - 状态变更
  BD_EXPORT: {url: '/'},
  BD_IMPORT: {url: '/'},
  // 报表统计
  REPORT_MANAGE_LIST: {url: '/policyReport', method: 'get'}, // 保费统计 查询
  EXPORT_MANAGE_LIST: {url: '/exportReport', method: 'post'}, // 报表统计 导出
  AGENT_KPI: {url: '/agentPerformance', method: 'get'}, // 代理人业绩查询
  TEAM_KPI: {url: '/teamPerformance', method: 'get'}, // 组织业绩查询
  AGENT_EXPORT: {url: '/exportAgentPerformance', method: 'post'}, // 导出个人业绩统计报表
  TEAM_EXPORT: {url: '/exportTeamPerformance', method: 'post'}, // 导出组织业绩统计报表

  // 考核管理
  EXAMINE_WARN_LIST: {url: '/examine/warn', method: 'get'}, // 考核预警列表
  EXAMINE_WARN_DETAIL: {url: '/examine/warn/detail', method: 'get'}, // 考核预警详情
  EXAMINE_WARN_EXPORT: {url: '/examine/warn/export', method: 'get'}, // 考核预警导出

  EXAMINE_RESULT_LIST: {url: '/examine/result', method: 'get'}, // 考核结果列表
  EXAMINE_RESULT_DETAIL: {url: '/examine/result/{id}', method: 'get'}, // 考核结果详情
  EXAMINE_RESULT_IMPORT: {url: '/examine/result/import', method: 'post'}, // 考核预警导出
  EXAMINE_RESULT_EXPORT: {url: '', method: 'null'}, // 考核预警导出模板

  EXAMINE_LIST: {url: '/examine', method: 'get'}, // 查询考核建议
  EXAMINE_DETAIL: {url: '/examine/{id}', method: 'get'}, // 查询考核建议详情
  EXAMINE_DISPOSE: {url: '/examine/dispose/{id}', method: 'post'}, // 查询考核建议
  EXAMINE_DISPOSE_CONFIRM: {url: '/examine/{id}', method: 'put'}, // 考核确认修改

  // 佣金查询
  COMMISSION_MANAGE_LIST: {url: '/payroll', method: 'post'}, // 佣金结算-查询
  COMMISSION_MANAGE_EXPORT: {url: '/payroll/export', method: 'get'}, // 佣金结算-导出
  COMMISSION_MANAGE_DETAIL: {url: '/payroll/detail', method: 'get'}, // 佣金结算-导出

  // 权限管理
  SELECT_ROLE_LIST: {url: '/role', method: 'get'}, // 下拉菜单-角色列表 或者角色管理表格查询
  ROLE_MANAGE_DETAIL: {url: '/role/{id}', method: 'get'}, // 下拉菜单-角色列表 或者角色管理表格查询
  ROLE_MANAGE_ADD: {url: '/role', method: 'post'}, // 角色管理-新增
  ROLE_MANAGE_DELETE: {url: '/role/{id}', method: 'delete'}, // 角色管理-删除
  USER_MANAGE_LIST: {url: '/account', method: 'get'}, // 用户管理-查询
  USER_MANAGE_ADD: {url: '/account', method: 'post'}, // 用户管理-新增
  USER_MANAGE_EDIT: {url: '/account/{id}', method: 'put'}, // 用户管理-编辑
  USER_MANAGE_DELETE: {url: '/account/{id}', method: 'delete'}, // 用户管理-删除
  USER_PERMIS_ASSIGN: {url: '/role/permission/{id}', method: 'post'}, // 权限分配-保存

  // 修改密码
  UPDATE_ACCOUNT_PASSWORD: {url: '/account/update', method: 'post'}, // 修改密码保存

  // 其他
  SELECT_BANK_LIST: {url: '/agent/getBankList', method: 'get'}, // 下拉菜单-银行列表
  SELECT_NATION_LIST: {url: '/agent/getNationList', method: 'get'}, // 下拉菜单-民族列表

  // test
  RUN_TEST_SCRIPT: {url: '/payroll', method: 'get'}

}
