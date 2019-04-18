/*
 * @Author: zhangxiaoda
 * @Date: 2018-09-17 14:02:00
 * @Last Modified by: zhangxiaoda
 * @Last Modified time: 2019-01-15 13:59:36
 * @Dest 所有的表单校验都在这里配置
 */
import Validator from './validator'
export default {
  LOGIN: {
    c_code: [
      { required: true, message: '请输入公司编号', trigger: 'blur' }
    ],
    u_name: [
      { required: true, message: '请输入登录用户名', trigger: 'blur' }
    ],
    u_password: [
      { required: true, message: '请输入登录密码', trigger: 'blur' }
    ]
  },

  // 产品编辑
  PRODUCT_EDIT: {
    p_code: [
      { required: true, message: '产品代码不能为空', trigger: 'blur' },
      { pattern: /^[0-9]{1,20}$/, message: '产品代码格式不正确', trigger: 'blur' }
    ],
    c_id: [
      { required: true, message: '保险公司还未选择', trigger: 'blur' }
    ],
    p_name: [
      { required: true, message: '产品名称不能为空', trigger: 'blur' }
    ],
    p_status: [
      { required: true, message: '销售状态还未选择', trigger: 'change' }
    ],
    p_type: [
      { required: true, message: '产品类型还未选择', trigger: 'change' }
    ],
    p_bao_type: [
      { required: true, message: '保险期间类型不能为空', trigger: 'change' }
    ],
    p_pay_type: [
      { required: true, message: '缴费期间不能为空', trigger: 'change' }
    ],
    p_pay_way: [
      { required: true, message: '缴费方式还未选择', trigger: 'change' }
    ],
    p_property: [
      { required: true, message: '主附险类型还未选择', trigger: 'blur' }
    ],
    p_r13_type: [
      { required: true, message: '继续率还未选择', trigger: 'blur' }
    ]
  },
  // 机构录入
  ORAGN_CREATE: {
    o_name: [
      { required: true, message: '请填写机构名称', trigger: 'blur' }
    ],
    o_g_id: [
      { required: true, message: '请选择机构类型', trigger: 'change' }
    ],
    o_pid: [
      { required: true, message: '请选择上级机构', trigger: 'change' }
    ],
    o_user: [
      { required: true, message: '请填写负责人姓名', trigger: 'blur' }
    ],
    o_phone: [
      { required: true, message: '手机号码不能为空', trigger: 'blur' },
      { validator: Validator.phone, message: '手机号码格式不正确', trigger: 'blur' }
    ],
    o_province: [
      { required: true, message: '请选择所属地区', trigger: 'blur' }
    ],
    o_create: [
      { required: true, message: '请选择成立日期', trigger: 'change' }
    ],
    o_status: [
      { required: true, message: '请选择状态', trigger: 'change' }
    ]
  },
  // 新增组织(区) 新增组织(部)
  ORAGN_CREATEAREA: {
    o_id: [
      { required: true, message: '请选择组织机构', trigger: 'change' }
    ],
    t_pid: [
      { required: true, message: '请选择上级组织', trigger: 'change' }
    ],
    r_id: [
      { required: true, message: '请选择基本法', trigger: 'change' }
    ],
    t_p_grade: [
      { required: true, message: '请选择上级组织级别', trigger: 'change' }
    ],
    t_name: [
      { required: true, message: '请填写组织名称', trigger: 'blur' }
    ],
    t_grade: [
      { required: true, message: '请选择组织级别', trigger: 'change' }
    ],
    t_status: [
      { required: true, message: '请选择组织状态', trigger: 'change' }
    ],
    t_create: [
      { required: true, message: '请选择建立日期', trigger: 'change' }
    ]
  },
  // 保险公司编辑
  COMPANY_EDIT: {
    c_name: [
      { required: true, message: '保险公司名称不能为空', trigger: 'blur' }
    ],
    c_status: [
      { required: true, message: '合作状态还未选择', trigger: 'blur' }
    ]
  },

  // 保单或者投保单编辑页面
  INS_EDIT: {
    // 保单基本信息
    c_id: [
      { required: true, message: '保险公司还未选择', trigger: ['change', 'blur'] }
    ],
    tb_code: [
      { required: true, message: '投保单号不能为空', trigger: 'blur' }
    ],
    bd_code: [
      { required: true, message: '投保单号不能为空', trigger: 'blur' }
    ],
    // 保单代理人信息
    ag_job_number: [
      { required: true, message: '代理人工号不能为空', trigger: 'blur' }
    ],
    tb_date: [
      { required: true, message: '投保日期不能为空', trigger: 'blur' }
    ],
    bd_time: [
      { required: true, message: '生效日期不能为空', trigger: 'blur' }
    ],
    // 保单投保人信息
    tb_name: [
      { required: true, message: '姓名不能为空', trigger: 'blur' }
    ],
    tb_id_type: [
      { required: true, message: '证件类型还未选择', trigger: 'change' }
    ],
    tb_id_longtime: [
      { required: true, message: '证件有效期还未选择', trigger: 'change' }
    ],
    tb_id_number: [
      { required: true, message: '证件号码不能为空', trigger: 'blur' }
    ],
    tb_sex: [
      { required: true, message: '性别还未选择', trigger: 'change' }
    ],
    tb_birthday: [
      { required: true, message: '出生日期不能为空', trigger: 'blur' }
    ],
    tb_phone: [
      { required: true, message: '手机号码不能为空', trigger: 'blur' },
      { validator: Validator.phone, message: '手机号码格式不正确', trigger: 'blur' }
    ],
    tb_email: [
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    tb_addr: [
      { required: true, message: '详细地址不能为空', trigger: 'blur' }
    ],

    // 保单 被保人信息
    bb_tb_relation: [
      { required: true, message: '与投保人关系还未选择', trigger: 'change' }
    ],
    ir_name: [
      { required: true, message: '姓名不能为空', trigger: 'blur' }
    ],
    ir_id_type: [
      { required: true, message: '证件类型还未选择', trigger: 'change' }
    ],
    ir_id_number: [
      { required: true, message: '证件号码不能为空', trigger: 'blur' }
    ],
    ir_sex: [
      { required: true, message: '性别还未选择', trigger: ['blur', 'change'] }
    ],
    ir_birthday: [
      { required: true, message: '出生日期不能为空', trigger: 'blur' }
    ],
    ir_id_longtime: [
      { required: true, message: '证件有效期还未选择', trigger: 'change' }
    ],
    ir_phone: [
      { required: true, message: '手机号码不能为空', trigger: 'blur' },
      { validator: Validator.phone, message: '手机号码格式不正确', trigger: 'blur' }
    ],
    ir_email: [
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    ir_addr: [
      { required: true, message: '详细地址不能为空', trigger: 'blur' }
    ],

    // 保单受益人信息
    f_type: [
      { required: true, message: '受益类型还未选择', trigger: 'blur' }
    ],
    f_percent: [
      { required: true, message: '受益人比例不能为空', trigger: 'blur' }
    ],
    f_name: [
      { required: true, message: '姓名不能为空', trigger: 'blur' }
    ],
    f_id_type: [
      { required: true, message: '证件类型还未选择', trigger: 'change' }
    ],
    f_id_number: [
      { required: true, message: '证件号码不能为空', trigger: 'blur' }
    ],
    f_sex: [
      { required: true, message: '性别还未选择', trigger: 'change' }
    ],
    f_birthday: [
      { required: true, message: '出生日期不能为空', trigger: 'blur' }
    ],
    f_phone: [
      { required: true, message: '手机号码不能为空', trigger: 'blur' },
      { validator: Validator.phone, message: '手机号码格式不正确', trigger: 'blur' }
    ],

    // 保单险种类型
    p_code: [
      { required: true, message: '险种代码不能为空', trigger: 'blur' }
    ],
    sp_bao_type: [
      { required: true, message: '保险期间还未选择', trigger: 'change' }
    ],
    sp_pay_type: [
      { required: true, message: '缴费期间还未选择', trigger: 'change' }
    ],
    sp_pay_way: [
      { required: true, message: '缴费方式还未选择', trigger: 'change' }
    ],
    sp_money: [
      { required: true, message: '基础保费金额', trigger: 'blur' }
    ],
    sp_premium: [
      { required: true, message: '保费不能为空', trigger: 'blur' },
      { validator: Validator.isFloat, message: '保费必须为数字,保留两位小数', trigger: 'blur' }
    ],
    sp_auto: [
      { required: true, message: '是否自动续保还未选择', trigger: 'blur' }
    ],
    // 保单缴费信息
    pay_first: [
      { required: true, message: '首付保费合计不能为空', trigger: 'blur' }
    ],
    pay_name: [
      { required: true, message: '开户户主不能为空', trigger: 'blur' }
    ],
    pay_bank: [
      { required: true, message: '开户银行还未选择', trigger: 'change' }
    ],
    pay_account: [
      { required: true, message: '银行卡号不能为空', trigger: 'blur' }
    ]
  },

  // 投保单转保单
  TO_POLICY: {
    bd_code: [
      { required: true, message: '保单号不能为空', trigger: 'blur' }
    ],
    bd_time: [
      { required: true, message: '生效时间不能为空', trigger: 'blur' }
    ]
  },
  // 代理人录入
  AGENT_EDIT: {
    ag_name: [
      { required: true, message: '代理人姓名不能为空', trigger: 'blur' }
    ],
    ag_id_type: [
      { required: true, message: '证据类型还未选择', trigger: 'blur' }
    ],
    ag_sex: [
      { required: true, message: '性别还未选择', trigger: 'change' }
    ],
    ag_id_number: [
      { required: true, message: '证件号码不能为空', trigger: 'blur' }
    ],
    ag_birthday: [
      { required: true, message: '出生日期不能为空', trigger: 'blur' }
    ],
    ag_nation: [
      { required: true, message: '民族还未选择', trigger: 'change' }
    ],
    ag_native: [
      { required: true, message: '籍贯不能为空', trigger: 'blur' }
    ],
    ag_phone: [
      { required: true, message: '手机号不能为空', trigger: 'blur' },
      { validator: Validator.phone, message: '手机号格式不正确' }
    ],
    ag_email: [
      { required: false, type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    ag_job_number: [
      { required: true, message: '工号不能为空', trigger: 'blur' }
    ],
    o_id: [
      { required: true, message: '所属机构还未选择', trigger: 'change' }
    ],
    t_id: [
      { required: true, message: '所属组织还未选择', trigger: 'change' }
    ],
    jg_id: [
      { required: true, message: '当前职级还未选择', trigger: 'change' }
    ],
    ag_status: [
      { required: true, message: '在职状态还未选择', trigger: 'change' }
    ],
    initial_jg_id: [
      { required: true, message: '入职级别还未选择', trigger: 'change' }
    ],
    ag_rejoin: [
      { required: true, message: '二次入司还未选择', trigger: 'change' }
    ],
    ag_bank_account: [
      { required: true, message: '银行卡号不能为空', trigger: 'blur' }
    ],
    ag_bank: [
      { required: true, message: '开户行还未选择', trigger: 'change' }
    ],
    ag_contact_name: [
      { required: true, message: '紧急联系人不能为空', trigger: 'blur' }
    ],
    ag_contact_phone: [
      { required: true, message: '手机号不能为空', trigger: 'blur' },
      { validator: Validator.phone, message: '手机号格式不正确' }
    ]
  },
  // 组织迁移
  ORGANI_MOVE: {
    o_new_id: [
      { required: true, message: '变更后所属机构不能为空', trigger: 'change' }
    ],
    t_new_idsub: [
      { required: true, message: '变更后上级组织代码不能为空', trigger: 'blur' }
    ],
    t_g_new_id: [
      { required: true, message: '变更后组织级别不能为空', trigger: 'change' }
    ]
  },

  // 代理人迁移
  AGENT_MOVE: {
    t_code: [
      { required: true, message: '迁入组织代码不能为空', trigger: 'blur' }
    ],
    u_agentName: [
      { required: true, message: '迁入组织名称不能为空', trigger: 'blur' }
    ],
    after_jg_id: [
      { required: true, message: '迁入职级不能为空', trigger: 'change' }
    ],
    u_code: [
      { required: true, message: '迁入组织主管代码不能为空', trigger: 'blur' }
    ],
    u_name: [
      { required: true, message: '迁入组织主管名称不能为空', trigger: 'blur' }
    ],
    reason: [
      { required: true, message: '迁移原因不能为空', trigger: 'blur' }
    ]
  },

  BD_REASSIGN: {
    it_type: [
      { required: true, message: '分配类型还未选择', trigger: 'blur' }
    ],
    new_ag_id: [
      { required: true, message: '代理人还未选择', trigger: 'blur' }
    ]
  }
}
