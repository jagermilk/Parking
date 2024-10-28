<template >
    <div class="app-container">
        <!-- 车主管理 -->
        <div >
            <!-- 搜索 -->
            <div >
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"  label-width="68px">
                  <el-form-item label="状态" prop="accreditStatus">
                  <el-select
              v-model="queryParams.accreditStatus"
              placeholder="授权状态"
              clearable
            >
              <el-option
                v-for="dict in dict.type.basic_accredit_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input
                    v-model="queryParams.address"
                    placeholder="请输入地址"
                    clearable
                    />
                </el-form-item>
                <el-form-item label="车牌" prop="carNumber">
                    <el-input
                    v-model="queryParams.carNumber"
                    placeholder="请输入车牌号"
                    clearable
                    />
                </el-form-item>
                <el-form-item label="车主" prop="carOwnerName">
                    <el-input
                    v-model="queryParams.carOwnerName"
                    placeholder="请输入车主姓名"
                    clearable
                    />
                </el-form-item>
                <el-form-item label="类型" prop="carTypeId">
                  <el-select
              v-model="queryParams.status"
              placeholder="类型"
              clearable
              style="width: 240px"
            >
              <el-option
                v-for="dict in dict.type.basic_car_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
                </el-form-item>
                <el-form-item label="部门id" prop="deptId">
                    <el-input
                    v-model="queryParams.deptId"
                    placeholder="请输入部门id"
                    clearable
                    />
                </el-form-item>
                <el-form-item label="车位号" prop="prakingSpaceId">
                    <el-input
                    v-model="queryParams.prakingSpaceId"
                    placeholder="请输入车位号"
                    clearable
                    />
                </el-form-item>
                <el-form-item label=" " prop="carTypeId">
                  <el-select
              v-model="queryParams.monthType"
              placeholder=""
              clearable
              style="width: 150px"
            >
              <el-option
                v-for="dict in dict.type.basic_month_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
                </el-form-item>
                <el-form-item label="" prop="dayNum">
                    <el-input
                    v-model="queryParams.dayNum"
                    placeholder="请输入天数"
                    clearable
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="searchList">搜索</el-button>
                    <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                </el-form-item>
                </el-form>
            </div>
            <el-row :gutter="10" class="mb8">
                <!-- 添加  -->
            <el-col :span="1.5">
                <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                @click="addOpen"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="success"
                plain
                icon="el-icon-edit"
                size="mini"

                >车主导入</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini"
                >部门管理</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="warning"
                plain
                icon="el-icon-download"
                size="mini"
                >车位管理</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
            </el-row>
        </div>
        <!-- 列表 -->
        <div class="list">
            <el-table
            :data="tableData"
            height="250"
            style="width: 100%"
           >
                <el-table-column
                prop="areaCode"
                label="区域编号"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="areaName"
                label="区域名称"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="areaParking"
                label="区域车位"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="areaRemainPraking"
                label="区域余位"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="operate"
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="viewFun(scope.row)" type="text" size="small">余位校准</el-button>
                    <el-button @click="editFun(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteFun(scope.row)" type="text" size="small">删除</el-button>
                </template>

                </el-table-column>
        </el-table>
        </div>
        <!-- 新增编辑 -->
        <el-dialog title="新增编辑" :visible.sync="dialogFormVisible" custom-class="self-dialog" width="60%">
            <!-- 表单 -->
            <el-form ref="form" :rules="rules" :model="ruleForm" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12" >
                        <el-form-item label="车类名称" prop="carTypeId">
                            <el-select v-model="ruleForm.basicCarOwner.carTypeId" filterable placeholder="请选择"  @change="changeTypeId" >
                                <el-option
                                v-for="item in carTypeOption"
                                :key="item.id"
                                :label="item.carTypeName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="车牌号码" prop="carNumber">
                            <el-input v-model="ruleForm.basicCarOwner.carNumber" placeholder="请输入车牌号码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" >
                        <el-form-item label="上级部门" prop="deptId">
                                    <treeselect v-model="ruleForm.basicCarOwner.deptId" :show-count="true" :options="deptOptions"  :normalizer="normalizer" class="treeSelect" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="disBalance">
                        <el-form-item label="余额" prop="balance">
                            <el-input v-model="ruleForm.basicCarOwner.balance" placeholder="请输入车类名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" >
                        <el-form-item label="车位数" prop="prakingNum">
                            <el-input-number v-model="ruleForm.basicCarOwner.prakingNum"  :min="0"  label="描述文字" style="width: 100%;" ></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="车位号" prop="prakingSpaceId">
                            <el-select v-model="ruleForm.basicCarOwner.prakingSpaceId" filterable placeholder="请选择"   clearable style="width: 90%;">
                            <el-option
                            v-for="item in prakingSpaceList"
                            :key="item.id"
                            :label="item.carTypeName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                        <i class="el-icon-circle-plus" style="font-size: 25px;vertical-align: middle;" @click="dialogParkingSpaceVisible=true"></i>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" >
                        <el-form-item label="车主电话" prop="carOwnerPhone">
                            <el-input v-model="ruleForm.basicCarOwner.carOwnerPhone" placeholder="请输入车主电话"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="车主姓名" prop="carOwnerName">
                            <el-input v-model="ruleForm.basicCarOwner.carOwnerName" placeholder="请输入车主姓名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" >
                        <el-form-item label="地址" prop="address">
                            <el-input v-model="ruleForm.basicCarOwner.address" placeholder="请输入地址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="ruleForm.basicCarOwner.remark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" >
                        <el-form-item label="身份证" prop="idCard">
                            <el-input v-model="ruleForm.basicCarOwner.idCard" placeholder="请输入身份证"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="自定义编号" prop="customizeCode">
                            <el-input v-model="ruleForm.basicCarOwner.customizeCode" placeholder="请输入自定义编号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="12" >
                        <el-form-item label="姓名匹配" prop="nameMatch">
                            <template #label>
                                <span>姓名匹配</span>
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                        姓名相同不添加:车主姓名相同不添加数据
                                        <br>姓名相同不合并:姓名相同不合并数据,用户名随机生成
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-select v-model="ruleForm.basicCarOwner.nameMatch" filterable placeholder="请选择"   clearable>
                                <el-option :value="1">相同不添加</el-option>
                                <el-option :value="2">相同不合并</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="续费月数" prop="month">
                            <el-select v-model="ruleForm.basicOwnerRenew.month" filterable placeholder="请选择"   clearable >
                                <el-option
                                v-for="dict in dict.type.basic_renew_month"
                                :key="dict.value"
                                :label="dict.label "
                                :value="dict.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" >
                        <el-form-item label="起始日期" prop="startDate">
                            <el-date-picker
                                v-model="ruleForm.basicOwnerRenew.startDate"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="结束日期" prop="endDate">
                            <el-date-picker
                            v-model="ruleForm.basicOwnerRenew.endDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" >
                        <el-form-item label="应收金额" prop="amountReceivable">
                            <el-input v-model="ruleForm.basicOwnerRenew.amountReceivable" placeholder="请输入身份证"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="实收金额" prop="paidAmount">
                            <el-input v-model="ruleForm.basicOwnerRenew.amountReceivable" placeholder="请输入自定义编号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" >
                        <el-form-item label="通道区域权限" prop="aisleAreaAuth">
                            <template #label>
                                <span>通道区域权限</span>
                                <el-tooltip placement="bottom">
                                    <div slot="content">
                                        默认:默认不设置,代表车主的通道权限就是车类上设置的通道区域权限
                                        <br>自定义:自定义该车主的通道区域权限,车类上设置的通道区域权限不对该车主生效
                                    </div>
                                    <svg-icon icon-class="prompt"/>
                                </el-tooltip>
                            </template>
                            <el-select v-model="ruleForm.basicOwnerRenew.aisleAreaAuth" filterable placeholder="请选择"  clearable>
                                <el-option :value="1">默认</el-option>
                                <el-option :value="2">自定义</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureAdd" v-if="judge==='add'">确 定</el-button>
                <!-- <el-button type="primary" @click="editArea" v-if="judge==='edit'">确 定</el-button> -->
            </span>
        </el-dialog>
        <el-dialog title="" :visible.sync="dialogParkingSpaceVisible" width="65%">
          <div slot="title">
            <el-form :model="queryParkingSpaceParams" ref="queryParkingSpaceForm" size="small" :inline="true" v-show="showSearch"  label-width="68px">
            <el-form-item label="" prop="prakingNumber">
            <el-button @click="dialogAddParkingSpaceVisible = true" size="mini" type="primary">新增</el-button>
            <el-button @click="handleImport" size="mini" type="primary">导入</el-button>
          </el-form-item>
              <el-form-item label="区域：" prop="areaId">
                <el-select
              v-model="queryParkingSpaceParams.areaId"
              placeholder="区域"
              clearable
            >
              <el-option
                v-for="dict in areaList"
                :key="dict.id"
                :label="dict.label"
                :value="dict.id"
              />
            </el-select>
                </el-form-item>
                <el-form-item label="" prop="prakingNumber">
                <el-button  @click="getParkingSpace" size="mini" type="primary">搜索</el-button>
              </el-form-item>
          </el-form>
                <!-- <el-button type="primary" @click="editArea" v-if="judge==='edit'">确 定</el-button> -->
        </div>
          <!-- <el-button @click="dialogAddParkingSpaceVisible = true">导入</el-button> -->
            <!-- 表格 -->
            <div class="list">
            <el-table
            :data="prakingSpaceList"
            border
            height="250"
            style="width: 100%"
           >
                <el-table-column
                prop="prakingNumber"
                label="车位号"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="prakingNum"
                label="车位数"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="areaId"
                label="区域"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="operate"
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="editParkingSpace(scope.row)" type="success"  class="small-btn" size="small">编辑</el-button>
                    <el-button @click="deleteParkingSpace(scope.row)" type="danger" class="small-btn" size="small">删除</el-button>
                </template>
                </el-table-column>
        </el-table>
        <pagination
          v-show="parkingSpacetotal>0"
          :total="parkingSpacetotal"
          :page.sync="queryParkingSpaceParams.pageNum"
          :limit.sync="queryParkingSpaceParams.pageSize"
          @pagination="getList"
        />
        </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogParkingSpaceVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogAddParkingSpaceVisible=false" v-if="judge==='add'">确 定</el-button>
                <!-- <el-button type="primary" @click="editArea" v-if="judge==='edit'">确 定</el-button> -->
            </span>
        </el-dialog>
        <el-dialog title="新增/编辑" :visible.sync="dialogAddParkingSpaceVisible" custom-class="self-dialog" width="50%">
            <!-- 表单 -->
            <el-form ref="form" :rules="parkingSpacerules" :model="parkingSpaceForm" label-position="right" label-width="120px">
                      <el-form-item label="车位号：" prop="prakingNumber">
                          <el-input
                          v-model="parkingSpaceForm.prakingNumber"
                          placeholder="请输入车位号"
                          clearable
                          />
                      </el-form-item>
                      <el-form-item label="车位数：" prop="prakingNum">
                            <el-input-number v-model="parkingSpaceForm.prakingNum"  :min="0"   style="width: 100%;" ></el-input-number>
                        </el-form-item>
                  <el-form-item label="区域：                                                                                                                                                                                                                                                                                                                                                                                                               " prop="accreditStatus">
                  <el-select
              v-model="parkingSpaceForm.areaId"
              placeholder="区域"
              clearable
            >
              <el-option
                v-for="dict in areaList"
                :key="dict.id"
                :label="dict.label"
                :value="dict.id"
              />
            </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAddParkingSpaceVisible = false" class="btn-dashed">取 消</el-button>
                <el-button type="primary" @click="sureParkingSpace" v-if="judge==='add'">确 定</el-button>
                <!-- <el-button type="primary" @click="editArea" v-if="judge==='edit'">确 定</el-button> -->
            </span>
        </el-dialog>
        <!-- 用户导入对话框 -->
        <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
          <el-upload
            ref="upload"
            :limit="1"
            accept=".xlsx, .xls"
            :headers="upload.headers"
            :action="upload.url + '?updateSupport=' + upload.updateSupport"
            :disabled="upload.isUploading"
            :on-progress="handleFileUploadProgress"
            :on-success="handleFileSuccess"
            :auto-upload="false"
            drag
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip text-center" slot="tip">
              <div class="el-upload__tip" slot="tip">
                <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
              </div>
              <span>仅允许导入xls、xlsx格式文件。</span>
              <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate">下载模板</el-link>
            </div>
          </el-upload>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFileForm">确 定</el-button>
            <el-button @click="upload.open = false">取 消</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import { getAreaTree } from '@/api/basicConfiguration/areaManagement';
