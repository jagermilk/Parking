<template>
    <!-- 车类管理 -->
    <div class="app-container">
        <div >
            <!-- 添加区域 -->
            <!-- <el-button type="success" class="add"  @click="addOpen">新增</el-button> -->
            <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                @click="addOpen"
                v-hasPermi="['basic:basicCarOwner:add']"
                >新增</el-button>
            </el-col>
            </el-row>
        </div>
        <!-- 列表 -->
        <div class="list">
            <el-table
            :data="tableData"
            style="width: 100%"
           >
                <el-table-column
                prop="carTypeName"
                label="车类名称"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="basicTypeName"
                label="基础类型"
                align="center"
                >
               
                </el-table-column>
                <el-table-column
                prop="totalPrakingNum"
                label="总车位"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="remainPrakingNum"
                label="余位"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="overPrakingCharging"
                label="超车位数"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="operate"
                align="center"
                label="操作">
                
                <template slot-scope="scope">
                    <el-button @click="editFun(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteFun(scope.row)" type="text" size="small">删除</el-button>
                </template>

                </el-table-column>
        </el-table>
        </div>
        <!-- 新增表单 -->
        <el-dialog title="添加区域" :visible.sync="dialogFormVisible" width="60%">
            <!-- 表单 -->
            <el-form ref="form" :rules="rules" :model="ruleForm" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12" >
                        <el-form-item label="基础类型" prop="basicType">
                            <el-select v-model="ruleForm.basicType" filterable placeholder="请选择"  @change="changeType" clearable>
                                <el-option
                                v-for="item in typeOption"
                                :key="item.id"
                                :label="item.typeName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="车类名称" prop="carTypeName">
                            <el-input v-model="ruleForm.carTypeName" placeholder="请输入车类名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 车类权限 -->
                <!-- <el-row :gutter="24"  v-if="!storedDisplay">   -->
                <el-row :gutter="24"  >  
                <el-form-item label="车类权限" prop="carTypeAuth">
                    <el-checkbox-group v-model="ruleForm.carTypeAuth">
                        <el-checkbox v-for="dict in dict.type.basic_car_auth_month" :label="dict.value"  :key="dict.value">{{dict.label}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                </el-row>
            
                <!-- 月卡车 -->
                <div v-if="monthlyDisplay">
                <el-row :gutter="24">
                    <el-col :span="12" style="display:flex ;">
                        <el-form-item label="自动续费周期" prop="automaticRenewalCycle"  :style="{flex: '2', }">
                            <el-select
                                v-model="ruleForm.extendField.automaticRenewalCycle"
                                multiple
                                collapse-tags
                                placeholder="请选择" >
                                <el-option
                                v-for="dict in dict.type.basic_renewal_cycle"
                                :key="dict.value"
                                :label="dict.label"
                                :value="dict.value"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单位" prop="unit"  style="flex: 1"  label-width="50px" >
                                <el-select v-model="ruleForm.extendField.unit"  style=" flex:1 ;" placeholder="" clearable>
                                    <el-option
                                        v-for="dict in dict.type.basic_renewal_unit"
                                        :key="dict.value"
                                        :label="dict.label"
                                        :value="dict.value">
                                    </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="单月金额名称" prop="monthlyAmount">
                            <el-input v-model="ruleForm.extendField.monthlyAmount" placeholder="请输入金额"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12" >
                        <el-form-item label="月租过期" prop="overdueRent">
                            <el-select v-model="ruleForm.extendField.overdueRent" clearable>
                                    <el-option
                                        v-for="dict in dict.type.basic_overdue_rent"
                                        :key="dict.value"
                                        :label="dict.label"
                                        :value="dict.value">
                                    </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>   
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12" >
                        <el-form-item label="车位占用" prop="parkingSpaceOccupancy" >                        
                            <template #label>
                                <span>车位占用</span> 
                                <el-tooltip placement="bottom">
                                    <div slot="content">车位占用:指超出车位,例如1个车位,2个车牌,当第一辆进入后，第二辆进入时就是车位占用
                                        <br/>-----------------------
                                        <br/>禁止进入 : 月卡第二辆车禁止入场,如强制入场后,按照指定计费规则计费
                                        <br/>全程临停 : 月卡第二辆车进场后按照临停车规则计费,中间不切换状态
                                        <br/>场内切换 : 月卡第二辆车进场后按照临停车计费,当占用车位的月卡车出场后,月卡车第二辆车转化为月卡车状态
                                        <br/>;如月卡子订单按照指定计费规则计费
                                        <br/>次序收费 : 车辆按照入场顺序次序计费，其他车辆进出场收费次序不变动，需在计费规则中设置收费次序!
                                        <br/>先出先收费: 仅支持两车一位，车主的两辆月卡车都入场，先出场的车辆缴费两辆车都在场时的车位超出费用
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-select v-model="ruleForm.extendField.parkingSpaceOccupancy"  placeholder="">
                                    <el-option
                                        v-for="dict in dict.type.basic_parking_space"
                                        :key="dict.value"
                                        :label="dict.label"
                                        :value="dict.value">
                                    </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>  
                    <el-col :span="12" >
                        <el-form-item label="占用指定计费" prop="occupancyAssignmentCharge">
                            <el-select
                                v-model="ruleForm.extendField.occupancyAssignmentCharge"
                                filterable
                                clearable
                                placeholder="请选择" >
                                <el-option
                                v-for="dict in dict.type.basic_parking_space"
                                :key="dict.value"
                                :label="dict.label"
                                :value="dict.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12" >
                        <el-form-item label="过期" prop="expiredFreeEnter" >                        
                            <el-input style="width: 50px;"  v-model="ruleForm.extendField.expiredFreeEnter"></el-input>
                            <span style="font-weight: 700;">天内免费进出</span>
                        </el-form-item>
                    </el-col>  
                    <el-col :span="12" >
                        <el-form-item label="自定义编号" prop="customCode">
                            <el-input   v-model="ruleForm.extendField.customCode" placeholder="请输入自定义编号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12" >
                        <el-form-item label="语音提示" prop="voicePrompt" >                        
                            <span style="font-weight: 700;">月卡已经过期X天+</span>
                            <el-input style="width: 70%;"  v-model="ruleForm.extendField.voicePrompt" placeholder="自定义"></el-input>
                            <span style="color: #c8c7c7;">注:仅万能语音卡可以播放自定义语言</span>
                        </el-form-item>
                    </el-col>  
                </el-row>
               <el-row :gutter="24">
                    <el-col :span="12" >
                        <el-form-item label="月卡临期提醒" prop="monthlyRentComingTips" >
                            <template #label>
                                <span>月卡临期提醒</span> 
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                        车主绑定微信后,当月卡快过期时,会推送微信通知                           
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-input placeholder="请输入" v-model="ruleForm.extendField.monthlyRentComingTips">
                                <template slot="append">天</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="月卡续费" prop="monthlyCardRenewalFree" >
                            <template #label>
                                <span>月卡续费</span> 
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                       <br> 月卡过期后续费策略
                                       <br>上次结束时间: 月卡过期后续费从之前过期时间开始续费
                                       <br>当天开始: 月卡过期后续费从当天开始
                                       <br>明天开始: 月卡过期后续费从明天开始
                                       <br>----------------------------------------------------------
                                       <br>假如车牌A有效期（2021-10-01 ~ 2021-10-31）车主2021-11-02操作续费
                                       <br>上次结束时间: 有效期为（2021-10-01 ~ 2021-11-30）
                                       <br>当天开始: 有效期为（2021-11-02 ~ 2021-12-01）
                                       <br>明天开始: 有效期为（2021-11-03 ~ 2021-12-02）
                                       <br>注意: 以上设置只针对过期月卡车
                                       <br>注意: 未过期月卡车续费只能从上次结束时间开始续费                        
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-select
                                v-model="ruleForm.extendField.monthlyCardRenewalFree"
                                filterable
                                clearable
                                placeholder="请选择" >
                                <el-option
                                v-for="dict in dict.type.basic_monthly_renewal_free"
                                :key="dict.value"
                                :label="dict.label"
                                :value="dict.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="超时禁止续费" prop="overtimeProhibitRenew" >
                            <template #label>
                                <span>超时禁止续费</span> 
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                        超过几天不允许续费                         
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-input placeholder="请输入" v-model="ruleForm.extendField.overtimeProhibitRenew">
                                <template slot="append">天</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
          
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12" >
                        <el-form-item label="提前续费限制" prop="earlyRenewalRestrictions" >
                            <template #label>
                                <span>提前续费限制</span> 
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                        默认不限制。比如填了20天，则只有距离过期20天内才能续费，不可提前续费                         
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-input placeholder="请输入" v-model="ruleForm.extendField.earlyRenewalRestrictions">
                                <template slot="append">天</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="车主申请月卡" prop="ownerApplication" >
                            <template #label>
                                <span>车主申请月卡</span> 
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                       车主申请月卡
                                       <br>默认禁止
                                       <br>允许需审核: 车主扫码办理后，需要车场审核通过后才生效
                                       <br>允许无需审核: 车主扫码办理后，直接生效                      
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-select
                                v-model="ruleForm.extendField.ownerApplication"
                                filterable
                                clearable
                                placeholder="请选择" >
                                <el-option
                                v-for="dict in dict.type.basic_owner_application"
                                :key="dict.value"
                                :label="dict.label"
                                :value="dict.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12" >
                        <el-form-item label="场内新增/续费" prop="fieldWithinInsert " >
                            <template #label>
                                <span>场内新增/续费</span> 
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                        临停部分收费: 月卡办理时间点前的时间段收费,办理后时间段免费
                                        <br>全部免费: 此次停车全部免费                         
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-select
                                v-model="ruleForm.extendField.fieldWithinInsert"
                                filterable
                                clearable
                                placeholder="请选择" >
                                <el-option
                                v-for="dict in dict.type.basic_field_within_insert"
                                :key="dict.value"
                                :label="dict.label"
                                :value="dict.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="场内删除" prop="fieldWithinDelete" >
                            <template #label>
                                <span>场内删除</span> 
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                       场内删除
                                       <br>月卡部分免费: 月卡删除时间点前的时间段免费,删除后时间段收费
                                       <br>全部收费: 此次停车全部收费                      
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-select
                                v-model="ruleForm.extendField.fieldWithinDelete"
                                filterable
                                clearable
                                placeholder="请选择" >
                                <el-option
                                v-for="dict in dict.type.basic_field_within_delete"
                                :key="dict.value"
                                :label="dict.label"
                                :value="dict.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12" >
                        <el-form-item label="变更后子订单" prop="alterAfterSuborder " >
                            <template #label>
                                <span>变更后子订单</span> 
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                        月卡续费、变更,其历史在场子订单是否免费 1-不免费 2-免费（子区域订单免费 勾选）                      
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-checkbox v-model="ruleForm.extendField.alterAfterSuborder">子区域订单免费</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="车主修改车牌" prop="ownerUpdateCarNumber " >
                            <el-select
                                v-model="ruleForm.extendField.ownerUpdateCarNumber"
                                filterable
                                clearable
                                placeholder="请选择" >
                                <el-option
                                v-for="dict in dict.type.basic_owner_update_car_number"
                                :key="dict.value"
                                :label="dict.label"
                                :value="dict.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12" >
                        <el-form-item label="车主扫码续费" prop="ownerCodeRenew " >
                            <template #label>
                                <span>车主扫码续费</span> 
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                        临停部分收费: 月卡办理时间点前的时间段收费,办理后时间段免费
                                        <br>全部免费: 此次停车全部免费                         
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-select
                                v-model="ruleForm.extendField.ownerCodeRenew"
                                filterable
                                clearable
                                placeholder="请选择" >
                                <el-option
                                v-for="dict in dict.type.basic_owner_code_renew"
                                :key="dict.value"
                                :label="dict.label"
                                :value="dict.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="修改有效时间" prop="updateEffectiveTime" >
                            <template #label>
                                <span>修改有效时间</span> 
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                       场内删除
                                       <br>月卡部分免费: 月卡删除时间点前的时间段免费,删除后时间段收费
                                       <br>全部收费: 此次停车全部收费                      
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-select
                                v-model="ruleForm.extendField.updateEffectiveTime"
                                filterable
                                clearable
                                placeholder="请选择" >
                                <el-option
                                v-for="dict in dict.type.basic_update_effective_time"
                                :key="dict.value"
                                :label="dict.label"
                                :value="dict.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <!-- 储值车 -->
            <div v-if="storedDisplay">
                    <!-- 车类权限 -->
                <!-- <el-row :gutter="24">  
                    <el-form-item label="车类权限" prop="carTypeAuth">
                        <el-checkbox-group v-model="ruleForm.extendField.carTypeAuth">
                            <el-checkbox v-for="dict in dict.type.basic_car_auth_stored" :label="dict.label" :key="dict.value">{{dict.label}}</el-checkbox>
                          
                        </el-checkbox-group>
                    </el-form-item>
                </el-row> -->
                <el-row :gutter="24">
                    <el-col :span="12" >
                        <el-form-item label="车主扫码充值" prop="extendField.ownerCodeRenew " >
                            <el-select
                                v-model="ruleForm.extendField.ownerCodeRenew"
                                filterable
                                clearable
                                placeholder="请选择" >
                                <el-option
                                v-for="dict in dict.type.basic_owner_code_renew"
                                :key="dict.value"
                                :label="dict.label"
                                :value="dict.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="最低续费金额(元)" prop="extendField.minimumRenewalAmount">
                            <el-input v-model="ruleForm.extendField.minimumRenewalAmount" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12" >
                        <el-form-item label="余额低于(元)" prop="extendField.balanceBelow " >
                            <template #label>
                                <span>余额低于(元)</span> 
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                        余额低于*元,按照临停收费                       
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-input v-model="ruleForm.extendField.balanceBelow" placeholder="请输入"></el-input>
                           
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="超时禁止续费" prop="extendField.overtimeProhibitRenew" >
                            <template #label>
                                <span>超时禁止续费</span> 
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                        超过几天不允许续费                         
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-input placeholder="请输入" v-model="ruleForm.extendField.overtimeProhibitRenew">
                                <template slot="append">天</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
            </div>
                <!-- 共有的 -->
                <div>
                    <el-row :gutter="24">
                        <el-col :span="12" >
                            <el-form-item label="上级部门" prop="deptId">
                                    <treeselect v-model="ruleForm.deptId" :show-count="true" :options="deptOptions"  :normalizer="normalizer" class="treeSelect" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                <el-row :gutter="24">
                    <el-col :span="12" >
                        <el-form-item label="入场确认" prop="inConfirm" >
                            <template #label>
                                <span>入场确认</span> 
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                        岗亭确认：岗亭确定后才放行
                                        <br>预付入场：先车牌预付后再入场,此功能开启需与技术支持沟通                         
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-select
                                filterable
                                clearable
                                v-model="ruleForm.inConfirm"
                                placeholder="请选择" >
                                <el-option
                                v-for="dict in dict.type.basic_confirm"
                                :key="dict.value"
                                :label="dict.label "
                                :value="dict.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="出场无订单" prop="outNoOrder" >
                            <el-select
                                v-model="ruleForm.outNoOrder"
                                filterable
                                clearable
                                placeholder="请选择" >
                                <el-option
                                v-for="dict in dict.type.basic_no_order"
                                :key="dict.value"
                                :label="dict.label"
                                :value="dict.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
             
                <el-row :gutter="24">
                    <el-col :span="12" >
                        <el-form-item label="禁止重复入场" prop="inProhibitRepeat" >
                            
                            <el-select
                                v-model="ruleForm.inProhibitRepeat"
                                filterable
                                clearable
                                placeholder="请选择" >
                                <el-option
                                v-for="dict in dict.type.basic_update_effective_time"
                                :key="dict.value"
                                :label="dict.label"
                                :value="dict.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="车位满时" prop="parkingFullTime" >
                            
                            <el-select
                                v-model="ruleForm.parkingFullTime"
                                filterable
                                clearable
                                placeholder="请选择" >
                                <el-option
                                v-for="dict in dict.type.basic_park_full"
                                :key="dict.value"
                                :label="dict.label"
                                :value="dict.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="8" >
                        <el-form-item label="总车位" prop="totalPrakingNum" >
                            <template #label>
                                <span>总车位</span> 
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                        车类自有余位,超出车位后可能收费                       
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-input v-model="ruleForm.totalPrakingNum" placeholder="请输入车位"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" >
                        <el-form-item label="余位" prop="remainPrakingNum" >
                            <el-input v-model="ruleForm.remainPrakingNum" placeholder="" ></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- 没写完 -->
                        <el-col :span="8" >
                        <el-form-item label="超车位计费" prop="overPrakingCharging" >
                            <el-input v-model="ruleForm.overPrakingCharging" placeholder="" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="10" >
                    <el-form-item label="" prop="remainBroadcastFlag" >
                        <el-checkbox v-model="ruleForm.remainBroadcastFlag"  true-label="1" false-label="2" >是否播报车类余位</el-checkbox>
                    </el-form-item>
                    </el-col>

                </el-row>
                <el-row :gutter="24">
                    <el-form-item label="备注" prop="remark" >
                        <el-input v-model="ruleForm.remark" type="textarea" placeholder="请输入"
                                :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12" >
                        <el-form-item label="以下区域生效" prop="basicCarTypeAreas" >
                            <el-tree
                                ref="treeRef"
                                :data="areaTree"
                                show-checkbox
                                node-key="id"
                                :default-expand-all="true"
                                style="border:  1px solid #dcdfe6; height: 100%;">
                            </el-tree>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addArea" v-if="judge==='add'">确 定</el-button>
                <el-button type="primary" @click="editArea" v-if="judge==='edit'">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import {getBasicCarList,getBasicType ,addBasicCarType,deleteBasicCarType,getBasicCarData,editBasicCarType} from '@/api/ownerManagement/vehicleClassManagement'
import { getAreaTree } from '@/api/basicConfiguration/areaManagement';
import Treeselect from '@riophae/vue-treeselect';
import { numberToString ,numberValuesToStrings} from "@/utils/ruoyi";
import { listDept } from '@/api/system/dept';
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
components: { Treeselect },
dicts: ['basic_renewal_cycle','basic_renewal_unit','basic_overdue_rent','basic_parking_space','basic_monthly_renewal_free','basic_owner_application',
    'basic_field_within_insert','basic_field_within_delete','basic_owner_code_renew','basic_update_effective_time','basic_car_auth_month','basic_car_auth_stored',
    'basic_confirm','basic_no_order','basic_park_full',"basic_owner_update_car_number"
],

data(){
    return {
        judge:'',
        ids:[],
        tableData:[],
        areaTree:[],
        carTypeId:'',
        // 回显的数据
        areaData:[],
        // 车类下拉数据
        typeOption:[],
        deptOptions:[],
        monthlyDisplay:false,
        storedDisplay:false,
        ruleForm:{
            carTypeAuth: [],
            extendField:{}
        },
        
        
        rules: {
        //     'extendField.overtimeProhibitRenew': [
        //     { required: false, message: '请输入区域名称', trigger: 'blur' },
        //   ],
          deptId: [
            { required: false, message: '请输入区域名称', trigger: 'blur' },
          ],
        },
        dialogFormVisible: false,
    }
},
created(){
    this.getList()
},

methods:{
    // 获取列表
    getList(){
        let params = {}
        getBasicCarList(params).then(res => {
            this.tableData = res.rows
            }).catch(err => {
                console.error('Error getting table list:', err);
            });
    },
    //查询
    searchList(){
        this.getList()
       
    },
    //打开对话框
   async open(){
        this.ruleForm={carTypeAuth: [],extendField:{}, }
        this.monthlyDisplay=false,
        this.storedDisplay=false,
        await this.getCarType()
        await this.getTreeselect()
        await this.getParentTreeselect()
        this.dialogFormVisible = true
    },
    // 打开新增新增
   async addOpen(){
        this.judge = 'add'
     await this.open()
        this.$refs.treeRef.setCheckedKeys(this.ids)
    },
    //获取车类类型
 async getCarType(){
     await getBasicType().then(res=>{
        if (res.data) {
            console.log("还没到这里?");
        this.typeOption = res.data;
        }
        })
    },
    
    objectValuesToStrings(obj) {
        // 创建一个新的对象用来存放转换后的属性值
        const newObj = {};
        // 遍历原对象的所有属性
        for (let key in obj) {
        // 确保当前属性属于对象本身，防止遍历到原型链上的属性
        if (obj.hasOwnProperty(key)) {
        // 将属性值转换为字符串，并存入新对象中
        newObj[key] = String(obj[key]);
        }
        }
  return newObj;
},
//区域
    async getParentTreeselect() {
      await getAreaTree().then((response) => {
        this.areaTree=response.data
        this.getIds(response.data)
      });
},
//获取区域全部id数组
getIds(data){
    console.log(data);
    data.forEach(item => {
    // 添加当前对象的id到结果数组
    if (item.id) {
      this.ids.push(item.id);
    }
    // 如果当前对象有children属性且它是一个数组，则递归调用此函数
    if (item.children && Array.isArray(item.children)) {
        this.getIds(item.children);
    }
  });
  console.log(this.ids);
},


//选中车类类型
changeType(data){
    console.log("车类改变",data);
    const DisplayType = {
        Monthly: 1,
        Stored: 2,
    };
    this.monthlyDisplay = data === DisplayType.Monthly || data === 4;;
    this.storedDisplay = data === DisplayType.Stored;
    if(this.ruleForm.basicType !=="3"&&this.ruleForm.basicType !==3){
        this.ruleForm.extendField = JSON.parse(this.typeOption[data-1].extendField)
        this.ruleForm.extendField = this.objectValuesToStrings(this.ruleForm.extendField)
        }
},
    // 确认添加
  async addArea(){
        const valid = await this.$refs.form.validate()
      if (!valid) {
        console.log('error submit!!');
        return false;
      }
      try {
        //获取区域选中数据
        const checkedNodes = this.$refs.treeRef.getCheckedNodes();
        this.ruleForm.basicCarTypeAreas=checkedNodes.map(node => ({ areaId: node.id }));
        // 将车道权限数组转换为逗号分隔的字符串
        this.ruleForm.carTypeAuth = this.ruleForm.carTypeAuth.join(',');
        // 将扩展字段转换为JSON字符串
        this.ruleForm.extendField=JSON.stringify(this.ruleForm.extendField);
        let params=this.ruleForm
        console.log("添加参数",params);
        await addBasicCarType(params).then(res => {
            console.log("添加成功",res);
        })
        this.dialogFormVisible = false
        this.getList()
      } catch (error) {
        console.error('Error adding area:', error);
      }
    },
      /** 转换上级部门数据结构 */
      normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.deptId,
        label: node.deptName,
        children: node.children,
      };
    },
    //  /** 查询菜单下拉树结构 */
    async getTreeselect() {
      await listDept().then((response) => {
        this.deptOptions=[]
        const menu = { deptId: 0, deptName: '主类目', children: [] };
        menu.children = this.handleTree(response.data, 'deptId');
        this.deptOptions.push(menu);
      });
    },

    //编辑
 async   editFun(data){
    this.judge='edit'
    this.carTypeId=data.id
    await this.open()
      await getBasicCarData(data.id).then(res=>{
            this.ruleForm = { ...res.data };
            //处理回显的数据
            if(res.data.carTypeAuth){
                console.log('zhe');
                this.ruleForm.carTypeAuth = res.data.carTypeAuth.split(',');
            }
            const propertiesToConvert = ['outNoOrder', 'inConfirm', 'inProhibitRepeat', 'overPrakingCharging','parkingFullTime',"remainBroadcastFlag"];
            propertiesToConvert.forEach(property => {
                if (res.data.hasOwnProperty(property) && typeof res.data[property] === 'number') {
                    this.ruleForm[property] = numberToString(res.data[property]);
                }
            });
              //判断一下车类
              console.log("车类3",this.ruleForm.basicType);
            this.changeType(this.ruleForm.basicType)

            console.log("车类4",this.ruleForm.basicType);
            if(this.ruleForm.basicType !=="3"&&this.ruleForm.basicType !==3){
                this.ruleForm.extendField ={ ...JSON.parse(res.data.extendField)}
            }
            //区域数据回显
            this.areaData=this.ruleForm.basicCarTypeAreas.map(node => (node.areaId ));
            console.log('this.areaData',this.areaData);
            this.$refs.treeRef.setCheckedKeys(this.areaData)
        })
        
    },
      //编辑保存
     async editArea(){
        const valid = await this.$refs.form.validate()
      if (!valid) {
        console.log('error submit!!');
        return false;
      }
      try {
        if(this.ruleForm.basicType !=="3"&&this.ruleForm.basicType !==3){
            console.log("进来了嘛1");
        this.ruleForm.carTypeAuth = this.ruleForm.carTypeAuth.join(',');
        this.ruleForm.extendField=JSON.stringify(this.ruleForm.extendField);
        }
        const checkedNodes = this.$refs.treeRef.getCheckedNodes();
        this.ruleForm.basicCarTypeAreas=checkedNodes.map(node => ({ areaId: node.id,carTypeId:this.carTypeId }));
        let params=this.ruleForm
        console.log("添加参数",params);
        await editBasicCarType(params).then(res => {
            console.log("添加成功",res);
        })
        this.dialogFormVisible = false
        this.getList()
      } catch (error) {
        console.error('Error adding area:', error);
      }
    },
    //删除
    deleteFun(data){

        deleteBasicCarType(data.id).then(res=>{
        this.getList()
    }).catch(err => {
            console.error('Error getting table list:', err);
        });
    },
}
}
</script>
<style lang="scss" scoped>
.set{
    display: flex;
    align-items: center; /* 垂直居中 */
    .add{
        margin-right: 5px;
    }
    .serach{
        margin-left: 50px;
        display: flex;
        .serachinput{
            margin-right: 20px;
            width: 300px;
        }
    }
}
.list{
    margin-top: 20px;
}
.addform{
    width: 300px;
    .form{
    input{
        width: 300px !important;
    }
}
}
.el-select{
    width: 100%;
}
</style>