<template>
  <!-- 车类管理 -->
  <div class="app-container">
      <div >
          <!-- 添加区域 -->
          <!-- <el-button type="success" class="add"  @click="addOpen">新增</el-button> -->
          <el-row :gutter="10" class="mb8" >
          <el-form :model="queryVehicleClassParams" ref="queryParkingSpaceForm" size="small" :inline="true" v-show="showSearch"  label-width="68px">
            <el-form-item label="区域" prop="areaId">
              <el-select
              v-model="queryVehicleClassParams.areaId"
              placeholder="请选择区域"
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
              <el-form-item label="车类名称" prop="carTypeName">
                          <el-input v-model="queryVehicleClassParams.carTypeName" placeholder="请输入车类名称"></el-input>
                      </el-form-item>
              <el-form-item label="" prop="prakingNumber">
              <el-button  @click="searchList" size="mini" type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="addOpen"
              v-hasPermi="['basic:basicCarOwner:add']"
              >新增</el-button>
              <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
          </el-row>
      </div>
      <!-- 列表 -->
      <div class="list">
          <el-table
          border
          :data="tableData"
          style="width: 100%"
         >
              <el-table-column
              prop="laneName"
              v-if="columns[0].visible"
              label="通道名称"
              align="center"
              >
              </el-table-column>
              <el-table-column
              prop="inOutDirection"
              v-if="columns[1].visible"
              label="通道类型"
              align="center"
              >
              </el-table-column>
              <el-table-column
              prop="areaId"
              v-if="columns[2].visible"
              label="区域名称"
              align="center"
              >
              </el-table-column>
              <el-table-column
              prop="cameraId"
              v-if="columns[3].visible"
              label="相机心跳"
              align="center"
              >
              </el-table-column>
              <el-table-column
              prop="basicCamera"
              v-if="columns[4].visible"
              label="相机序列号"
              align="center"
              >
              </el-table-column>
              <el-table-column
              prop="operate"
              align="center"
              label="操作">

              <template slot-scope="scope">
                  <el-button @click="editFun(scope.row)" type="success" class="small-btn" size="small">编辑</el-button>
                  <el-button @click="deleteFun(scope.row)" type="danger" class="small-btn" size="small">删除</el-button>
              </template>
              </el-table-column>
      </el-table>
      <pagination
                v-show="total>0"
                :total="total"
                :page.sync="queryVehicleClassParams.pageNum"
                :limit.sync="queryVehicleClassParams.pageSize"
                @pagination="getList"
              />
      </div>
      <!-- 新增表单 -->
      <el-dialog title="新增编辑" :visible.sync="dialogFormVisible" custom-class="self-dialog" width="60%">
          <!-- 表单 -->
          <el-form ref="form" :rules="rules" :model="ruleForm" label-width="120px">
              <el-row :gutter="20">
                <el-col :span="12" >
                      <el-form-item label="车道名称" prop="laneName">
                          <el-input v-model="ruleForm.laneName" placeholder="请输入车道名称"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                      <el-form-item label="进出方向" prop="inOutDirection">
                          <el-select
                            v-model="ruleForm.inOutDirection"
                            placeholder="请选择进出方向"
                            clearable
                          >
                            <el-option
                              :key="1"
                              label="入口"
                              :value="1"
                            />
                            <el-option
                              :key="2"
                              label="出口"
                              :value="2"
                            />
                          </el-select>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                      <el-form-item label="区域" prop="areaId">
                          <el-select
                            v-model="ruleForm.areaId"
                            placeholder="请选择区域"
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
                  </el-col>
              </el-row>
              <!-- 共有的 -->
              <el-row :gutter="24">
                      <el-form-item label="相机" prop="ledId">
                        <el-row :gutter="24">
                        <el-col :span="6">
                          <el-input v-model="ruleForm.basicCamera.cameraIp" placeholder="请输入相机ip" ></el-input>
                        </el-col>
                        <el-col :span="6">
                          <el-input v-model="ruleForm.basicCamera.serialNumber" placeholder="请输入序列号" ></el-input>
                        </el-col>
                        <el-col :span="6">
                          <el-select
                            v-model="ruleForm.basicCamera.id"
                            placeholder="请选择区域"
                            clearable
                          >
                            <el-option
                              v-for="dict in cameraList"
                              :key="dict.id"
                              :label="dict.label"
                              :value="dict.id"
                            />
                          </el-select>
                        </el-col>
                        </el-row>
                      </el-form-item>
              </el-row>
              <el-row :gutter="24">
                      <el-form-item label="辅助相机" prop="ledId">
                        <el-row :gutter="24">
                        <el-col :span="6">
                          <el-input v-model="ruleForm.basicCameraAssist.cameraIp" placeholder="请输入相机ip" ></el-input>
                        </el-col>
                        <el-col :span="6">
                          <el-input v-model="ruleForm.basicCameraAssist.serialNumber" placeholder="请输入序列号" ></el-input>
                        </el-col>
                        <el-col :span="6">
                          <el-select
                            v-model="ruleForm.basicCameraAssist.id"
                            placeholder="请选择区域"
                            clearable
                          >
                            <el-option
                              v-for="dict in cameraList"
                              :key="dict.id"
                              :label="dict.label"
                              :value="dict.id"
                            />
                          </el-select>
                        </el-col>
                        </el-row>
                      </el-form-item>
              </el-row>
              <el-row :gutter="24">
                      <el-form-item label="2号辅助相机" prop="ledId">
                        <el-row :gutter="24">
                        <el-col :span="6">
                          <el-input v-model="ruleForm.basicCameraAssistTwo.cameraIp" placeholder="请输入相机ip" ></el-input>
                        </el-col>
                        <el-col :span="6">
                          <el-input v-model="ruleForm.basicCameraAssistTwo.serialNumber" placeholder="请输入序列号" ></el-input>
                        </el-col>
                        <el-col :span="6">
                          <el-select
                            v-model="ruleForm.basicCameraAssistTwo.id"
                            placeholder="请选择区域"
                            clearable
                          >
                            <el-option
                              v-for="dict in cameraList"
                              :key="dict.id"
                              :label="dict.label"
                              :value="dict.id"
                            />
                          </el-select>
                        </el-col>
                        </el-row>
                      </el-form-item>
              </el-row>
              <div>
              <el-row :gutter="24">
                  <el-col :span="12" >
                      <el-form-item label="LED卡" prop="ledId" >
                          <template #label>
                              <span>LED卡</span>
                              <el-tooltip placement="bottom">
                                  <div slot="content">
                                    无屏显问题

                                    <br>1、检查波特率是否正确;

                                    <br>2、检查控制卡是否加密;

                                    <br>3、使用LED软件测试屏显和语音

                                    <br>------------

                                    <br>注意：相机C液晶屏(10寸),只支持两行屏显示
                                  </div>
                                  <svg-icon icon-class="prompt"/>
                              </el-tooltip>
                          </template>
                          <el-select
                              filterable
                              clearable
                              v-model="ruleForm.ledId"
                              placeholder="请选择" >
                              <el-option
                              :key="1"
                              label="001普通"
                              :value="1"
                              />
                          </el-select>
                      </el-form-item>
                  </el-col>
              </el-row>

              <el-row :gutter="24">
                  <el-col :span="12" >
                      <el-form-item label="红绿灯" prop="trafficLight" >
                        <el-switch v-model="ruleForm.trafficLight" :true-value="1" :false-value="0" class="drawer-switch" />
                      </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                      <el-form-item label="ETC车道码" prop="etcLaneCode" >
                        <el-input v-model="ruleForm.etcLaneCode" placeholder="" ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                      <el-form-item label="关联开闸" prop="associateOpen" >
                        <el-switch v-model="ruleForm.associateOpen" :true-value="1" :false-value="0" class="drawer-switch" />
                      </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                      <el-form-item label="全景监控" prop="panoramicMonitor" >
                        <el-input v-model="ruleForm.panoramicMonitor" placeholder="" ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                      <el-form-item label="状态" prop="status" >
                        <el-switch v-model="ruleForm.status" :true-value="1" :false-value="0" class="drawer-switch" />
                      </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                      <el-form-item label="自定义编号" prop="customizeCode" >
                        <el-input v-model="ruleForm.customizeCode" placeholder="" ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                      <el-form-item label="智慧屏编号" prop="smartScreenCode" >
                        <el-input v-model="ruleForm.smartScreenCode" placeholder="" ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                      <el-form-item label="液晶屏编号" prop="lcdScreenCode" >
                        <template #label>
                              <span>液晶屏编号</span>
                              <el-tooltip placement="bottom">
                                  <div slot="content">
                                    注意:需开启忙时设置
                                  </div>
                                  <svg-icon icon-class="prompt"/>
                              </el-tooltip>
                          </template>
                        <el-input v-model="ruleForm.lcdScreenCode" placeholder="" ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                      <el-form-item label="人脸设备" prop="humanFaceDevice" >
                        <el-input v-model="ruleForm.humanFaceDevice" placeholder="" ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                      <el-form-item label="脱机板编号" prop="troporCode" >
                        <template #label>
                              <span>脱机板编号</span>
                              <el-tooltip placement="bottom">
                                  <div slot="content">
                                    填写脱机板编号，用于相机断网时能够正常进出支付开闸
                                  </div>
                                  <svg-icon icon-class="prompt"/>
                              </el-tooltip>
                          </template>
                        <el-input v-model="ruleForm.troporCode" placeholder="" ></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
          </div>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false" class="btn-dashed">取消</el-button>
              <el-button type="primary" @click="addArea" v-if="judge==='add'">保存</el-button>
              <el-button type="primary" @click="editArea" v-if="judge==='edit'">保存</el-button>
          </span>
      </el-dialog>

  </div>
