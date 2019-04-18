// 通用页面
import PageLogin from './comm/PageLogin.vue'
import PageDefault from './comm/PageDefault.vue'
import Welcome from './comm/Welcome.vue'

// 保单管理
const InsurancePolicyList = () => import(/* webpackChunkName: "ins-manager" */ './InsurancePolicy/InsurancePolicyList.vue')
const InsurancePolicyEdit = () => import(/* webpackChunkName: "ins-manager" */ './InsurancePolicy/InsurancePolicyEdit.vue')
const InsurancePolicyDetail = () => import(/* webpackChunkName: "ins-manager" */ './InsurancePolicy/InsurancePolicyDetail.vue')
const InsuranceSlipEdit = () => import(/* webpackChunkName: "ins-manager" */ './InsurancePolicy/InsuranceSlipEdit.vue')
const InsuranceSlipList = () => import(/* webpackChunkName: "ins-manager" */ './InsurancePolicy/InsuranceSlipList.vue')
const InsuranceSlipDetail = () => import(/* webpackChunkName: "ins-manager" */ './InsurancePolicy/InsuranceSlipDetail.vue')
const InsuranceRenewalList = () => import(/* webpackChunkName: "ins-manager" */ './InsurancePolicy/InsuranceRenewalList.vue')
const InsuranceRenewalEdit = () => import(/* webpackChunkName: "ins-manager" */ './InsurancePolicy/InsuranceRenewalEdit.vue')
const InsuranceRedistrList = () => import(/* webpackChunkName: "ins-manager" */ './InsurancePolicy/InsuranceRedistrList.vue')

// 保险公司管理

const CompanyList = () => import(/* webpackChunkName: "ins_company" */ './InsuranceCompany/CompanyList.vue')
const CompanyEdit = () => import(/* webpackChunkName: "ins_company" */ './InsuranceCompany/CompanyEdit.vue')
const ProductList = () => import(/* webpackChunkName: "ins_company" */ './InsuranceCompany/ProductList.vue')
const ProductEdit = () => import(/* webpackChunkName: "ins_company" */ './InsuranceCompany/ProductEdit.vue')
const ProductRateList = () => import(/* webpackChunkName: "ins_company" */ './InsuranceCompany/ProductRateList.vue')
const ProductRateEdit = () => import(/* webpackChunkName: "ins_company" */ './InsuranceCompany/ProductRateEdit.vue')
const ProductCoefficientEdit = () => import(/* webpackChunkName: "ins_company" */ './InsuranceCompany/ProductCoefficientEdit.vue')
const ProductCoefficientList = () => import(/* webpackChunkName: "ins_company" */ './InsuranceCompany/ProductCoefficientList.vue')

// 机构管理
const AgencyLevel = () => import(/* webpackChunkName: "agency" */'./AgencyManage/AgencyLevel.vue')
const AgencyEdit = () => import(/* webpackChunkName: "agency" */'./AgencyManage/AgencyEdit.vue')
const AgencyList = () => import(/* webpackChunkName: "agency" */'./AgencyManage/AgencyList.vue')
const OrganizationMigateApproval = () => import(/* webpackChunkName: "agency" */'./AgencyManage/OrganizationMigateApproval.vue')
const OrganizationMigateReview = () => import(/* webpackChunkName: "agency" */'./AgencyManage/OrganizationMigateReview.vue')
const OrganizationChangeList = () => import(/* webpackChunkName: "agency" */'./AgencyManage/OrganizationChangeList.vue')
const OrganizationDetail = () => import(/* webpackChunkName: "agency" */'./AgencyManage/OrganizationDetail.vue')
const OrganizationList = () => import(/* webpackChunkName: "agency" */'./AgencyManage/OrganizationList.vue')
const OrganizationMigateList = () => import(/* webpackChunkName: "agency" */'./AgencyManage/OrganizationMigateList.vue')
const RegionEdit = () => import(/* webpackChunkName: "agency" */'./AgencyManage/RegionEdit.vue')
const UnitEdit = () => import(/* webpackChunkName: "agency" */'./AgencyManage/UnitEdit.vue')
const OrganizationNewArea = () => import(/* webpackChunkName: "agency" */'./AgencyManage/OrganizationNewArea.vue')

// 人员管理
const AgentDetail = () => import(/* webpackChunkName: "personnel" */'./PersonnelManage/AgentDetail.vue')
const AgentEdit = () => import(/* webpackChunkName: "personnel" */'./PersonnelManage/AgentEdit.vue')
const AgentList = () => import(/* webpackChunkName: "personnel" */'./PersonnelManage/AgentList.vue')
const EntryApproval = () => import(/* webpackChunkName: "personnel" */'./PersonnelManage/EntryApproval.vue')
const LevelManage = () => import(/* webpackChunkName: "personnel" */'./PersonnelManage/LevelManage.vue')
const MigateApproval = () => import(/* webpackChunkName: "personnel" */'./PersonnelManage/MigateApproval.vue')
const ResignApproval = () => import(/* webpackChunkName: "personnel" */'./PersonnelManage/ResignApproval.vue')

// const CompanyList = () => import(/* webpackChunkName: "ins_company" */ './InsuranceCompany/CompanyList.vue')

// 系统设置页面
const CommissionList = () => import('./Commission/CommissionList.vue')
const AssessmentList = () => import('./AssessmentManage/AssessmentList.vue')
const AssessmentListResult = () => import('./AssessmentManage/AssessmentListResult.vue')
const AssessmentListWarning = () => import('./AssessmentManage/AssessmentListWarning.vue')
const StatisticalReportList = () => import('./StatisticalReport/StatisticalReportList.vue')
const StatisticalOrganizationResult = () => import('./StatisticalReport/StatisticalOrganizationResult.vue')
const StatisticalPersionResult = () => import('./StatisticalReport/StatisticalPersionResult.vue')
const RolePage = () => import('./RoleManage/RolePage.vue')
const UserPage = () => import('./RoleManage/UserPage.vue')
const PermissionPage = () => import('./RoleManage/PermissionPage.vue')
const PasswordChange = () => import('./PasswordManage/PasswordChange.vue')

export default {
  Welcome,
  PageLogin,
  PageDefault,

  // 保单管理
  InsurancePolicyList,
  InsurancePolicyEdit,
  InsurancePolicyDetail,
  InsuranceSlipList,
  InsuranceSlipEdit,
  InsuranceSlipDetail,
  InsuranceRenewalList,
  InsuranceRenewalEdit,
  InsuranceRedistrList,

  // 保险公司管理
  CompanyList,
  CompanyEdit,
  ProductList,
  ProductEdit,
  ProductRateList,
  ProductRateEdit,
  ProductCoefficientEdit,
  ProductCoefficientList,

  // 机构管理
  AgencyLevel,
  AgencyEdit,
  AgencyList,
  OrganizationMigateApproval,
  OrganizationChangeList,
  OrganizationMigateReview,
  OrganizationDetail,
  OrganizationList,
  OrganizationMigateList,
  RegionEdit,
  UnitEdit,
  OrganizationNewArea,

  // 人员管理
  AgentDetail,
  AgentEdit,
  AgentList,
  EntryApproval,
  LevelManage,
  MigateApproval,
  ResignApproval,

  CommissionList,
  AssessmentList,
  AssessmentListResult,
  AssessmentListWarning,
  StatisticalReportList,
  StatisticalOrganizationResult,
  StatisticalPersionResult,
  RolePage,
  UserPage,
  PermissionPage,
  PasswordChange
}
