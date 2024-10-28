<template >
  <div class="app-container">
      <!-- 车主管理 -->
      <div >
          <!-- 搜索 -->
          <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
              <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="addOpen"
              v-hasPermi="['basic:basicCarOwner:add']"
              >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <div>
              <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"  label-width="68px">
              <el-form-item label="车牌：" prop="carNumber">
                  <el-input
                  v-model="queryParams.carNumber"
                  placeholder="请输入车牌号码"
                  clearable
                  />
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" icon="el-icon-search" size="mini" @click="searchList">搜索</el-button>
                  <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
              </el-form-item>
              </el-form>
          </div>
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
      <el-dialog title="添加区域" :visible.sync="dialogFormVisible" custom-class="self-dialog" width="30%">
          <!-- 表单 -->
          <el-form ref="form" :rules="rules" :model="ruleForm" label-width="80px">
              <el-form-item label="车牌" prop="carNumber">
                  <el-input v-model="ruleForm.carNumber"></el-input>
              </el-form-item>
              <el-form-item label="开始时间" prop="startDate">
                <el-date-picker
                              v-model="ruleForm.startDate"
                              type="date"
                              placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd">
                          </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间" prop="endDate">
                <el-date-picker
                              v-model="ruleForm.endDate"
                              type="date"
                              placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd">
                          </el-date-picker>
              </el-form-item>
              <el-form-item label="是否删除" prop="delFlag">
                <el-switch v-model="ruleForm.delFlag" :active-value="1" class="drawer-switch" />
              </el-form-item>
              <el-form-item label="限制原因" prop="remark">
                  <el-input v-model="ruleForm.remark"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false" class="btn-dashed">取 消</el-button>
              <el-button type="primary" @click="addArea" v-if="judge==='add'">确 定</el-button>
              <el-button type="primary" @click="editArea" v-if="judge==='edit'">确 定</el-button>
          </span>
      </el-dialog>

  </div>
</template>
<script>
import { listBasicCarOwner, getBasicCarOwner, delBasicCarOwner, addBlackCarOwner, updateBasicCarOwner } from "@/api/ownerManagement/basicCarType";
export default {
  data(){
      return{
           // 显示搜索条件
       showSearch: true,
          queryParams: {
              pageNum: 1,
              pageSize: 10,
              carTypeId: null,
              carNumber: null,
              deptId: null,
              prakingSpaceId: null,
              carOwnerPhone: null,
              carOwnerName: null,
              address: null,
              idCard: null,
          },
          tableData:[],
          rules: {
          areaName: [
          { required: false, message: '请输入区域名称', trigger: 'blur' },
        ],
        areaParking: [
          { required: false, message: '请输入区域车位数', trigger: 'change' }
        ],
        areaRemainPraking: [
          { required: false, message: '请输入剩余车位数', trigger: 'change' }
        ],
      },
          dialogFormVisible:false,
          ruleForm:{
          },
      }
  },
  created(){
  this.getList()
  },

  methods:{
  // 获取列表
  getList(){
      let params = {}
      if (this.serachForm) {
          params = Object.assign({}, params, { ...this.serachForm });
      }
      listBasicCarOwner(params).then(res => {
              this.tableData = this.handleTree(res.data);
          }).catch(err => {
              // console.error('Error getting table list:', err);
          });
  },
  // 添加黑名单
  async addArea(){
      const valid = await this.$refs.form.validate()
    if (!valid) {
      return false;
    }
    try {
      let params=this.ruleForm
      params.type=0
      await addBlackCarOwner(params).then(res => {
      })
      this.dialogFormVisible = false
      this.ruleForm = {}
      this.getList()
    } catch (error) {
      console.error('Error adding area:', error);
    }
  },
  //查询
  searchList(){
      this.getList()

  },
  //重置
  resetQuery(){

  },
   //新建
   addOpen(){
      this.judge = 'add'
      this.open()
  },
  //打开对话框
  open(){
      this.ruleForm = {}; // 清空表单
      this.dialogFormVisible = true
  },




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

</style>