</template>
<script>
import {getBasicLaneList,getLaneDetail,delbasicLane,getCameraList,addbasicLane,editbasicLane} from '@/api/basicConfiguration/laneManagement'
import { getAreaTree } from '@/api/basicConfiguration/areaManagement';
import Treeselect from '@riophae/vue-treeselect';
import { numberToString } from "@/utils/ruoyi";
import { flattenTree } from '@/utils/index'
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
      cameraList:[],
      carTypeId:'',
      showSearch:true,
      // 列信息
      columns: [
        { key: 0, label: `通道名称`, visible: true },
        { key: 1, label: `通道类型`, visible: true },
        { key: 2, label: `区域名称`, visible: true },
        { key: 3, label: `相机心跳`, visible: true },
        { key: 4, label: `相机序列号`, visible: true },
        { key: 5, label: `相机ip`, visible: true },
        { key: 6, label: `相机类型`, visible: true }
      ],
      // 回显的数据
      areaData:[],
      // 区域下拉数据
      areaList:[],
      deptOptions:[],
      monthlyDisplay:false,
      storedDisplay:false,
      ruleForm:{
        basicCamera:{
        },
        basicCameraAssist:{
        },
        basicCameraAssistTwo:{
        },
        carTypeName:null,
        areaId:null
      },
      //车类参数
      queryVehicleClassParams: {
          pageNum: 1,
          pageSize: 10,
          carTypeName:null
      },
      //车类总数
      total:0,
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
  this.getAreaList()
  this.getCamera()
},

