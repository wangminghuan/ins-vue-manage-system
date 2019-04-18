/*
 * @Author: zhangxiaoda
 * @Date: 2018-09-26 11:24:09
 * @Last Modified by: zhangxiaoda
 * @Last Modified time: 2019-02-28 10:14:25
 * @Desc 业务字典维护表
 * @Naming 命名要大写,多个单词用下划线隔开
 */
export default {
  // 产品类型
  PRODUCT_TYPE: [
    { label: '健康险', value: 1 },
    { label: '意外险', value: 2 },
    { label: '人寿险', value: 3 }
  ],

  // 产品状态
  PRODUCT_STATUS: [
    { label: '在售', value: 1 },
    { label: '停售', value: 0 }
  ],

  // 产品-主附险类型
  PRODUCT_PROPERTY: [
    { label: '主险', value: 1 },
    { label: '附加险', value: 2 },
    { label: '组合险', value: 3 }
  ],

  // 产品-保险期间类型
  PRODUCT_BAO_TYPE: [
    { label: '保终身', value: 0 },
    { label: '保至', value: 1 },
    { label: '年', value: 2 },
    { label: '月', value: 3 },
    { label: '日', value: 4 }
  ],

  // 产品-缴费期间类型
  PRODUCT_PAY_TYPE: [
    { label: '缴至 ', value: 1 },
    { label: '年', value: 2 }
  ],

  // 交费方式
  PRODUCT_PAY_WAY: [
    { label: '趸交', value: 0 },
    { label: '年交', value: 1 },
    { label: '半年交 ', value: 2 },
    { label: '季交 ', value: 3 },
    { label: '月交 ', value: 4 }
  ],

  PRODUCT_AUTO: [
    { label: '是', value: 1 },
    { label: '否', value: 0 }
  ],

  // 机构管理-组织关系管理-修改按钮
  AGENCY_ORGANI_STATE: [
    { label: '有效', value: 1 },
    { label: '无效', value: 0 }
  ],

  // 机构管理-组织关系管理-组织状态
  AGENCY_ORGANI_STATUS: [
    { label: '有效', value: 1 },
    { label: '无效', value: 0 },
    { label: '迁移中', value: 2 }
  ],
  // 机构管理-机构录入
  AGENCY_STATUS: [
    { label: '营业', value: 1 },
    { label: '关停', value: 0 }
  ],
  // 机构管理-组织关系管理-新增部
  AGENCY_ORGANI_DIRECTLY: [
    { label: '是', value: 1 },
    { label: '否', value: 0 }
  ],
  // 机构管理-组织关系迁移审核-迁移状态
  AGENCY_MOVE_STATUS: [
    { label: '待审核', value: 1 },
    { label: '初审驳回', value: 2 },
    { label: '待复核', value: 3 },
    { label: '复核通过', value: 4 },
    { label: '复核驳回', value: 5 }
  ],
  // 机构管理-组织关系管理-组织级别
  AGENCY_ORGANI_LEVEL: [
    { label: '区', value: 1 },
    { label: '部', value: 2 }
  ],

  // 机构管理-组织关系管理-新增区
  AGENCY_ORGANI_LAW: [
    { label: '基本法1', value: 1 }
  ],
  // 人员管理-入司审批-审批状态
  PERSON_ENTRY_STATUS: [
    { label: '待审核', value: 0 },
    { label: '审核通过', value: 1 },
    { label: '审核驳回', value: 2 }
  ],
  // 人员管理-代理人管理-任职状态
  PERSON_AGENT_STATUS: [
    { label: '待入司', value: 0 },
    { label: '在职', value: 1 },
    { label: '考核保护', value: 2 },
    { label: '冻结', value: 3 },
    { label: '预离司', value: 4 },
    { label: '离司', value: 5 }
  ],
  // 保险公司 合作状态
  COMPANY_STATUS: [
    { label: '停用', value: 0 },
    { label: '正常', value: 1 }
  ],

  // 证件类型
  CARD_TYPE: [
    { label: '身份证', value: 11 },
    { label: '士兵证', value: 12 },
    { label: '警官证', value: 13 },
    { label: '军官证', value: 14 },
    { label: '户口簿', value: 15 },
    { label: '护照', value: 16 },
    { label: '出生证明', value: 17 }
  ],

  // 证件类型 - 是否长期
  CARD_LONGTIME: [
    { label: '长期', value: 1 },
    { label: '截止', value: 0 }
  ],

  GENDER: [
    { label: '男', value: 1 },
    { label: '女', value: 2 }
  ],

  // 保单人员关系
  PERSON_RELATION: [
    { label: '本人', value: 0 },
    { label: '父母', value: 1 },
    { label: '配偶', value: 2 },
    { label: '子女', value: 3 },
    { label: '亲属', value: 4 },
    { label: '雇佣关系', value: 5 }
  ],

  // 受益人
  BENEFICIARY: [
    { label: '法定受益人', value: 0 },
    { label: '指定受益人', value: 1 }
  ],

  // 逾期未付
  OVERDUE_STATUS: [
    { label: '请选择', value: -1 },
    { label: '合同终止', value: 0 },
    { label: '超期撤件', value: 1 },
    { label: '不适用', value: 2 }
  ],

  // 投保单状态
  TB_STATUS: [
    { label: '待核保', value: 0 },
    { label: '核保前撤单', value: 1 },
    { label: '拒单', value: 2 },
    { label: '承保前撤单', value: 3 },
    { label: '无效投保单', value: 4 },
    { label: '待承保', value: 5 },
    { label: '生效中', value: 6 },
    { label: '欠费中止', value: 7 },
    { label: '欠费终止', value: 8 },
    { label: '退保终止', value: 9 },
    { label: '理赔终止', value: 10 },
    { label: '到期终止', value: 11 }
  ],

  // 教育程度
  AG_EDUCATION: [
    { label: '小学', value: 0 },
    { label: '初中', value: 1 },
    { label: '高中', value: 2 },
    { label: '中专', value: 3 },
    { label: '大专', value: 4 },
    { label: '本科', value: 5 },
    { label: '研究生', value: 6 },
    { label: '博士', value: 7 }
  ],

  // 婚姻状态
  AG_MARRIED: [
    { label: '未婚', value: 0 },
    { label: '已婚', value: 1 }
  ],

  // 在职状态
  AG_STATUS: [
    { label: '待入司', value: 0 },
    { label: '在职', value: 1 },
    { label: '考核保护', value: 2 },
    { label: '冻结', value: 3 },
    { label: '预离司', value: 4 },
    { label: '离司', value: 5 }
  ],

  // 二次入司
  AG_REJOIN: [
    { label: '是', value: 1 },
    { label: '否', value: 0 }
  ],

  // 用户状态
  USER_STATUS: [
    { label: '无效', value: 0 },
    { label: '有效', value: 1 }
  ],

  ASSIGN_TYPE: [
    { label: '递归', value: 0 },
    { label: '继承', value: 1 }
  ],

  PRODUCT_PLAN: [
    {label: '默认方案', value: 1},
    {label: '短期方案', value: 0}
  ],

  ASSESS_SUGGEST: [
    {label: '维持', value: 1},
    {label: '晋升', value: 2},
    {label: '降级', value: 3}
  ],

  IS_PROTECTION: [
    {label: '否', value: 1},
    {label: '是', value: 2}
  ],

  IS_CONTINUE: [
    {label: '计入', value: 1},
    {label: '不计入', value: 2}
  ]

}