import { listBasicCarOwner, getBasicCarOwner, delBasicCarOwner, addBasicCarOwner, updateBasicCarOwner,getParkingSpaceList,addParkingSpace,delParkingSpace } from "@/api/ownerManagement/basicCarType";
import {getBasicCarList,getBasicCarData} from '@/api/ownerManagement/vehicleClassManagement';
import { listDept } from '@/api/system/dept';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { flattenTree } from '@/utils/index'
import { getToken } from "@/utils/auth";
export default {
    components: { Treeselect },
    dicts:['basic_renew_month','basic_accredit_status','basic_car_type','basic_month_type'],
    data(){
        return{
            judge:'',
            //余额判断
            disBalance:false,
            //车类列表
            carTypeOption:[],
            //部门列表
            deptOptions:[],
            //车位列表
            prakingSpaceList:[],
            parkingSpacetotal:0,
            //区域列表
            areaList:[],
            // 用户导入参数
            upload: {
              // 是否显示弹出层（用户导入）
              open: false,
              // 弹出层标题（用户导入）
              title: "",
              // 是否禁用上传
              isUploading: false,
              // 是否更新已经存在的用户数据
              updateSupport: 0,
              // 设置上传的请求头部
              headers: { Authorization: "Bearer " + getToken() },
              // 上传的地址
              url: process.env.VUE_APP_BASE_API + "/basic/basicParkingSpace/importData"
            },
             // 显示搜索条件
            showSearch: true,
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                accreditStatus: null,
                address: null,
                carNumber: null,
                carOwnerName: null,
                carTypeId: null,
                dayNum: null,
                deptId: null,
                monthType: null,
                prakingSpaceId: null,
            },
            queryParkingSpaceParams: {
                pageNum: 1,
                pageSize: 10,
                areaId: null
            },
            tableData:[],
            rules: {
                carOwnerName: [
                    { required: false, message: '请输入车主姓名', trigger: 'change' },
                ],
                carTypeId: [
                    { required: false, message: '请输入车类名称', trigger: 'change' }
                ]
            },
            parkingSpacerules:{
                prakingNumber: [
                    { required: true, message: '请输入车位数', trigger: 'change' }
                ],
                prakingNum: [
                    { required: true, message: '请输入车位号', trigger: 'change' }
                ],
            },
            dialogFormVisible:false,
            dialogParkingSpaceVisible:false,
            dialogAddParkingSpaceVisible:false,
            ruleForm:{
                //续费
                basicOwnerRenew:{},
                // 区域
                basicCarOwner:[{}],
                basicCarOwnerAreas:[
                  {
                    "areaId": 0,
                    "carOwnerId": 0,
                    "id": 0
                  }
                ],
                "basicCarOwnerLanes": [
                  {
                    "carOwnerId": 0,
                    "id": 0,
                    "laneId": 0
                  }
                ]
            },
            parkingSpaceForm:{
              prakingNum:null,
              areaId:null,
              prakingNumber:null
            }
        }
    },
    created(){
    this.getList()
    this.getAreaList()
    },

    methods:{
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('basic/basicParkingSpace/template', {
      }, `parking_space_template_${new Date().getTime()}.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
      this.getParkingSpace();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    //  /** 查询父区域下拉树结构 */
    async getAreaList() {
      await getAreaTree().then((response) => {
        this.areaList=flattenTree(response.data)
      });
    },
    // 获取车主列表
    getList(){
        let params = {}
        if (this.queryParams) {
            params = Object.assign({}, params, { ...this.queryParams });
        }
        listBasicCarOwner(params).then(res => {
                this.tableData = this.handleTree(res.data);
            }).catch(err => {
                // console.error('Error getting table list:', err);
            });
    },
    //查询车主列表
    searchList(){
        this.getList()
    },
    //确认新增车位
    sureParkingSpace(){
        if(this.parkingSpaceForm.id){
            //编辑
            updateBasicCarOwner(this.parkingSpaceForm).then(res => {
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                });
                this.dialogAddParkingSpaceVisible = false
                this.getParkingSpace()
              }).catch(err => {
                this.$message({
                  message: '编辑失败',
                  type: 'error'
                });
              });
        }
        else{
            addParkingSpace(this.parkingSpaceForm).then(res => {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.dialogAddParkingSpaceVisible = false
              this.getParkingSpace()
            }).catch(err => {
              this.$message({
                message: '添加失败',
                type: 'error'
              });
            });
        }
    },
    //编辑车位
    editParkingSpace(row){
      this.parkingSpaceForm=JSON.parse(JSON.stringify(row))
      this.dialogAddParkingSpaceVisible=true
    },
    //删除车位
    deleteParkingSpace(row){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示').then(async () => {
            await delParkingSpace(row.id).then((res) => {
                if (res.code === 200) {
                    this.$message({ message: '删除成功', type: 'success' });
                    this.getParkingSpace();
                } else {
                    this.$message({ message: '删除失败', type: 'error' });
                }
            });
        })
    },
    //重置
    resetQuery(){

    },
    //打开车主对话框
   async open(){
        this.ruleForm = {basicOwnerRenew:{},basicCarOwner:{}, basicCarOwnerAreas:[
                  {
                    "areaId": 0,
                    "carOwnerId": 0,
                    "id": 0
                  }
                ],
                "basicCarOwnerLanes": [
                  {
                    "carOwnerId": 0,
                    "id": 0,
                    "laneId": 0
                  }
                ]}; // 清空表单
        this.dialogFormVisible = true
      await   this.getCarIdType()
      await  this.getTreeselect()
      await  this.getParkingSpace()
    },
     //新建
     addOpen(){
        this.judge = 'add'
        this.open()
    },
    //获取车类
    getCarIdType(){
        getBasicCarList().then(res => {
                this.carTypeOption = {...res.rows};
            }).catch(err => {
                console.error('Error getting table list:', err);
            });
    },
    //选择车类
    changeTypeId(val){
        getBasicCarData(val).then(res => {
            if(res.data.basicType=== 2 || res.data.basicType==="2"){
                this.disBalance=true
            }else{
                this.disBalance=false
            }
            });
    },
    //选择车位
    changePrakingSpaceId(){
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
    //  /** 查询部门下拉树结构 */
    async getTreeselect() {
      await listDept().then((response) => {
        this.deptOptions=[]
        const menu = { deptId: 0, deptName: '主类目', children: [] };
        menu.children = this.handleTree(response.data, 'deptId');
        this.deptOptions.push(menu);
      });
    },
    //获取车位号列表
    getParkingSpace(){
        getParkingSpaceList(this.queryParkingSpaceParams).then(res => {
                // this.prakingSpaceList = {...res.rows};
                this.prakingSpaceList = this.handleTree(res.rows);
                this.parkingSpacetotal = res.total;
            }).catch(err => {
                console.error('Error getting table list:', err);
            });
    },
    //确认添加
    sureAdd(){
      addBasicCarOwner(this.ruleForm).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.dialogFormVisible = false
        this.getList()
      }).catch(err => {
        this.$message({
          message: '添加失败',
          type: 'error'
        });
      });
    }
    },

}
</script>

<style lang="scss" scoped>
.set{
    display: flex;
    align-items: center; /* 垂直居中 */
    .addRegion{
        margin-right: 5px;
    }
    .serach{
        // margin-left: 50px;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        .serachinput{
            margin-right: 20px;
            width: 300px;
        }
    }

}
.list{
    margin-top: 20px;
}
.el-select{
    width: 100%;
}
</style>