methods:{
  // 获取列表
  getList(){
      getBasicLaneList().then(res => {
          this.tableData = res.rows
          }).catch(err => {
              console.error('Error getting table list:', err);
          });
  },
  getCamera(){
    getCameraList(this.queryVehicleClassParams).then(res => {
          this.cameraList = res.rows
          this.total = res.total
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
      this.ruleForm={basicCamera:{},basicCameraAssist:{},basicCameraAssistTwo:{},
        carTypeName:null,
        basicType:null,
        areaId:null }
      this.monthlyDisplay=false,
      this.storedDisplay=false,
      await this.getTreeselect()
      this.dialogFormVisible = true
  },
  // 打开新增新增
 async addOpen(){
      this.judge = 'add'
   await this.open()
      // this.$refs.treeRef.setCheckedKeys(this.ids)
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
//  /** 查询父区域下拉树结构 */
async getAreaList() {
  await getAreaTree().then((response) => {
    this.areaList=flattenTree(response.data)
  });
},
//获取区域全部id数组
getIds(data){
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
},
  // 确认添加
async addArea(){
      const valid = await this.$refs.form.validate()
    if (!valid) {
      return false;
    }
    try {
      let params=this.ruleForm
      await addbasicLane(params).then(res => {
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
    await getLaneDetail(data.id).then(res=>{
          this.ruleForm = { ...res.data };
          //处理回显的数据
          if(res.data.carTypeAuth){
              this.ruleForm.carTypeAuth = res.data.carTypeAuth.split(',')
          }
          const propertiesToConvert = ['outNoOrder', 'inConfirm', 'inProhibitRepeat', 'overPrakingCharging','parkingFullTime',"remainBroadcastFlag"];
          propertiesToConvert.forEach(property => {
              if (res.data.hasOwnProperty(property) && typeof res.data[property] === 'number') {
                  this.ruleForm[property] = numberToString(res.data[property]);
              }
          });
          //区域数据回显
          this.areaData=this.ruleForm.basicCarTypeAreas.map(node => (node.areaId ));
          this.$refs.treeRef.setCheckedKeys(this.areaData)
      })

  },
    //编辑保存
   async editArea(){
      const valid = await this.$refs.form.validate()
    if (!valid) {
      return false;
    }
    try {
      if(this.ruleForm.basicType !=="3"&&this.ruleForm.basicType !==3){
      this.ruleForm.carTypeAuth = this.ruleForm.carTypeAuth.join(',');
      this.ruleForm.extendField=JSON.stringify(this.ruleForm.extendField);
      }
      const checkedNodes = this.$refs.treeRef.getCheckedNodes();
      this.ruleForm.basicCarTypeAreas=checkedNodes.map(node => ({ areaId: node.id,carTypeId:this.carTypeId }));
      let params=this.ruleForm
      await editbasicLane(params).then(res => {
      })
      this.dialogFormVisible = false
      this.getList()
    } catch (error) {
      console.error('Error adding area:', error);
    }
  },
  //删除
  deleteFun(data){

      delbasicLane(data.id).then(res=>{
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
