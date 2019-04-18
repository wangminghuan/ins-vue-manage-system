/*
 * @Author: zhangxiaoda
 * @Date: 2018-09-17 14:26:28
 * @Last Modified by: zhangxiaoda
 * @Last Modified time: 2019-03-05 17:41:57
 * @Desc 路由和菜单的整合
 * @Template {
 *        id: '当前配置的 ID'
 *        pid: '当前配置的父 ID',
 *        name: '菜单名称',
 *        icon: '菜单对应的图标',
 *        marker: '菜单对应的权限标记',
 *        isMenu: '是否为菜单,true|false',
 *        meta: {
 *          active: '当改路由不是一个菜单是,需要在页面左侧机会菜单,此处存放激活菜单的 ID ',
 *          btn: '字符串的数组,存放改页面对应的按钮的权限标记'
 *        }
 *      }
 */
export default [
  // 首页
  {
    id: 10,
    pid: 0,
    name: '首页',
    icon: 'el-icon-1',
    marker: 'M_INDEX',
    path: '/app/Welcome',
    component: 'Welcome',
    isMenu: true,
    meta: {}
  },
  {
    id: 1001,
    pid: 10,
    name: '首页',
    icon: 'el-icon-1',
    marker: 'P_INDEX',
    isMenu: false,
    meta: {}
  },
  // 保单管理
  {
    id: 20,
    pid: 0,
    name: '保单管理',
    icon: 'el-icon-2',
    marker: 'M_TB_MGR',
    path: '',
    isMenu: true,
    meta: {}
  },
  {
    id: 2001,
    pid: 20,
    name: '投保单录入',
    icon: '',
    marker: 'P_TB_EDIT',
    path: '/app/InsuranceSlip/Edit/:actionType/:id',
    href: '/app/InsuranceSlip/Edit/0/0',
    component: 'InsuranceSlipEdit',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'TB_MANAGE_ADD', name: '保存'},
        {marker: 'TB_EXPORT', name: '导出'},
        {marker: 'TB_IMPORT', name: '批量导入'}
      ]
    }
  },
  {
    id: 2002,
    pid: 20,
    name: '投保单管理',
    icon: '',
    marker: 'P_TB_LIST',
    path: '/app/InsuranceSlip/List',
    component: 'InsuranceSlipList',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'TB_MANAGE_LIST', name: '查询'},
        {marker: 'TB_MANAGE_UPDATE', name: '修改'},
        {marker: 'TB_MANAGE_CHANGE_STATUS', name: '状态变更'},
        {marker: 'TB_MANAGE_TO_POLICY', name: '转为保单'},
        {marker: 'TB_MANAGE_DETAIL', name: '详情'}
      ]
    }
  },
  {
    id: 200201,
    pid: 2002,
    name: '投保单详情',
    icon: '',
    marker: 'TB_MANAGE_DETAIL',
    path: '/app/InsuranceSlip/Detail/:id',
    component: 'InsuranceSlipDetail',
    isMenu: true,
    meta: {
      active: 2002
    }
  },
  {
    id: 200202,
    pid: 2002,
    name: '投保单修改',
    icon: '',
    marker: 'TB_MANAGE_UPDATE',
    path: '/app/InsuranceSlip/Update/:actionType/:id',
    component: 'InsuranceSlipEdit',
    isMenu: false,
    meta: {
      btn: [
        {marker: 'TB_MANAGE_UPDATE', name: '保存'}
      ],
      active: 2002
    }
  },
  {
    id: 2003,
    pid: 20,
    name: '保单录入',
    icon: '',
    marker: 'P_BD_EDIT',
    path: '/app/InsurancePolicy/Edit/:actionType/:id',
    href: '/app/InsurancePolicy/Edit/1/0',
    component: 'InsurancePolicyEdit',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'BD_MANAGE_ADD', name: '保存'},
        {marker: 'BD_EXPORT', name: '导出'},
        {marker: 'BD_IMPORT', name: '批量导入'}
      ]
    }
  },
  {
    id: 2004,
    pid: 20,
    name: '保单管理',
    icon: '',
    marker: 'P_BD_LIST',
    path: '/app/InsurancePolicy/List',
    component: 'InsurancePolicyList',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'BD_MANAGE_LIST', name: '查询'},
        {marker: 'BD_MANAGE_UPDATE', name: '修改'},
        {marker: 'BD_POLICY_DATE_RETURN', name: '回执录入'},
        {marker: 'BD_POLICY_DATE_RECEIPT', name: '回访录入'},
        {marker: 'BD_MANAGE_CHANGE_STATUS', name: '状态变更'},
        {marker: 'BD_MANAGE_DETAIL', name: '详情'}
      ]
    }
  },
  {
    id: 200401,
    pid: 2004,
    name: '保单详情',
    icon: '',
    marker: 'BD_MANAGE_DETAIL',
    path: '/app/InsurancePolicy/Detail/:id',
    component: 'InsurancePolicyDetail',
    isMenu: true,
    meta: {
      active: 2004
    }
  },
  {
    id: 200401,
    pid: 2004,
    name: '保单修改',
    icon: '',
    marker: 'BD_MANAGE_UPDATE',
    path: '/app/InsurancePolicy/Update/:actionType/:id',
    component: 'InsurancePolicyEdit',
    isMenu: false,
    meta: {
      btn: [
        {marker: 'BD_MANAGE_UPDATE', name: '保存'}
      ],
      active: 2004
    }
  },
  {
    id: 2005,
    pid: 20,
    name: '续期保单管理',
    icon: '',
    marker: 'P_RENEWAL_LIST',
    path: '/app/InsuranceRenewal/List',
    component: 'InsuranceRenewalList',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'BD_RENEWAL_POLICY', name: '查询'},
        {marker: 'BD_RENEWAL_SAVE', name: '续期缴费'},
        {marker: 'BD_REDISTR_SAVE', name: '再分配'},
        {marker: 'BD_RENEWAL_DETAIL', name: '续期缴费查询详情'}
      ]
    }
  },
  {
    id: 200501,
    pid: 2005,
    name: '续期缴费',
    icon: '',
    marker: 'P_RENEWAL_EDIT',
    path: '/app/InsuranceRenewal/Edit/:id',
    component: 'InsuranceRenewalEdit',
    isMenu: false,
    meta: {
      active: 2005,
      btn: [
        {marker: 'BD_RENEWAL_SAVE', name: '保存'},
        {marker: 'BD_RENEWAL_DETAIL', name: '详情'}
      ]
    }
  },
  {
    id: 2006,
    pid: 20,
    name: '保单再分配记录',
    icon: '',
    marker: 'P_REDISTR_LIST',
    path: '/app/InsuranceRedistr/List',
    component: 'InsuranceRedistrList',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'BD_REASSIGN_LIST', name: '查询'},
        {marker: 'BD_REASSIGN_TRACK', name: '分配轨迹'}
      ]
    }
  },
  // 保险公司管理

  {
    id: 30,
    pid: 0,
    name: '保险公司管理',
    icon: 'el-icon-3',
    marker: 'M_COMPANY',
    path: '/app/default',
    isMenu: true,
    meta: {}
  },
  {
    id: 3001,
    pid: 30,
    name: '保险公司管理',
    icon: 'el-icon-setting',
    marker: 'P_COMPANY_LIST',
    path: '/app/Company/List',
    component: 'CompanyList',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'COMPANY_MANAGE_LIST', name: '查询'},
        {marker: 'COMPANY_MANAGE_EDIT', name: '修改'},
        {marker: 'COMPANY_MANAGE_DETAIL', name: ' 详情'}
      ]
    }
  },
  {
    id: 300101,
    pid: 3001,
    name: '保险公司修改',
    icon: 'el-icon-setting',
    marker: 'COMPANY_MANAGE_EDIT',
    path: '/app/Company/Update/:id',
    component: 'CompanyEdit',
    isMenu: false,
    meta: {
      btn: [
        {marker: 'COMPANY_MANAGE_EDIT', name: '保存'}
      ],
      active: 3001
    }
  },
  {
    id: 3002,
    pid: 30,
    name: '保险公司录入',
    icon: 'el-icon-setting',
    marker: 'P_COMPANY_EDIT',
    path: '/app/Company/Edit/:id',
    href: '/app/Company/Edit/0',
    component: 'CompanyEdit',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'COMPANY_MANAGE_ADD', name: '保存'}
      ]
    }
  },
  {
    id: 31,
    pid: 0,
    name: '产品管理',
    icon: 'el-icon-4',
    marker: 'M_PRODUCT',
    path: '/app/default',
    isMenu: true,
    meta: {}
  },
  {
    id: 3101,
    pid: 31,
    name: '产品管理',
    icon: 'el-icon-setting',
    marker: 'P_PRODUCT_LIST',
    path: '/app/Product/List',
    component: 'ProductList',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'PRODUCT_MANAGE_LIST', name: '查询'},
        {marker: 'PRODUCT_MANAGE_UPDATE', name: '修改'},
        {marker: 'PRODUCT_MANAGE_DETAIL', name: '详情'}
      ]
    }
  },
  {
    id: 310101,
    pid: 3101,
    name: '产品修改',
    icon: 'el-icon-setting',
    marker: 'PRODUCT_MANAGE_UPDATE',
    path: '/app/Product/Update/:id',
    component: 'ProductEdit',
    isMenu: false,
    meta: {
      btn: [
        {marker: 'PRODUCT_MANAGE_UPDATE', name: '保存'}
      ],
      active: 3101
    }
  },
  {
    id: 3102,
    pid: 31,
    name: '产品录入',
    icon: 'el-icon-setting',
    marker: 'P_PRODUCT_EDIT',
    path: '/app/Product/Edit/:id',
    href: '/app/Product/Edit/0',
    component: 'ProductEdit',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'PRODUCT_MANAGE_ADD', name: '保存'}
      ]
    }
  },
  {
    id: 3103,
    pid: 31,
    name: '产品佣金费率管理',
    icon: 'el-icon-setting',
    marker: 'P_PRODUCT_COMMISSION_LIST',
    path: '/app/Product/Rate/List',
    component: 'ProductRateList',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'PRODUCT_RATE_LIST', name: '查询'},
        {marker: 'PRODUCT_RATE_UPDATE', name: '佣金费率设置'},
        {marker: 'PRODUCT_RATE_DETAIL', name: '查询佣金费率详情'},
        {marker: 'PC_EXPORT', name: '导出模板'},
        {marker: 'PC_IMPORT', name: '导入'}
      ]
    }
  },
  {
    id: 3104,
    pid: 31,
    name: '产品折标系数管理',
    icon: 'el-icon-setting',
    marker: 'P_PRODUCT_COMMISSION_LIST',
    path: '/app/Product/Coefficient/List',
    component: 'ProductCoefficientList',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'PRODUCT_RATE_LIST', name: '查询'},
        {marker: 'PRODUCT_COEFFICIENT_UPDATE', name: '折标系数设置'},
        {marker: 'PRODUCT_COEFFICIENT_DETAIL', name: '折标系数详情'},
        {marker: 'PC_EXPORT', name: '导出模板'},
        {marker: 'PC_IMPORT', name: '导入'}
      ]
    }
  },
  {
    id: 310301,
    pid: 3103,
    name: '产品佣金费率设置',
    icon: 'el-icon-setting',
    marker: 'PRODUCT_RATE_UPDATE',
    path: '/app/Product/Rate/Edit/:id/:p_name',
    component: 'ProductRateEdit',
    isMenu: false,
    meta: {
      active: 3103,
      btn: [
        {marker: 'PRODUCT_RATE_UPDATE', name: '保存'}
      ]
    }
  },
  {
    id: 310302,
    pid: 3103,
    name: '产品折标系数设置',
    icon: 'el-icon-setting',
    marker: 'PRODUCT_COEFFICIENT_UPDATE',
    path: '/app/Product/Coefficient/Edit/:id',
    component: 'ProductCoefficientEdit',
    isMenu: false,
    meta: {
      active: 3104,
      btn: [
        {marker: 'PRODUCT_RATE_UPDATE', name: '保存'}
      ]
    }
  },

  // 机构管理
  {
    id: 40,
    pid: 0,
    name: '机构管理',
    icon: 'el-icon-5',
    marker: 'P_PRODUCT_COMMISSION_PAGE',
    path: '/app/default',
    isMenu: true,
    meta: {}
  },
  {
    id: 4001,
    pid: 40,
    name: '机构管理',
    icon: 'el-icon-setting',
    marker: 'M_ORGANI',
    path: '/app/Agency/List',
    component: 'AgencyList',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'SELECT_ORGANI_LIST', name: '查询'},
        {marker: 'ORGANI_MANAGE_UPDATE', name: '修改'},
        {marker: 'ORGANI_MANAGE_DETAIL', name: '详情'}
      ]
    }
  },
  {
    id: 400101,
    pid: 4001,
    name: '机构修改',
    icon: 'el-icon-setting',
    marker: 'ORGANI_MANAGE_UPDATE',
    path: '/app/Agency/UPDATE',
    component: 'AgencyEdit',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'ORGANI_MANAGE_UPDATE', name: '保存'}
      ],
      active: 4001
    }
  },
  {
    id: 4002,
    pid: 40,
    name: '机构录入',
    icon: 'el-icon-setting',
    marker: 'P_ORGANI_LIST',
    path: '/app/Agency/Edit',
    component: 'AgencyEdit',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'ORGANI_MANAGE_ADD', name: '保存'}
      ]
    }
  },
  {
    id: 4003,
    pid: 40,
    name: '机构层级设置',
    icon: 'el-icon-setting',
    marker: 'P_ORGANI_LEVEL',
    path: '/app/Agency/Level',
    component: 'AgencyLevel',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'ORGANI_LEVER_ADD', name: '新增'},
        {marker: 'ORGANI_LEVER_UPDATE', name: '修改'},
        {marker: 'ORGANI_LEVER_DELECT', name: '删除'}
      ]
    }
  },
  {
    id: 4004,
    pid: 40,
    name: '组织关系管理',
    icon: 'el-icon-setting',
    marker: 'P_ORGANI_RELATION',
    path: '/app/Organization/List',
    component: 'OrganizationList',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'TEAM_MANAGE_LIST', name: '查询'},
        {marker: 'TEAM_MANAGE_ADD_AREA', name: '新增区'},
        {marker: 'TEAM_MANAGE_ADD_DEPA', name: '新增部'},
        {marker: 'TEAM_MANAGE_PUT', name: '修改'},
        {marker: 'TEAM_MANAGE_DELECT', name: '注销'},
        {marker: 'TEAM_MANAGE_MOVE', name: '迁移'},
        {marker: 'TEAM_MANAGE_DETAIL', name: '查询详情'}
      ]
    }
  },
  {
    id: 400401,
    pid: 4004,
    name: '组织机构详情',
    icon: 'el-icon-setting',
    marker: 'TEAM_MANAGE_DETAIL',
    path: '/app/Organization/Detail',
    component: 'OrganizationDetail',
    isMenu: false,
    meta: {
      active: 4004
    }
  },
  {
    id: 400402,
    pid: 4004,
    name: '新增组织(区)',
    icon: 'el-icon-setting',
    marker: 'TEAM_MANAGE_ADD_AREA',
    path: '/app/Organization/OrganizationNewArea',
    component: 'OrganizationNewArea',
    isMenu: false,
    meta: {
      active: 4004,
      btn: [
        {marker: 'TEAM_MANAGE_ADD_AREA', name: '保存'}
      ]
    }
  },
  {
    id: 400403,
    pid: 4004,
    name: '新增组织(部)',
    icon: 'el-icon-setting',
    marker: 'TEAM_MANAGE_ADD_DEPA',
    path: '/app/Organization/OrganizationNewBut',
    component: 'OrganizationNewBut',
    isMenu: false,
    meta: {
      active: 4004,
      btn: [
        {marker: 'TEAM_MANAGE_ADD_DEPA', name: '保存'}
      ]
    }
  },
  // {
  //   id: 4005,
  //   pid: 40,
  //   name: '组织关系变更记录',
  //   icon: 'el-icon-setting',
  //   marker: 'P_TEAM_RELATION_CHANGE',
  //   path: '/app/Organization/Change',
  //   component: 'OrganizationChangeList',
  //   isMenu: true,
  //   meta: {
  //     btn: [
  //       {marker: '', name: '查询'}
  //     ]
  //   }
  // },
  {
    id: 4006,
    pid: 40,
    name: '组织关系迁移审核',
    icon: 'el-icon-setting',
    marker: 'P_TEAM_RELATION_MIGRATE_AUDIT',
    path: '/app/Organization/Migate/Approval',
    component: 'OrganizationMigateApproval',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'ORGANI_MANAGE_AUDIT', name: '查询'},
        {marker: 'ORGANT_MANAGE_MOVEAUDITPASS', name: '审核通过'},
        {marker: 'ORGANT_MANAGE_MOVEAUDITNOPASS', name: '审核不通过'},
        {marker: 'ORGANT_MANAGE_MOVEAUDITTOPASS', name: '撤回审核'}
      ]
    }
  },
  {
    id: 4007,
    pid: 40,
    name: '组织关系迁移复核',
    icon: 'el-icon-setting',
    marker: 'P_TEAM_RELATION_MIGRATE_REVIEW',
    path: '/app/Organization/Migate/Review',
    component: 'OrganizationMigateReview',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'ORGANI_MANAGE_AUDIT_REPEAT', name: '查询'},
        {marker: 'ORGANT_MANAGE_MOVEAUDITPASS_REPEAT', name: '审核通过'},
        {marker: 'ORGANT_MANAGE_MOVEAUDITNOPASS_REPEAT', name: '审核不通过'},
        {marker: 'ORGANT_MANAGE_MOVEAUDITTOPASS_REPEAT', name: '撤回审核'}
      ]
    }
  },
  {
    id: 4008,
    pid: 40,
    name: '组织关系迁移记录',
    icon: 'el-icon-setting',
    marker: 'P_TEAM_RELATION_MIGRATE_LIST',
    path: '/app/Organization/Migate/List',
    component: 'OrganizationMigateList',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'ORGANI_MANAGE_AUDIT_RECODE', name: '查询'}
      ]
    }
  },
  {
    id: 50,
    pid: 0,
    name: '人员管理',
    icon: 'el-icon-6',
    marker: 'M_AGENT',
    path: '',
    isMenu: true,
    meta: {}
  },
  {
    id: 5001,
    pid: 50,
    name: '代理人管理',
    icon: 'el-icon-setting',
    marker: 'P_AGENT_LIST',
    path: '/app/Agent/List',
    isMenu: true,
    component: 'AgentList',
    meta: {
      btn: [
        {marker: 'AGENT_MENAGE_LIST', name: '查询'},
        {marker: 'AGENT_MANAGE_EDIT', name: '修改'},
        {marker: 'AGENT_MANAGE_DIMISSION', name: '离司申请'},
        {marker: 'AGENT_MANAGE_MOVE', name: '迁移'},
        {marker: 'AGENT_MANAGE_DETAIL', name: '查询详情'}
      ]
    }
  },
  {
    id: 500101,
    pid: 5001,
    name: '代理人详情',
    icon: 'el-icon-setting',
    marker: 'AGENT_MANAGE_DETAIL',
    path: '/app/Agent/Detail',
    component: 'AgentDetail',
    isMenu: false,
    meta: {
      active: 5001
    }
  },
  {
    id: 500102,
    pid: 5001,
    name: '代理人修改',
    icon: 'el-icon-setting',
    marker: 'AGENT_MANAGE_EDIT',
    path: '/app/Agent/UPDATE/:id/:name',
    isMenu: true,
    component: 'AgentEdit',
    meta: {
      btn: [
        {marker: 'AGENT_MANAGE_EDIT', name: '保存'}
      ],
      active: 5001
    }
  },
  {
    id: 5002,
    pid: 50,
    name: '职级设定',
    icon: 'el-icon-setting',
    marker: 'P_AGENT_LEVEL',
    path: '/app/Level/Manage',
    component: 'LevelManage',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'AGENT_LEVEL_ADD', name: '新增'},
        {marker: 'AGENT_LEVEL_UPDATE', name: '修改'},
        {marker: 'AGENT_LEVEL_DELETE', name: '删除'},
        {marker: 'SELECT_AGENT_LEVEL_LIST', name: '查询'}
      ]
    }
  },
  {
    id: 5003,
    pid: 50,
    name: '代理人录入',
    icon: 'el-icon-setting',
    marker: 'P_AGENT_EDIT',
    path: '/app/Agent/Edit/:id',
    href: '/app/Agent/Edit/0',
    component: 'AgentEdit',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'AGENT_MANAGE_ADD', name: '新增'},
        {marker: 'AGENT_MANAGE_EXPORT', name: '导入模版下载'},
        {marker: 'AGENT_MANAGE_IMPORT', name: '批量导入'}
      ]
    }
  },
  {
    id: 5004,
    pid: 50,
    name: '入司审批',
    icon: 'el-icon-setting',
    marker: 'P_AGENT_ENTRY',
    path: '/app/Entry/Approval',
    component: 'EntryApproval',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'AGENT_BATCH_Entry_LIST', name: '查询'},
        {marker: 'AGENT_MANAGE_BATCH', name: '审批'}
      ]
    }
  },
  {
    id: 5005,
    pid: 50,
    name: '离司审批',
    icon: 'el-icon-setting',
    marker: 'P_AGENT_DIMISSION',
    path: '/app/Resign/Approval',
    component: 'ResignApproval',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'AGENT_BATCH_RESIGN_LIST', name: '查询'},
        {marker: 'AGENT_MANAGE_ENTRY', name: '审批'}
      ]
    }
  },
  {
    id: 5006,
    pid: 50,
    name: '迁移审批',
    icon: 'el-icon-setting',
    marker: 'P_AGENT_MIGRATE',
    path: '/app/Migate/Approval',
    component: 'MigateApproval',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'AGENT_MANAGE_LIST', name: '查询'},
        {marker: 'AGENT_MANAGE_MIGRATION', name: '审批'}
      ]
    }
  },
  // 考核管理
  {
    id: 60,
    pid: 0,
    name: '考核管理',
    icon: 'el-icon-7',
    marker: 'M_ACCESS',
    isMenu: true,
    meta: {}
  },
  {
    id: 6001,
    pid: 60,
    name: '考核管理',
    marker: 'P_ACCESS_LISST',
    path: '/app/AssessmentManage/AssessmentList',
    component: 'AssessmentList',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'EXAMINE_LIST', name: '查询'},
        {marker: 'EXAMINE_DISPOSE', name: '考核确认'},
        {marker: 'EXAMINE_DISPOSE_CONFIRM', name: '确认'},
        {marker: 'EXAMINE_DETAIL', name: '详情'}
      ]
    }
  },
  {
    id: 6002,
    pid: 60,
    name: '考核结果',
    marker: 'P_ACCESS_RESULT',
    path: '/app/AssessmentManage/AssessmentListResult',
    component: 'AssessmentListResult',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'EXAMINE_RESULT_LIST', name: '查询'},
        {marker: 'EXAMINE_RESULT_IMPORT', name: '考核轨迹导入'},
        {marker: 'EXAMINE_RESULT_EXPORT', name: '模板下载'},
        {marker: 'EXAMINE_RESULT_DETAIL', name: '考核轨迹详情'}
      ]
    }
  },
  {
    id: 6003,
    pid: 60,
    name: '考核预警',
    marker: 'P_ACCESS_WARNING',
    path: '/app/AssessmentManage/AssessmentListWarning',
    component: 'AssessmentListWarning',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'EXAMINE_WARN_LIST', name: '查询'},
        {marker: 'EXAMINE_WARN_EXPORT', name: '导出'},
        {marker: 'EXAMINE_WARN_DETAIL', name: '详情'}
      ]
    }
  },
  // 佣金结算
  {
    id: 70,
    pid: 0,
    name: '佣金结算',
    icon: 'el-icon-8',
    marker: 'M_COMMISSION',
    isMenu: true,
    meta: {}
  },
  {
    id: 7001,
    pid: 70,
    name: '佣金查询',
    marker: 'P_COMMISSION_LIST',
    path: '/app/Commission',
    component: 'CommissionList',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'COMMISSION_MANAGE_LIST', name: '查询'},
        {marker: 'COMMISSION_MANAGE_EXPORT', name: '导出'},
        {marker: 'COMMISSION_MANAGE_DETAIL', name: '详情'}
      ]
    }
  },
  // 报表统计
  {
    id: 80,
    pid: 0,
    name: '报表统计',
    icon: 'el-icon-9',
    marker: 'M_REPORT',
    isMenu: true,
    meta: {}
  },
  {
    id: 8001,
    pid: 80,
    name: '保费统计',
    icon: 'el-icon-setting',
    marker: 'P_REPORT_STAT',
    path: '/app/StatisticalReport',
    component: 'StatisticalReportList',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'REPORT_MANAGE_LIST', name: '查询'},
        {marker: 'EXPORT_MANAGE_LIST', name: '导出'}
      ]
    }
  },
  {
    id: 8002,
    pid: 80,
    name: '个人业绩统计',
    icon: 'el-icon-setting',
    marker: 'P_PERSION_STAT',
    path: '/app/StatisticalPersionResult',
    component: 'StatisticalPersionResult',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'AGENT_KPI', name: '查询'},
        {marker: 'AGENT_EXPORT', name: '导出'}
      ]
    }
  },
  {
    id: 8003,
    pid: 80,
    name: '组织业绩统计',
    icon: 'el-icon-setting',
    marker: 'P_ORGANIZATION_STAT',
    path: '/app/StatisticalOrganizationResult',
    component: 'StatisticalOrganizationResult',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'TEAM_KPI', name: '查询'},
        {marker: 'TEAM_EXPORT', name: '导出'}
      ]
    }
  },
  // 权限管理
  {
    id: 90,
    pid: 0,
    name: '权限管理',
    icon: 'el-icon-10',
    marker: 'M_PERMISSION',
    path: '/app/default',
    isMenu: true,
    meta: {}
  },
  {
    id: 9001,
    pid: 90,
    name: '角色管理',
    icon: 'el-icon-setting',
    marker: 'P_ROLE_LIST',
    path: '/app/RoleManage/RolePage',
    component: 'RolePage',
    isMenu: true,
    isSuper: true,
    meta: {
      btn: [
        {marker: 'ROLE_MANAGE_ADD', name: '新增'},
        {marker: 'ROLE_MANAGE_DELETE', name: '删除'}
      ]
    }
  },
  {
    id: 9002,
    pid: 90,
    name: '用户管理',
    icon: 'el-icon-setting',
    marker: 'P_USER_LIST',
    path: '/app/RoleManage/UserPage',
    component: 'UserPage',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'USER_MANAGE_LIST', name: '查询'},
        {marker: 'USER_MANAGE_ADD', name: '新增'},
        {marker: 'USER_MANAGE_EDIT', name: '修改'},
        {marker: 'USER_MANAGE_DELETE', name: '删除'}
      ]
    }
  },
  {
    id: 9003,
    pid: 90,
    name: '权限分配',
    icon: 'el-icon-setting',
    marker: 'P_PERMISSION_ASSIGN',
    path: '/app/RoleManage/PermissionPage',
    component: 'PermissionPage',
    isMenu: true,
    isSuper: true,
    meta: {
      btn: [
        {marker: 'USER_PERMIS_ASSIGN', name: '保存'}
      ]
    }
  },
  {
    id: 100,
    pid: 0,
    name: '系统管理',
    icon: 'el-icon-11',
    marker: 'M_SYSTEM',
    path: '/app/PasswordManage',
    isMenu: true,
    meta: {}
  },
  {
    id: 10001,
    pid: 100,
    name: '修改密码',
    icon: 'el-icon-setting',
    marker: 'P_MODIFY_PASSWORD',
    path: '/app/PasswordManage',
    component: 'PasswordChange',
    isMenu: true,
    meta: {
      btn: [
        {marker: 'UPDATE_ACCOUNT_PASSWORD', name: '保存'}
      ]
    }
  }
]
