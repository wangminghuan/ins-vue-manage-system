<template>
  <div>
    <section class="header-title" v-if="actionType === '0'">
      {{$route.name}}

      <span class="fr"  v-if="!editType">
        <el-upload class="import-btn" action="upload" :http-request="upload" :show-file-list="false" :accept="'.xls, .xlsx'">
          <span v-has="'TB_IMPORT'">
            <el-button type="primary" size="small">批量导入</el-button>
          </span>
        </el-upload>
      </span>

      <span class="fr"  v-if="!editType">
        <a v-has="'TB_EXPORT'" class="el-button el-button--primary el-button--small download-btn"  :href="`${baseUrl}template/投保单导入模板.xlsx`" download="保单导入模板.xlsx" type="primary" size="small">导入模板下载</a>
      </span>
    </section>

    <section class="header-title" v-if="actionType === '1'">
      {{$route.name}}

      <span class="fr" v-if="!editType">
        <el-upload class="import-btn" action="upload" :http-request="upload" :show-file-list="false" :accept="'.xls, .xlsx'">
          <span v-has="'BD_IMPORT'">
            <el-button type="primary" size="small">批量导入</el-button>
          </span>
        </el-upload>
      </span>

      <span class="fr"  v-if="!editType">
        <a v-has="'BD_EXPORT'" class="el-button el-button--primary el-button--small download-btn"  :href="`${baseUrl}template/保单导入模板.xlsx`" download="保单导入模板.xlsx" type="primary" size="small">导入模板下载</a>
      </span>
    </section>

    <el-form ref="formData" :model="formData" :rules="Rule.INS_EDIT"  label-width="120px">
      <!-- 基本信息 -->
      <div class='entry-boder'>
      <base-collapse-card title="基本信息" class="form-item">
        <el-row class="pr20">
          <el-col :span="8">
            <el-form-item label="保险公司" prop="c_id">
              <select-company  v-model="formData.c_id" :disabled="insDisable" :editType="id === '0' ? 'add' : 'edit'" @change="queryInsByCode" ></select-company>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="actionType === '0'">
            <el-form-item label="投保单号" prop="tb_code">
              <el-input v-model="formData.tb_code" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="actionType === '1'">
            <el-form-item label="保单号" prop="bd_code">
              <el-input v-model="formData.bd_code" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </base-collapse-card>
      </div>

      <!-- 代理人信息 -->
      <div class='entry-boder'>
      <base-collapse-card class="form-item" title="代理人信息">
        <el-row class="pr20">
          <el-col :span="8">
            <el-form-item label="代理人工号" prop="ag_job_number">
              <el-select
                v-model="formData.ag_job_number"
                filterable
                remote
                @change="agentChange"
                :remote-method="getAgentByCode">
                <el-option
                  v-for="item in agentSelects"
                  :key="item.ag_id"
                  :label="item.ag_job_number"
                  :value="item.ag_job_number">
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.ag_job_number }}</span>
                    <span style="float: left">{{ item.ag_name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理人名称" prop="ag_name">
              <el-input v-model="formData.ag_name" disabled ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售机构代码" prop="o_id">
              <el-input v-model="formData.o_code" disabled ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售机构名称" prop="o_name">
              <el-input v-model="formData.o_name" disabled ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="actionType === '0'">
            <el-form-item label="投保日期" prop="tb_date">
              <el-date-picker
                v-model="formData.tb_date"
                value-format="yyyy-MM-dd"
                type="date"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="actionType === '1'">
            <el-form-item label="生效时间" prop="bd_time">
              <el-date-picker
                :disabled="insDisable"
                v-model="formData.bd_time"
                value-format="yyyy-MM-dd"
                type="date"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </base-collapse-card>
      </div>

      <!-- 投保人信息 -->
      <div class='entry-boder'>
      <base-collapse-card class="form-item" title="投保人资料">
        <el-row :gutter="10" class="pr20">
          <el-col :span="8">
            <el-form-item label="姓名" prop="tb_name">
              <el-input v-model="formData.tb_name" @blur="setPayName" :maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="tb_id_type">
              <el-select v-model="formData.tb_id_type" @change="idTypeChange(formData.tb_id_type, Rule.INS_EDIT.tb_id_number, formData.tb_id_number, 'tb_id_number')" class="w100" >
                <el-option v-for="item in Dict.CARD_TYPE" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码" prop="tb_id_number">
              <el-input v-model="formData.tb_id_number" @blur="setUserInfo(formData, 'tb_id_number', 'tb_birthday', 'tb_sex')" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件有效期" prop="tb_id_longtime">
              <select-date-picker v-model="formData.tb_id_date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :disabled="!!formData.tb_id_longtime">
                <el-select v-model="formData.tb_id_longtime"  slot="select" @change="changeTBIdLongTime" class="w100px">
                  <el-option v-for="item in Dict.CARD_LONGTIME" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </select-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="tb_sex">
              <el-select v-model="formData.tb_sex" class="w100" >
                <el-option v-for="item in Dict.GENDER" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期" prop="tb_birthday">
              <el-date-picker
                v-model="formData.tb_birthday"
                value-format="yyyy-MM-dd"
                type="date"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作单位" prop="tb_company">
              <el-input v-model="formData.tb_company"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职业/工种" prop="tb_job">
              <el-input v-model="formData.tb_job" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号" prop="tb_phone">
              <el-input v-model="formData.tb_phone" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮编" prop="tb_postcode">
              <el-input type="tel" v-model="formData.tb_postcode" max="999999" :maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱" prop="tb_email">
              <el-input v-model="formData.tb_email" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="详细地址" prop="tb_addr">
              <el-input v-model="formData.tb_addr" :maxlength="60"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </base-collapse-card>
      </div>

      <!-- 被保险人信息 -->
      <div class='entry-boder'>
      <base-collapse-card class="form-item" title="被保人资料">
        <el-row class="pr20">
          <el-col :span="8">
            <el-form-item label="与投保人关系" prop="bb_tb_relation">
              <el-select :disabled="editType" v-model="formData.bb_tb_relation" class="w100" @change="relationChange" >
                <el-option v-for="item in Dict.PERSON_RELATION" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" prop="ir_name">
              <el-input :disabled="editType" v-model="formData.ir_name" :maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="ir_id_type">
              <el-select :disabled="editType" v-model="formData.ir_id_type" @change="idTypeChange(formData.ir_id_type, Rule.INS_EDIT.ir_id_number, formData.ir_id_number, 'ir_id_number')" class="w100" >
                <el-option v-for="item in Dict.CARD_TYPE" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码" prop="ir_id_number">
              <el-input :disabled="editType" v-model="formData.ir_id_number" @blur="setUserInfo(formData,'ir_id_number', 'ir_birthday', 'ir_sex')" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件有效期" prop="ir_id_longtime">
              <select-date-picker v-model="formData.ir_id_date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"  :disabled="editType || !!formData.ir_id_longtime">
                <el-select :disabled="editType" v-model="formData.ir_id_longtime"  slot="select" @change="changeBBIdLongTime" class="w100px">
                  <el-option v-for="item in Dict.CARD_LONGTIME" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </select-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="ir_sex">
              <el-select :disabled="editType" v-model="formData.ir_sex" class="w100" >
                <el-option v-for="item in Dict.GENDER" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期" prop="ir_birthday">
              <el-date-picker
                :disabled="editType"
                v-model="formData.ir_birthday"
                value-format="yyyy-MM-dd"
                type="date"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作单位" prop="ir_company">
              <el-input v-model="formData.ir_company" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职业/工种" prop="ir_job">
              <el-input v-model="formData.ir_job" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号" prop="ir_phone">
              <el-input v-model="formData.ir_phone" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮编" prop="ir_postcode">
              <el-input v-model="formData.ir_postcode" :maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱" prop="ir_email">
              <el-input v-model="formData.ir_email" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="详细地址" prop="ir_addr">
              <el-input v-model="formData.ir_addr" :maxlength="60"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </base-collapse-card>
      </div>

      <!-- 受益人 -->
      <div class='entry-boder'>
      <base-collapse-card class="form-item" title="受益人">
        <div slot="btn">
          <el-button type="primary" size="small" icon="el-icon-plus" @click.stop="addFavoree">新增受益人</el-button>
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="" prop="f_type">
              <el-radio-group v-model="formData.f_type" @change="fTypeChange">
                <el-radio :label="0">法定受益人</el-radio>
                <el-radio :label="1">指定受益人</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="formData.f_type === 1">
          <el-row class="pr20" v-for="(item, index) in formData.favoree" :key="index">
            <el-col :span="24" class="mb15">
              <span class="title"> 第 {{index + 1}} 受益人</span>
              <el-button class="fr" type="text" v-if="index > 0" icon="el-icon-delete" @click="removeFavoree(index)" ></el-button>
            </el-col>
            <el-col :span="24">
              <el-form-item label="受益比例" :prop="'favoree.'+index+'.f_percent'" :rules="Rule.INS_EDIT.f_percent">
                <el-input v-model="item.f_percent" :maxlength="3">
                  <i slot="suffix" class="el-input__icon select-input-suffix">%</i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名" :prop="'favoree.'+index+'.f_name'" :rules="Rule.INS_EDIT.f_percent">
                <el-input v-model="item.f_name" :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件类型" :prop="'favoree.'+index+'.f_id_type'" :rules="Rule.INS_EDIT.f_id_type">
                <el-select v-model="item.f_id_type" @change="idTypeChange(item.f_id_type, item.rule_id_number, item.f_id_number , `favoree.${index}.f_id_number`)" class="w100" >
                  <el-option v-for="dict in Dict.CARD_TYPE" :key="dict.value" :value="dict.value" :label="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码" :prop="'favoree.'+index+'.f_id_number'" :rules="item.rule_id_number">
                <el-input v-model="item.f_id_number" @blur="setUserInfo(item, 'f_id_number', 'f_birthday', 'f_sex')" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别" :prop="'favoree.'+index+'.f_sex'" :rules="Rule.INS_EDIT.f_sex">
                <el-select v-model="item.f_sex" class="w100" >
                  <el-option v-for="dict in Dict.GENDER" :key="dict.value" :value="dict.value" :label="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生日期" :prop="'favoree.'+index+'.f_birthday'" :rules="Rule.INS_EDIT.f_birthday">
                <el-date-picker
                  v-model="item.f_birthday"
                  value-format="yyyy-MM-dd"
                  type="date"
                  >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号" :prop="'favoree.'+index+'.f_phone'" :rules="Rule.INS_EDIT.f_phone">
                <el-input v-model="item.f_phone" :maxlength="11"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </base-collapse-card>
      </div>

      <!-- 险种资料 -->
      <div class='entry-boder'>
      <base-collapse-card class="form-item" title="险种资料">
        <div slot="btn">
          <el-button  v-if="!insDisable" type="primary" size="small" icon="el-icon-plus" @click.stop="addInsType(1)">添加主险</el-button>
          <el-button  type="primary" size="small" icon="el-icon-plus" @click.stop="addInsType(2)">添加附加险</el-button>
        </div>
        <div class="pr20" v-for="(item, index) in formData.master" :key="`master_${index}`">
          <el-row>
            <el-col :span="24">
              <span class="title"> 主险 {{index + 1}}</span>
              <el-button v-if=" index > 0 && !insDisable" class="fr" type="text"  icon="el-icon-delete" @click="removeInsType(formData.master, index)" ></el-button>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="险种代码" :prop="'master.'+index+'.p_code'" :rules="Rule.INS_EDIT.p_code">
                <el-select :disabled="insDisable" v-model="item.p_code" filterable  @change="insChange(item, 1)">
                  <el-option v-for="dict in masterSelects" :key="dict.p_id" :label="dict.p_code" :value="dict.p_code">
                      <span style="float: left">{{ dict.p_name }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ dict.p_code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="险种名称" :prop="'master.'+index+'.p_name'" >
                <el-input v-model="item.p_name" disabled=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="保险期间" :prop="'master.'+index+'.sp_bao_type'" :rules="Rule.INS_EDIT.sp_bao_type">
                <el-input v-model="item.sp_bao_time" :disabled="insDisable ||item.sp_bao_type === 0">
                  <el-select :disabled="insDisable" v-model="item.sp_bao_type" slot="prepend" class="w100px" @change="changeBaoType(item)">
                    <el-option v-for="dict in Dict.PRODUCT_BAO_TYPE" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                  </el-select>
                  <i slot="suffix" v-if="item.sp_bao_type === 1" class="el-input__icon select-input-suffix">岁</i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="缴费期间" :prop="'master.'+index+'.sp_pay_type'" :rules="Rule.INS_EDIT.sp_pay_type">
                <el-input v-model="item.sp_pay_time" :disabled="insDisable">
                  <el-select :disabled="insDisable" v-model="item.sp_pay_type" slot="prepend" class="w100px">
                    <el-option v-for="dict in Dict.PRODUCT_PAY_TYPE" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                  </el-select>
                  <i slot="suffix" v-if="item.sp_pay_type === 1" class="el-input__icon select-input-suffix">岁</i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="缴费方式" :prop="'master.'+index+'.sp_pay_way'" :rules="Rule.INS_EDIT.sp_pay_way">
                <el-select :disabled="insDisable" v-model="item.sp_pay_way" class="w100">
                  <el-option v-for="dict in Dict.PRODUCT_PAY_WAY" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="基本保险金额" :prop="'master.'+index+'.sp_money'" :rules="Rule.INS_EDIT.sp_money">
                <el-input :disabled="insDisable" v-model="item.sp_money" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保费" :prop="'master.'+index+'.sp_premium'" :rules="Rule.INS_EDIT.sp_premium">
                <el-input :disabled="insDisable" v-model="item.sp_premium" @change="getPayFirst"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="split-line" v-if="formData.second.length > 0"></div>
        <div class="pr20" v-for="(item, index) in formData.second" :key="`second_${index}`">
          <el-row>
            <el-col :span="24">
              <span class="title"> 附加险 {{index + 1}}</span>
              <el-button v-if="item.isDelete" class="fr" type="text" icon="el-icon-delete" @click="removeInsType(formData.second, index)" ></el-button>
            </el-col>
            <el-col :span="8">
              <el-form-item label="险种代码" :prop="'second.'+index+'.p_code'" :rules="Rule.INS_EDIT.p_code">
                <el-select  v-model="item.p_code" filterable @change="insChange(item, 2)" :disabled="insDisable && !item.isDelete">
                  <el-option v-for="dict in secondSelects" :key="dict.p_id" :label="dict.p_code" :value="dict.p_code">
                      <span style="float: left">{{ dict.p_name }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ dict.p_code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="险种名称" :prop="'master.'+index+'.p_name'" >
                <el-input v-model="item.p_name" disabled=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="保险期间" :prop="'second.'+index+'.sp_bao_type'" :rules="Rule.INS_EDIT.sp_bao_type">
                <el-input v-model="item.sp_bao_time" :disabled="(insDisable && !item.isDelete) || item.sp_bao_type === 0">
                  <el-select  v-model="item.sp_bao_type" slot="prepend" class="w100px" @change="changeBaoType(item)" :disabled="insDisable && !item.isDelete">
                    <el-option v-for="dict in Dict.PRODUCT_BAO_TYPE" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                  </el-select>
                  <i slot="suffix" v-if="item.sp_bao_type === 1" class="el-input__icon select-input-suffix">岁</i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="缴费期间" :prop="'second.'+index+'.sp_pay_type'" :rules="Rule.INS_EDIT.sp_pay_type">
                <el-input  v-model="item.sp_pay_time" :disabled="insDisable && !item.isDelete">
                  <el-select  v-model="item.sp_pay_type" slot="prepend" class="w100px" :disabled="insDisable && !item.isDelete">
                    <el-option v-for="dict in Dict.PRODUCT_PAY_TYPE" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                  </el-select>
                  <i slot="suffix" v-if="item.sp_pay_type === 1" class="el-input__icon select-input-suffix">岁</i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="缴费方式" :prop="'second.'+index+'.sp_pay_way'" :rules="Rule.INS_EDIT.sp_pay_way">
                <el-select  v-model="item.sp_pay_way" class="w100" :disabled="insDisable && !item.isDelete">
                  <el-option v-for="dict in Dict.PRODUCT_PAY_WAY" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="基本保险金额" :prop="'second.'+index+'.sp_money'" :rules="Rule.INS_EDIT.sp_money">
                <el-input  v-model="item.sp_money" :disabled="insDisable && !item.isDelete"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保费" :prop="'second.'+index+'.sp_premium'" :rules="Rule.INS_EDIT.sp_premium">
                <el-input v-model="item.sp_premium"  @change="getPayFirst" :disabled="insDisable && !item.isDelete"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否自动续费" :prop="'second.'+index+'.sp_auto'" :rules="Rule.INS_EDIT.sp_auto">
                <el-select  class="w100" v-model="item.sp_auto" :disabled="insDisable && !item.isDelete">
                  <el-option v-for="dict in Dict.PRODUCT_AUTO" :key="dict.value" :value="dict.value" :label="dict.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </base-collapse-card>
      </div>
      <!-- 付款信息 -->
      <div class='entry-boder'>
      <base-collapse-card class="form-item" title="付款信息">
        <el-row class="pr20">
          <el-col :span="8">
            <el-form-item label="首次保费合计" prop="pay_first">
              <el-input v-model="formData.pay_first" disabled="" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户户主" prop="pay_name">
              <el-input v-model="formData.pay_name" :maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户银行" prop="pay_bank">
              <select-bank v-model="formData.pay_bank"></select-bank>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行卡号" prop="pay_account">
              <el-input v-model="formData.pay_account" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="逾期未付" prop="overdue_status">
              <el-select v-model="formData.overdue_status" class="w100" >
                <el-option v-for="item in Dict.OVERDUE_STATUS" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </base-collapse-card>
      </div>
      <div class="tc common-btn" v-if="actionType === '0'">
        <el-button type="success" v-if="id === '0'" v-has="'TB_MANAGE_ADD'" @click="save">保存</el-button>
        <el-button type="success" v-else v-has="'TB_MANAGE_UPDATE'" @click="save">保存</el-button>
      </div>

      <div class="tc common-btn" v-if="actionType === '1'">
        <el-button type="success" v-if="id === '0'" v-has="'BD_MANAGE_ADD'" @click="save">保存</el-button>
        <el-button type="success" v-else v-has="'BD_MANAGE_UPDATE'" @click="save">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import BaseCollapseCard from '@/components/base/BaseCollapseCard.vue'
import SelectCompany from '@/components/select/SelectCompany.vue'
import SelectBank from '@/components/select/SelectBank.vue'
import Validator from '@/config/validator'
import { Message } from 'element-ui'
import Common from '@/tools/common'
import SelectDatePicker from '@/components/other/SelectDatePicker'
import edit from '@/mixin/edit'
import moment from 'moment'

export default {
  mixins: [edit],
  components: {
    BaseCollapseCard,
    SelectCompany,
    SelectBank,
    SelectDatePicker
  },
  data () {
    return {
      baseUrl: '',
      editType: 'add',
      loading: false,
      masterSelects: [],
      secondSelects: [],
      agentSelects: [],
      formData: {
        c_id: '',
        tb_code: '',
        bd_code: '',
        // 代理人
        ag_id: '',
        ag_code: '',
        ag_name: '',
        o_id: '',
        o_name: '',
        o_code: '',
        tb_date: moment().format('YYYY-MM-DD'),
        bd_time: moment().format('YYYY-MM-DD'),
        // 投保人
        tb_name: '',
        tb_id_type: '',
        tb_id_number: '',
        tb_id_longtime: 0,
        tb_id_date: '',
        tb_sex: '',
        tb_birthday: '',
        tb_company: '',
        tb_job: '',
        tb_phone: '',
        tb_email: '',
        tb_addr: '',
        tb_postcode: '',
        // 被投保人
        bb_tb_relation: '',
        ir_name: '',
        ir_id_type: null,
        ir_id_number: '',
        ir_id_longtime: 0,
        ir_id_date: '',
        ir_birthday: '',
        ir_company: '',
        ir_phone: '',
        ir_email: '',
        ir_addr: '',
        ir_postcode: '',
        ir_sex: null,
        ir_job: '',
        // 受益人
        f_type: 0,
        favoree: [],
        // 险种信息
        master: [
          {
            sp_property: 1,
            sp_bao_type: null,
            sp_bao_time: '',
            sp_pay_type: null,
            sp_pay_time: '',
            sp_pay_way: '',
            sp_money: '',
            sp_premium: ''
          }
        ],
        second: [],
        // 付款信息
        pay_first: '',
        pay_name: '',
        pay_account: '',
        pay_bank: '',
        overdue_status: ''
      },
      id: null,
      actionType: null
    }
  },

  created () {
    this.init()
  },

  methods: {
    init () {
      this.baseUrl = window.resourceBaseUrl
      this.id = this.$route.params.id || '0'
      this.actionType = this.$route.params.actionType || '0'
      this.actionType += ''
      this.insDisable = this.id !== '0' && this.actionType === '1'
      this.editType = this.id !== '0' // true 是修改 ,false 是新增
      if (this.id !== '0') {
        this.getDetail()
      }
    },

    // 如果证件类型选择是身份证,则添加校验,否则删除校验
    idTypeChange (value, rule, validate, key) {
      if (Array.isArray(rule)) {
        if (value === 11) {
          rule[1] = {
            validator: Validator.idCard,
            message: '身份证格式不正确',
            trigger: 'blur'
          }
        } else {
          rule.splice(1, 1)
        }
      }

      if (validate) {
        this.$refs.formData.validateField(key)
      }
    },

    // 根据身份证类型自动设置性别和出生日期
    setUserInfo (data, idCardKey, birthdayKey, sexKey) {
      let idCardNum = data[idCardKey]
      let info = Common.getPersonByIdCardNum(idCardNum)
      if (info) {
        data[sexKey] = info.sex
        data[birthdayKey] = info.birthday
      } else {
        data[sexKey] = null
        data[birthdayKey] = ''
      }
    },

    relationChange (value) {
      if (value === 0) {
        this.formData.ir_name = this.formData.tb_name
        this.formData.ir_id_type = this.formData.tb_id_type
        this.formData.ir_id_number = this.formData.tb_id_number
        this.formData.ir_id_longtime = this.formData.tb_id_longtime
        this.formData.ir_id_date = this.formData.tb_id_date
        this.formData.ir_birthday = this.formData.tb_birthday
        this.formData.ir_company = this.formData.tb_company
        this.formData.ir_phone = this.formData.tb_phone
        this.formData.ir_email = this.formData.tb_email
        this.formData.ir_addr = this.formData.tb_addr
        this.formData.ir_postcode = this.formData.tb_postcode
        this.formData.ir_sex = this.formData.tb_sex
        this.formData.ir_job = this.formData.tb_job

        this.$refs.formData.validateField('ir_name')
        this.$refs.formData.validateField('ir_id_type')
        this.$refs.formData.validateField('ir_id_number')
        this.$refs.formData.validateField('ir_sex')
        this.$refs.formData.validateField('ir_birthday')
        this.$refs.formData.validateField('ir_id_longtime')
        this.$refs.formData.validateField('ir_phone')
        this.$refs.formData.validateField('ir_email')
        this.$refs.formData.validateField('ir_addr')
      } else {
        this.formData.ir_name = ''
        this.formData.ir_id_type = ''
        this.formData.ir_id_number = ''
        this.formData.ir_id_longtime = 0
        this.formData.ir_id_date = ''
        this.formData.ir_birthday = ''
        this.formData.ir_company = ''
        this.formData.ir_phone = ''
        this.formData.ir_email = ''
        this.formData.ir_addr = ''
        this.formData.ir_postcode = ''
        this.formData.ir_sex = ''
        this.formData.ir_job = ''
        let vm = this
        setTimeout(() => {
          vm.$refs.formData.clearValidate(['ir_name', 'ir_id_type', 'ir_id_number', 'ir_sex', 'ir_birthday', 'ir_id_longtime', 'ir_phone', 'ir_email', 'ir_addr'])
        })
      }
    },

    async getAgentByCode (queryString, cb) {
      let user = JSON.parse(Cookie.get('user'))
      let ret = await this.$axios.send('AGENT_MENAGE_LIST', {ag_job_number: queryString, o_id: user.o_id, ag_status: 1})
      if (ret && ret.status_code === 0) {
        this.agentSelects = ret.result
      }
    },

    agentChange (value) {
      if (value) {
        this.agentSelects.map(item => {
          if (item.ag_job_number === value) {
            this.formData.ag_name = item.ag_name
            this.formData.o_id = item.o_id
            this.formData.o_name = item.o_name
            this.formData.o_code = item.o_code
            this.formData.ag_id = item.ag_id
          }
        })
      }
    },

    async queryInsByCode () {
      if (!this.formData.c_id) {
        this.$message.error('请选择保险公司')
        return
      }

      let params = {
        search_cid: this.formData.c_id,
        search_status: 1
      }

      if (this.id !== '0') {
        delete params.search_status
      }

      let ret = await this.$axios.send('SELECT_PRODUCT_LIST', params)

      if (ret && ret.status_code === 0) {
        let list = ret.result
        let vm = this
        this.masterSelects = []
        this.secondSelects = []
        if (Array.isArray(list)) {
          list.map(item => {
            if (item.p_property === 1) vm.masterSelects.push(item)
            if (item.p_property === 2) vm.secondSelects.push(item)
          })
        }
      }
    },

    async save () {
      let vm = this
      this.$refs.formData.validate(async (valid) => {
        if (valid) {
          let data = vm.buildData()
          if (!data) return
          if (vm.id === '0') {
            let ret = await vm.$axios.send('TB_MANAGE_ADD', data)
            if (ret && ret.status_code === 0) {
              Message.success('添加成功')
              this.reset()
            }
          } else {
            let ret = await vm.$axios.send('TB_MANAGE_UPDATE', data, {s_id: vm.id})
            if (ret && ret.status_code === 0) {
              Message.success('修改成功')
              this.$router.go(-1)
            }
          }
        }
      })
    },

    buildData () {
      if (this.validateFavoree()) {
        this.setPayName()
        let payFirst = 0
        let formData = Common.clone(this.formData)
        formData.action_type = this.actionType
        formData.products = this.formData.master.concat(this.formData.second)
        for (let i = 0; i < formData.products.length; i++) {
          payFirst += parseFloat(formData.products[i].sp_premium)
        }
        formData.pay_first = payFirst.toFixed(2)
        delete formData.master
        delete formData.second
        if (this.actionType === '0') {
          delete formData.bd_code
          delete formData.bd_time
        } else {
          delete formData.tb_code
          delete formData.tb_date
        }
        return formData
      }
    },

    getPayFirst () {
      let count = 0
      let products = []
      products = products.concat(Common.clone(this.formData.master))
      products = products.concat(Common.clone(this.formData.second))
      let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
      for (let i = 0; i < products.length; i++) {
        if (reg.test(products[i].sp_premium)) {
          count += parseFloat(products[i].sp_premium)
        }
      }

      count = Number.isNaN(count) ? 0 : count
      this.formData.pay_first = count.toFixed(2)
    },

    validateFavoree () {
      let flag = true
      if (this.formData.f_type === 1) {
        let count = 0
        for (let i = 0; i < this.formData.favoree.length; i++) {
          count += parseFloat(this.formData.favoree[i].f_percent)
        }
        if (count !== 100) {
          Message.error('受益人比例必须是 100%')
          flag = false
        }
      }

      return flag
    },

    addFavoree () {
      if (this.formData.f_type === 0) {
        Message.warning('只有指定受益人时才可以新增')
        return
      }
      if (!this.formData.favoree) this.formData.favoree = []
      this.formData.favoree.push({
        f_sort: this.formData.favoree.length + 1,
        f_percent: '',
        f_name: '',
        f_id_type: null,
        f_id_number: '',
        f_birthday: '',
        f_sex: null,
        f_phone: '',
        rule_id_number: Common.clone(this.Rule.INS_EDIT.f_id_number)
      })
    },

    removeFavoree (index) {
      if (index === 0) return
      this.formData.favoree.splice(index, 1)

      for (let i = 0; i < this.formData.favoree.length; i++) {
        this.formData.favoree.f_sort = i + 1
      }
    },

    removeInsType (arr, index) {
      if (arr.length > 0) {
        arr.splice(index, 1)
      }

      this.getPayFirst()
    },

    async getDetail () {
      let ret = await this.$axios.send('TB_MANAGE_DETAIL', '', {s_id: this.id})
      if (ret && ret.status_code === 0) {
        ret.result.master = []
        ret.result.second = []

        // 初始化险种
        for (let i = 0; i < ret.result.products.length; i++) {
          if (ret.result.products[i].sp_property === 1) {
            ret.result.master.push(ret.result.products[i])
          } else {
            ret.result.second.push(ret.result.products[i])
          }
        }

        // 初始化被保人
        ret.result.ir_addr = ret.result.recognizee.ir_addr
        ret.result.ir_birthday = ret.result.recognizee.ir_birthday
        ret.result.ir_company = ret.result.recognizee.ir_company
        ret.result.ir_email = ret.result.recognizee.ir_email
        ret.result.ir_id = ret.result.recognizee.ir_id
        ret.result.ir_id_date = ret.result.recognizee.ir_id_date
        ret.result.ir_id_longtime = ret.result.recognizee.ir_id_longtime
        ret.result.ir_id_number = ret.result.recognizee.ir_id_number
        ret.result.ir_id_type = ret.result.recognizee.ir_id_type
        ret.result.ir_job = ret.result.recognizee.ir_job
        ret.result.ir_name = ret.result.recognizee.ir_name
        ret.result.ir_phone = ret.result.recognizee.ir_phone
        ret.result.ir_postcode = ret.result.recognizee.ir_postcode
        ret.result.ir_sex = ret.result.recognizee.ir_sex
        ret.result.favoree = ret.result.favoree || []
        this.formData = ret.result
        this.queryInsByCode()
        this.$refs['formData'].resetFields()
      }
    },

    reset () {
      let formData = Common.clear(this.formData)
      delete formData.products
      formData.master = formData.master.splice(0, 1)
      formData.master[0].sp_property = 1
      formData.tb_id_longtime = 0
      formData.ir_id_longtime = 0
      formData.second = []
      this.formData = formData
      let vm = this
      setTimeout(() => {
        vm.$refs.formData.resetFields()
      })
    },

    changeTBIdLongTime (value) {
      // value === 1 代表是长期
      if (value === 1) {
        this.formData.tb_id_date = ''
        this.Rule.INS_EDIT.tb_id_date = []
      } else {
        this.Rule.INS_EDIT.tb_id_date = [{ required: true, message: '证件有效期还未选择', trigger: 'blur' }]
      }
    },

    changeBBIdLongTime (value) {
      if (value === 1) {
        this.formData.ir_id_date = ''
        this.Rule.INS_EDIT.ir_id_date = []
      } else {
        this.Rule.INS_EDIT.ir_id_date = [{ required: true, message: '证件有效期还未选择', trigger: 'blur' }]
      }
    },

    insChange (item, type) {
      if (!this.formData.c_id) {
        this.$message.error('请先选择保险公司')
        return
      }

      let list = type === 1 ? this.masterSelects : this.secondSelects
      list.map(tmp => {
        if (tmp.p_code === item.p_code) {
          item.p_name = tmp.p_name
          item.p_id = tmp.p_id
        }
      })
    },

    changeBaoType (item) {
      if (item.sp_bao_type === 0) {
        item.sp_bao_time = ''
      }
    },

    addInsType (type) {
      let item = {
        sp_property: type,
        sp_bao_type: '',
        sp_bao_time: '',
        sp_pay_type: '',
        sp_pay_time: '',
        sp_pay_way: '',
        sp_money: '',
        sp_premium: ''
      }

      if (type === 1) {
        this.formData.master.push(item)
      } else {
        item.sp_auto = 1
        item.isDelete = true
        this.formData.second.push(item)
      }
    },

    // 受益人类型切换
    fTypeChange () {
      if (this.formData.f_type === 0) {
        this.formData.favoree = []
      } else {
        this.addFavoree()
      }
    },

    setPayName () {
      this.formData.pay_name = this.formData.tb_name
    },

    async upload (params) {
      this.loading = true
      let fileObject = params.file
      let action = '/importPolicy'
      let form = new FormData()
      form.append('file', fileObject)
      form.append('action_type', this.actionType)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'},
        responseType: 'blob'
      }
      let ret = await this.$axios.post(action, form, config)
      if (ret && ret.status_code === 0) {
        this.loading = false
        this.$message.success('导入成功')
      } else {
        Common.downloadFile(ret, '错误数据.xlsx')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-collapse-item__wrap{
    border-bottom: 0;
  }
  .el-collapse{
    border-top: 0px !important;
    border-bottom: 0px !important;
  }
  .form-item {
    border-bottom: 30px solid #f5f5f5
  }

  .title {
    font-size: 16px;
    font-weight: 900;
    padding-left: 40px;
    margin-top: 20px;
  }

  .el-form-item /deep/ .el-form-item__content {
    line-height: 0
  }

  .import-btn {
    margin-left: 10px;
  }

  .download-btn {
    text-decoration: none;
  }

  .split-line {
    width: 95%;
    height: 0;
    margin: 10px auto;
    border-bottom: 1px dashed #DCDFE6
  }
</style>
